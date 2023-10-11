import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

PushNotification.configure({
  onRegister: (token) => {
    AsyncStorage.setItem('deviceToken', token);
  },

  onNotification: (notification) => {
    // Handle the incoming notification here
    console.log('Received a push notification: ', notification);
  },

  onAction: (notification) => {
    // Handle notification actions (if any)
    console.log('Notification action received: ', notification.action);
  },

  onRegistrationError: (error) => {
    console.error('Failed to register for push notifications:', error);
  },

  popInitialNotification: true,
  requestPermissions: true,
});

export default PushNotification;
