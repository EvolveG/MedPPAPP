import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  Image,
} from 'react-native';
import { COLORS, FONTS } from '../../constants';
import {
  BubbleContainer,
  BubbleWrap,
  SenderText,
  ReceiverText,
} from '../../components/BubbleStyle';

const ChatMessage = ({ item, userData, onDelete }) => {
  const [previousDate, setPreviousDate] = useState(null);
  const [isCurrentUserSender, setIsCurrentUserSender] = useState(false);

  const isFileMessage = item.senderAvatar ;

  const currentUserSenderId = userData.user?._id;
  const messageSenderId = item.senderId._id;
  const messageReceiverId = item.receiverId._id;

  const messageContainerStyle = isCurrentUserSender
    ? styles.senderMessageContainer
    : styles.receiverMessageContainer;

  const messageContentStyle = isCurrentUserSender
    ? styles.senderMessageContent
    : styles.receiverMessageContent;

  const handleLongPress = () => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: onDelete,
          style: 'destructive',
        },
      ]
    );
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const shouldDisplayDate = () => {
    const currentDate = formatDate(item.timestamp);
    if (currentDate !== previousDate) {
      setPreviousDate(currentDate);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!userData.user || !item.senderId || !item.receiverId) {
      return;
    }

    setIsCurrentUserSender(currentUserSenderId === messageSenderId);
  }, [item, userData.user]);

  const isCurrentUserParticipant =
    (currentUserSenderId === messageSenderId ||
      currentUserSenderId === messageReceiverId) &&
    item._id !== null;

  if (!isCurrentUserParticipant) {
    return null;
  }

  const openFile = () => {
    if (item.senderAvatar) {
      Linking.openURL(item.senderAvatar);
    }
  };

  const isImage = (file) => {
    if (file && file.senderAvatar) {
      const extension = file.senderAvatar.split('.').pop().toLowerCase();
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
      const imageMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
      ];
      return imageExtensions.includes(extension) || imageMimeTypes.includes(file.type);
    }
    return false;
  };

  const fileName = item.senderAvatar ? item.senderAvatar : item.text;
  const fileUri = item.senderAvatar;

  const getFileNameFromUri = (uri) => {
    const uriSegments = uri.split('/');
    return uriSegments[uriSegments.length - 1];
  };

  const displayName = isFileMessage ? getFileNameFromUri(fileUri) : fileName;


  console.log(item.senderAvatar)
  return (
    <TouchableOpacity onLongPress={handleLongPress}>
      <BubbleContainer style={messageContainerStyle}>
        <BubbleWrap style={messageContentStyle}>
          {shouldDisplayDate() && (
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{formatDate(item.timestamp)}</Text>
            </View>
          )}
          {isFileMessage ? (
            <View>              
              <TouchableOpacity onPress={openFile}>
                {isImage(item) ? (
                  <Image
                    source={{ uri: item.senderAvatar }}
                    style={styles.imageThumbnail}
                  />
                ) : (
                  <Text style={styles.fileLink}>{displayName}</Text>
                )}
              </TouchableOpacity>
              <Text style={styles.senderName}>{item.senderName}</Text>
            </View>
          ) : isCurrentUserSender ? (
            <View>
              <SenderText>{item.text}</SenderText>
              {item.senderName && (
                <Text style={styles.senderName}>{item.senderName}</Text>
              )}
            </View>
          ) : (
            <View>
              <ReceiverText>{item.text}</ReceiverText>
              {item.receiverName && (
                <Text style={styles.senderName}>{item.receiverName}</Text>
              )}
            </View>
          )}
          <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
        </BubbleWrap>
      </BubbleContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  time: {
    fontSize: 10,
    color: COLORS.gray,
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  senderName: {
    fontSize: 10,
    color: COLORS.gray,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  dateContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  senderMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  receiverMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  senderMessageContent: {
    backgroundColor: COLORS.lightOrange2,
    padding: 10,
    borderRadius: 8,
    borderTopRightRadius: 0,
    maxWidth: '80%',
  },
  receiverMessageContent: {
    backgroundColor: COLORS.lightGray2,
    padding: 10,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    maxWidth: '80%',
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  fileLink: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});

export default React.memo(ChatMessage);
