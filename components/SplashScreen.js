import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { images, COLORS } from '../constants';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Set a timeout to navigate to MainLayout after 2 seconds (adjust as needed)
    const timeout = setTimeout(() => {
      navigation.navigate('CustomD');
    }, 2000);

    // Clear the timeout on unmount (to prevent memory leaks)
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* Add LinkedIn logo or any other loading animation */}
      <Image source={images.linkedinLogo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.linkedinBlue, // Set the background color to match LinkedIn theme
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
