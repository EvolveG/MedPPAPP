import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { FONTS, SIZES, COLORS, SHADOWS } from '../../constants';
import ChatModal from './ChatModal';
import { socket } from '../Authentication/socket';

const HelpMenu = ({ userData }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const userId = userData.user._id;
  const receiverUserId = userData.user._id;

  // Function to toggle the chat modal visibility
  const toggleModal = () => {
    if (userStatus) {
      setModalVisible(!isModalVisible);
    } else {
      // Display an alert when the agent is offline
      Alert.alert('Agent Offline', 'The agent is currently offline. Please try again later.');
    }
  };

  useEffect(() => {
    // Listen for changes in the receiver's online status
    socket.on("userStatus", (data) => {
      const { userId: onlineUserId, isOnline } = data;
      console.log(onlineUserId.userId)
      console.log(receiverUserId)
      // Validate the receiverUserId and update online status for the current user
      if (onlineUserId.userId === receiverUserId) {
        setUserStatus(isOnline);
        console.log(isOnline)
      }else{
        setUserStatus(false);
      }
    });

    // Emit user's online status when the component mounts
    socket.emit('user-online', { userId, isOnline: true });

    // Clean up socket listener and emit offline status on component unmount
    return () => {
      socket.emit('user-online', { userId, isOnline: false });
      socket.off("userStatus"); // Remove the event listener when unmounting
    };
  }, [userId, receiverUserId]);

  const mainUserAgent = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          backgroundColor: COLORS.lightGray2,
          borderRadius: SIZES.radius,
          paddingVertical: SIZES.base,
          paddingHorizontal: SIZES.padding,
          ...SHADOWS.dark,
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: SIZES.base,
          }}
          onPress={toggleModal}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ fontWeight: 'bold' }}>
              <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>{`Name: `}</Text>
              <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>{`Type: `}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text style={{ ...FONTS.h3, fontWeight: 'bold', color: COLORS.darkGray2 }}>
                {userData.user.user.firstName} {userData.user.user.lastName}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.darkGray2 }}>Agent</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            backgroundColor: COLORS.lightGray1,
            borderRadius: SIZES.radius,
            paddingVertical: SIZES.base,
            alignItems: 'center',
          }}
        >
          <Text style={{ paddingHorizontal: SIZES.padding, color: COLORS.black, fontWeight: 'bold', }}>Status: </Text>
          {userStatus ? (
            <Text style={{ ...FONTS.body3, color: COLORS.green }}>Online</Text>
          ) : (
            <Text style={{ ...FONTS.body3, color: COLORS.red }}>Offline</Text>
          )}
        </View>

        {userStatus ? (
          // Render a success message and a button to reset the form
          <View>
           
          </View>
        ) : (
          
          <View>
            <Text style={{ fontWeight: 'bold', 
                  ...FONTS.h3,
                  borderRadius: 5,
                  marginTop: SIZES.padding, }}>
              Call help service:
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding,
                backgroundColor: COLORS.lightGray1,
                borderRadius: SIZES.radius,
                paddingVertical: SIZES.base,
                alignItems: 'center',
              }}
            >
              <Text style={{ paddingHorizontal: SIZES.padding, color: COLORS.black, fontWeight: 'bold', }}> E-mail: </Text>
              <TouchableOpacity>
                <Text style={{ color: COLORS.darkGray }}>{userData.user.user.email}</Text>
              </TouchableOpacity>            
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.base,
                backgroundColor: COLORS.lightGray1,
                borderRadius: SIZES.radius,
                paddingVertical: SIZES.base,
                alignItems: 'center',
              }}
            >
              <Text style={{ paddingHorizontal: SIZES.padding, color: COLORS.black, fontWeight: 'bold', }}> Contact: </Text>
              <TouchableOpacity>
                <Text style={{ color: COLORS.darkGray }}>+2588205889033</Text>
              </TouchableOpacity>            
            </View>          
          </View>
        )}




      </View>
    );
  };

  return (
    <Animated.View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        padding: 16,
        ...SHADOWS.dark,
      }}
    >
      <Text style={{ ...FONTS.h2 }}>Tap to Chat</Text>
      <View style={{ height: 1, backgroundColor: COLORS.primary }} />
      {mainUserAgent()}
      {/* Button to open the chat modal */}
      <ChatModal isVisible={isModalVisible} userData={userData} onClose={toggleModal} />
    </Animated.View>
  );
};

export default HelpMenu;
