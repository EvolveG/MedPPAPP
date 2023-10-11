import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const PopUpNotification = ({ message, onClose }) => {
    const [notificationVisible, setNotificationVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setNotificationVisible(false);
        onClose();
      }, 5000); // Automatically close the notification after 5 seconds
  
      return () => {
        clearTimeout(timer);
      };
    }, [onClose]);
  
    if (!notificationVisible) {
      return null;
    }
  
    return (
      <Animated.View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>{message}</Text>
        <TouchableOpacity onPress={() => setNotificationVisible(false)}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  const styles = StyleSheet.create({
    notificationContainer: {
      backgroundColor: COLORS.primary,
      padding: SIZES.padding,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    notificationText: {
      color: COLORS.white,
      fontSize: 16,
    },
    closeButton: {
      color: COLORS.white,
      fontSize: 16,
    },
  });

export default PopUpNotification