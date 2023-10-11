import { View, Text,ScrollView,FlatList,TouchableOpacity,Image,Animated,ImageBackground} from 'react-native';
import React, { useState, useEffect } from 'react';
import {COLORS,SIZES,FONTS,icons,images,SHADOWS} from "../constants";
import { useNavigation } from '@react-navigation/native';
import NotificationModal from '../screens/Notification/NotificationModal';
import {  socket, eventSource  } from '../screens/Authentication/socket';

const Header = ({ containerStyle, title, leftComponet, rightComponent }) => {
  const navigation = useNavigation();
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to toggle the chat modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);   
  };

  // Simulate receiving notifications and updating the notificationHistory
  const simulateNewNotification = () => {
    const newNotification = {
      id: notificationHistory.length + 1,
      requestType: 'New Notification',
      date: new Date().toLocaleString(),
    };
    setNotificationHistory((prevHistory) => [newNotification, ...prevHistory]);
  };

  useEffect(() => {
    // Listen for changes in the receiver's online status using WebSockets
    socket.on("notification", (notificationMessage) => {
      console.log("Received notification:", notificationMessage);

      if (notificationMessage) {
        console.log(1)
        simulateNewNotification();
      } else {
        console.error('Received empty message');
      }
      
    });

    // Listen for SSE events
    eventSource.addEventListener('message', (event) => {
      // Handle the SSE event data
      const data = JSON.parse(event.data);
      console.log('Received SSE notification:', data);
      // Handle SSE notifications here
      simulateNewNotification();
    });



     // Simulate receiving notifications and updating the notificationHistory
     const newNotification = {
       id: notificationHistory.length + 1,
       requestType: 'New Notification',
       date: new Date().toLocaleString(),
     };
  
    setNotificationHistory((prevHistory) => [newNotification, ...prevHistory]);



    // Clean up socket listener and emit offline status on component unmount
    return () => {
      // Clean up the EventSource when the component unmounts
      eventSource.close();
    };
  }, []);


  return (
      <View style={{
          flexDirection: 'row',
          ...containerStyle
      }}>
          {/* Left side */}
          {leftComponet}

          {/* Title */}
          <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10
          }}>
              <Text style={{
                  ...FONTS.h3,
              }}>
                  {title}
              </Text>
          </View>

          {/* Right side */}
          {rightComponent}

          <TouchableOpacity
              style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  marginLeft: 160
              }}
              onPress={toggleModal}
          >
              <Image
                source={icons.notification}
                resizeMode="contain"
                style={{
                  flex: 1,
                  tintColor: COLORS.gray
                }}
              />
          </TouchableOpacity>

          {/* Notification Modal */}
          <NotificationModal isVisible={isModalVisible} onClose={toggleModal} notificationHistory={notificationHistory} />
       
      </View>
  );
};


export default Header;