import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { COLORS, SIZES, FONTS, icons, SHADOWS } from '../../constants';
import { IconButton } from '../../components';
import ChatMessage from './ChatMessage';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../Authentication/api';
import { socket } from '../Authentication/socket';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import PopUpNotification from '../Notification/PopUpNotification';
//import PushNotification from '../Notification/PushNotification'; // Import the PushNotification component


const ChatModal = ({ isVisible, onClose, userData }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [numTextItems, setNumTextItems] = useState(0);
  const flatListRef = useRef();
  const [unreadMessages, setUnreadMessages] = useState(0);
  // Define an estimated item height (adjust this as needed)
  const estimatedItemHeight = 10000;
  
  // Define a state variable for handling the file confirmation
  const [fileConfirmation, setFileConfirmation] = useState(false);

  const [showFileConfirmation, setShowFileConfirmation] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const [notification, setNotification] = useState(null);

  if (status === null) {
    requestPermission();
  }

  // Function to scroll to the end of the message list
  const scrollToBottom = () => {
    if (flatListRef.current && messageList.length > 0) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: messageList[messageList.length - 1].messages.length - 1,
        viewPosition: 1,
      });
    }
  };

  // Inside your ChatModal component...
  useEffect(() => {
    
    //console.log(1)
    //console.log(socket)
    if (isVisible) {

      const fetchDataAndScroll = async () => {
        await fetchMessagesFromAPI();
        scrollToBottom();
      };

      //PushNotification.requestPermissions();

      fetchDataAndScroll();
  
      // Log socket events
      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
  
      socket.on('connect', () => {
        console.log('Socket connected');
      });

      // Emit the notification to the specific receiver's socket with the message text

     //const receiverSocket = userSocketMap.getUserSocket(receiverId);

     //console.log('receiver message', receiverSocket);
     
      if (socket && socket.connected) {  
     
        
      }

      socket.on('chat message', (message) => {
        fetchDataAndScroll();
        //console.log('You Received a message');
        //console.log('chat message', message);
        if (message) {
          // Show an alert when a new message is received
          // Alert.alert('New Message', 'You have received a new message.');
          // setNotification('You have received a new message.');

          console.log(1)
  
          handleIncomingMessage(message);
  
          // Increase the unreadMessages count
          setUnreadMessages((prevCount) => prevCount + 1);

          socket.emit('notification', (message));  
          
          // if (receiverSocket) {
          //   receiverSocket.emit('notification', (message));     
          // }
        } else {
          console.error('Received empty message');
        } 
      });
  
      return () => {
        socket.off('connect_error');
        socket.off('connect');
        socket.off('chat message');
        socket.disconnect();
      };
    }
  }, [isVisible]);
  

  useEffect(() => {
    const groupedMessages = _.groupBy(messages, (message) =>
      new Date(message.timestamp).toLocaleDateString()
    );

    const organizedMessageList = Object.entries(groupedMessages).map(
      ([date, messages]) => ({
        date,
        messages,
      })
    );

    organizedMessageList.sort((a, b) => new Date(a.date) - new Date(b.date));

    const totalTextItems = messages.reduce(
      (total, message) => total + (message.text ? 1 : 0),
      0
    );

    setMessageList(organizedMessageList);
    setNumTextItems(totalTextItems);
  }, [messages]);

  const handleIncomingMessage = async (message) => {
    if (message && message.senderId && message.receiverId) {
      // Set messageSenderId to the sender's _id from the API response
      const messageSenderId = message.senderId;

      // Create the message object with the updated messageSenderId
      const updatedMessage = {
        ...message,
        messageSenderId, // Updated messageSenderId
      };

      setMessages((prevMessages) => [...prevMessages, updatedMessage]);
    } else {
      console.error('Received message without sender or receiver ID:', message);
      // Handle the case of a message without sender or receiver IDs here
    }
  };
  

  // Function to fetch messages from the API
  const fetchMessagesFromAPI = async () => {
    try {
      if (!userData?.user?._id) {
        console.error('User data or user ID not available.');
        return;
      }

      const token = await AsyncStorage.getItem('@user_token');
      const userId = userData?.user?._id;
      const userIdAG = userData.user.user?._id;

      // Use the fetchMessagesApi function from the updated api.js
      const response = await api.fetchMessagesApi(userId, userIdAG, token);

      if (response) {
        const messagesWithNames = response.map((message) => ({
          ...message,
          senderName: userData.user.firstName,
          receiverName: userData.user.user.firstName,
        }));

        const updatedMessages = _.unionBy(
          messages,
          messagesWithNames,
          '_id'
        );
        const sortedMessages = _.orderBy(
          updatedMessages,
          'timestamp',
          'asc'
        );

        if (sortedMessages) {
          setMessages(sortedMessages);
        }
      } else {
        throw Error('Error fetching messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        // Get the URI of the selected document
        const documentUri = result.uri;
        const fileName = result.name;
  
        // Show an alert to confirm sending the file
        Alert.alert(
          'Send File',
          `Do you want to send the file "${fileName}"?`,
          [
            {
              text: 'No',
              onPress: () => {
                // User chose not to send the file, reset any states or perform cleanup if needed.
              },
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async () => {
                const message = {
                  senderId: userData?.user?._id,
                  senderAvatar: documentUri,
                  // Set receiverAvatar to the file URL or path
                  receiverAvatar: 'URL_OR_FILE_PATH_HERE',
                  text: fileName,
                  senderName: userData.user.firstName,
                  timestamp: new Date().toISOString(),
                  receiverId: userData.user.user?._id,
                  receiverName: userData.user.user.firstName,
                };

                console.log(message)
  
                try {
                  await sendMessageToAPI(message);
                  setNewMessage(''); // Clear the input text field
  
                  if (socket && socket.connected) {
                    socket.emit('chat message', message);
                  }

                  const fetchDataAndScroll = async () => {
                   await fetchMessagesFromAPI();
                  };
            
                  fetchDataAndScroll();
  
                  // Perform any additional actions after sending the file.
                } catch (error) {
                  console.error('Error sending message:', error);
                }
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error picking a document:', error);
    }
  };
  
  

  const sendMessageToAPI = async (message) => {
    try {
      const token = await AsyncStorage.getItem('@user_token');

      const response = await api.sendMessagesToApi(message, token);
      //console.log('API Response:', response);

      if (response) {
        //console.log('resposta da api: ',response)
        const data = response; // No need to parse as JSON since it's not a response object
        // Emit a socket event for the new message
        socket.emit('chat message', data.newMessage);

        //console.log(socket)

        return data;
      } else {
        throw new Error('Error sending message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const sendMessage = async () => {
    if (!userData || !userData.user || !userData.user?._id) {
      console.error('User data or user ID not available.');
      return;
    }

    if (newMessage.trim() !== '') {
      const message = {
        text: newMessage,
        senderId: userData?.user?._id,
        senderAvatar: '',
        receiverAvatar: 'URL_OR_FILE_PATH_HERE', // Set receiverAvatar to the file URL or path
        senderName: userData.user.firstName,
        timestamp: new Date().toISOString(),
        receiverId: userData.user.user?._id,
        receiverName: userData.user.user.firstName,
      };

      try {
        await sendMessageToAPI(message);
        setNewMessage(''); // Clear the input text field

        if (socket && socket.connected) {
          socket.emit('chat message', message);
        }

        const fetchDataAndScroll = async () => {
           await fetchMessagesFromAPI();
         };
  
         fetchDataAndScroll();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  
  
  // Function to delete a message
  const deleteMessage = async (messageId) => {
    try {
      const token = await AsyncStorage.getItem('@user_token');
      const response = await api.deleteMessagesToApi(messageId, token);

      if (response) {
        // Update the state to remove the deleted message
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message?._id !== messageId)
        );

        // Additionally, update the messageList state here
        const updatedMessageList = messageList.map((dateGroup) => ({
          ...dateGroup,
          messages: dateGroup.messages.filter(
            (message) => message._id !== messageId
          ),
        }));

        setMessageList(updatedMessageList);
      } else {
        throw new Error('Error deleting message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // UseEffect for animating the modal
  useEffect(() => {
    if (isVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, modalAnimatedValue]);

  // Render individual messages efficiently using PureComponent
  const renderItem = useCallback(
    ({ item }) => (
      <View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        {item.messages.map((message, index) => (
          <ChatMessage
            key={message._id}
            item={message}
            userData={userData}
            onDelete={() => deleteMessage(message._id)}
          />
        ))}
      </View>
    ),
    [userData]
  );

  // Extract the key extractor to a variable for better readability
  const keyExtractor = useCallback((item) => item.date || item._id, []);

  // Inside your ChatModal component...
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()}
    >   
      
      <View style={styles.modalContainer}>
        {/* Transparent background */}
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <View style={styles.transparentBackground} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [
                {
                  translateY: modalAnimatedValue.interpolate({
                    inputRange: [0, 0],
                    //outputRange: [0, SIZES.height * 0.08],
                    outputRange: [0, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={{ flex: 1, backgroundColor: 'transparent', ...SHADOWS.medium }}>
            {/* Header of the modal */}
            <View style={styles.headerContainer}>

            

            {/* Notification */}
            {notification && (
              <View style={styles.notificationContainer}>
                <PopUpNotification
                  message={notification}
                  onClose={() => setNotification(null)}
                />
              </View>
            )}


              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={icons.burger}
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    tintColor: COLORS.darkOrange,
                  }}
                />
                <Text
                  style={{
                    padding: SIZES.padding,
                    ...FONTS.h2,
                    fontSize: SIZES.body2,
                  }}
                >
                  Chat with Agent
                </Text>
              </View>

              <View style={styles.chatBadge}>
                <Text style={styles.chatBadgeText}>{numTextItems}</Text>
              </View>

              <IconButton
                containerStyle={{
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: COLORS.gray2,
                  marginLeft: 20,
                }}
                icon={icons.cross}
                iconStyle={{ tintColor: COLORS.gray2 }}
                onPress={onClose}
              />
            </View>

            {/* Message list */}
            <View style={{ flex: 1 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={messageList} // Reverse the order of messages
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={styles.messageList}
                ref={flatListRef}
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                windowSize={5}
                getItemLayout={(data, index) => ({
                  length: estimatedItemHeight,
                  offset: estimatedItemHeight * index,
                  index: index,
                })}
                onContentSizeChange={() => {
                  flatListRef.current.scrollToOffset({ animated: true, offset: messageList.length * estimatedItemHeight });
                }}
              />
            </View>

            {/* Input container */}
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.inputContainer}>
                {/* Attach files button */}
                <TouchableOpacity
                  style={styles.attachButton}
                  onPress={() => pickDocument()}
                >
                  <Image
                    source={icons.attach}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: COLORS.darkOrange,
                    }}
                  />
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  placeholder="Type your message..."
                  value={newMessage}
                  onChangeText={setNewMessage}
                  //onSubmitEditing={sendMessage}
                />

                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={sendMessage}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>          
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  chatBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chatBadgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  dateContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  modalContainer: {
    //flex: 1,
    backgroundColor: COLORS.transparentBlack7,
  },
  transparentBackground: {
    flex: 1,
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    height: SIZES.height,
    width: SIZES.width,
    padding: SIZES.padding,
    borderTopRightRadius: SIZES.padding,
    borderTopLeftRadius: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  messageList: {
    justifyContent: 'flex-end',
    // flex:1,
    flexGrow: 1,    
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkGray,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 30,
    borderRadius: 24,
    ...SHADOWS.dark,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    marginRight: 8,
    color: '#fff',
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attachButton: {
    backgroundColor: COLORS.white2,
    width: 40,
    height: 40,
    marginRight: 6,
    marginLeft: -6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  notificationContainer: {
    position: 'absolute',
    top: SIZES.padding,
    right: 10, // Adjust the right position as needed
    zIndex: 1, // Ensure the notification appears on top of other content
  },
});

export default ChatModal;
