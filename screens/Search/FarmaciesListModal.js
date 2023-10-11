import React, { useEffect, useState, useRef } from 'react';
import { View, Modal, StyleSheet, FlatList, TouchableOpacity, Text, Animated, TouchableWithoutFeedback, Image,TextInput } from 'react-native';
import { COLORS, SIZES, FONTS, icons, SHADOWS } from '../../constants';
import { IconButton } from '../../components';
import { parse, isAfter, isBefore } from 'date-fns';



const FarmaciesListModal = ({ visible, onClose, farmacies, onFarmaciesSelect }) => {
    const [modalAnimatedValue] = useState(new Animated.Value(0));

    const handleFarmaciesSelect = (farmacies) => {
      onFarmaciesSelect(farmacies);
      onClose();
  };
    
    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 680],
    });

    // Function to check if a hospital/clinic is currently open
    const isFarmacyOpen = (openingTime, closingTime) => {
      const currentTime = new Date();
      const openingDateTime = parse(openingTime, 'hh:mm a', new Date());
      const closingDateTime = parse(closingTime, 'hh:mm a', new Date());
    
      return isAfter(currentTime, openingDateTime) && isBefore(currentTime, closingDateTime);
    };
    
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
              {/* Content for Farmacies Modal */}
              <View style={styles.headerContainer}>
                <Image
                  source={icons.burger}
                  style={{ width: 30, height: 30, marginRight: 10, tintColor: COLORS.darkOrange }}
                />
                <Text style={{ flex: 1, ...FONTS.h2, fontSize: SIZES.body2 }}>Farmacies | Details</Text>  
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
                height:1,
                marginTop:15,
                backgroundColor:COLORS.darkOrange,
              }}/>

              <FlatList
                data={farmacies}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.itemContainer} onPress={() => handleFarmaciesSelect(item)}>
                    <View style={styles.labelContainer}>
                      {/* <Image source={icons.hospitals1} style={styles.icon} /> */}
                      <View>
                        <Text style={{ ...FONTS.h2, fontSize: 18, color:COLORS.darkGray2 }}>{item.name}</Text>
                        {/* <Text style={{ ...FONTS.h3, fontSize: SIZES.body3 }}>{item.description}</Text> */}
                      </View>
                    </View>
                    <View style={styles.labelContainer}>
                      <Image source={icons.call1} style={styles.icon} />
                      <Text style={{ ...FONTS.body3, fontSize: SIZES.body3, color: COLORS.green }}>{item.contact}</Text>
                    </View>
                    <View style={styles.labelContainer}>                                           
                      <Image source={icons.time} style={styles.icon} />
                      <View>
                        <Text style={{ ...FONTS.body3, fontSize: SIZES.body3 }}>{item.openingTime}</Text>
                        <Text style={{ ...FONTS.body3, fontSize: SIZES.body3 }}>{item.closingTime}</Text>
                      </View>
                    </View>
                    {/* Display open/closed status */}
                    <Text style={{ ...FONTS.h3, fontSize: SIZES.body3, color: isFarmacyOpen(item.openingTime, item.closingTime) ? COLORS.green : COLORS.red }}>
                      {isFarmacyOpen(item.openingTime, item.closingTime) ? 'Open' : 'Closed'}
                    </Text>
                  </TouchableOpacity>
                )}
              />

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
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
  },
  labelContainer: {
    flexDirection: 'row', // Align icon and label horizontally
    alignItems: 'center', // Center vertically within the row
    marginBottom: 5, // Add spacing between different label sections
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 5, // Add some spacing between the icon and label
    tintColor: COLORS.primary, // Adjust the color of the icon
  },
});

export default FarmaciesListModal;
