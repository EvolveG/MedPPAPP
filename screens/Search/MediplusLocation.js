import React, { useEffect, useState, useRef } from 'react';
import { View, Modal, StyleSheet, FlatList, TouchableOpacity, Text, Animated, TouchableWithoutFeedback, Image, TextInput } from 'react-native';
import { COLORS, SIZES, FONTS, icons, SHADOWS } from '../../constants';
import { IconButton } from '../../components';

const MediplusLocation = ({ visible, onClose, onShowOnMap, locationCoordinates }) => {
  const [modalAnimatedValue] = useState(new Animated.Value(0));
  const mapRef = useRef(null);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });

  useEffect(() => {
    if (visible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, modalAnimatedValue]);

  const handleShowOnMap = () => {
    if (locationCoordinates) {
      // Use the mapRef to zoom to the specified location coordinates
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: locationCoordinates.latitude,
          longitude: locationCoordinates.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      }
    }
  };
  
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <View style={styles.transparentBackground} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: modalY }],
            },
          ]}
        >
          {/* Content for Company Profile */}
          <View style={styles.headerContainer}>
            <Image
              source={icons.burger}
              style={{ width: 30, height: 30, marginRight: 10, tintColor: COLORS.darkOrange }}
            />
            <Text style={{ flex: 1, ...FONTS.h2, fontSize: SIZES.body2 }}>MediPlus | Details</Text>

            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
              onPress={() => onClose()}
            />
          </View>
          <View style={{
            height: 1,
            marginTop: 15,
            backgroundColor: COLORS.darkOrange,
          }} />

          {/* Sample Company Profile Content */}
          <Text style={{ marginTop: 20, ...FONTS.body3 }}>
            MediPlus is a leading healthcare provider dedicated to delivering high-quality medical services to our communities.
          </Text>
          <Text style={{ marginTop: 10, ...FONTS.body3 }}>
            Our mission is to ensure the well-being of our patients by offering a range of medical facilities, including hospitals and pharmacies.
          </Text>
          <Text style={{ marginTop: 10, ...FONTS.body3 }}>
            For more information about our services and locations, please feel free to contact us.
          </Text>

          {/* Contact Information */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ ...FONTS.h3, marginBottom: 5 }}>Contact Information:</Text>
            <Text style={{ ...FONTS.body3, color: COLORS.gray }}>
              Address: 123 Medical Street, Cityville
            </Text>
            <Text style={{ ...FONTS.body3, color: COLORS.gray }}>
              Phone: +123 456 7890
            </Text>
            <Text style={{ ...FONTS.body3, color: COLORS.gray }}>
              Email: info@mediplus.com
            </Text>
            {/* Add more contact details here if needed */}
          </View>
          
          {/* Show on Map Icon */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 60,
            }}
            onPress={() => {
              handleShowOnMap();
              onShowOnMap(); // Trigger the callback to zoom and close modal
            }}
          >
            <Image
              source={icons.direction}
              style={{ width: 30, height: 30, marginRight: 10, tintColor: COLORS.darkOrange}}
            />
            <Text style={{ ...FONTS.body3, color: COLORS.primary }}>
              Show on Map
            </Text>
          </TouchableOpacity>


        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.transparentBlack7,
  },
  transparentBackground: {
    flex: 1,
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: '100%',
    padding: SIZES.padding,
    borderTopRightRadius: SIZES.padding,
    borderTopLeftRadius: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MediplusLocation;
