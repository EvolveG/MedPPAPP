import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { FONTS, SIZES, COLORS, icons, dummyData, SHADOWS } from "../../constants";
import { HeaderDetails, IconButton } from '../../components';

const ModalTemplate = ({ isVisible, onClose }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  const [notificationHistory, setNotificationHistory] = React.useState(dummyData.notificationHistory);
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [activeTab, setActiveTab] = useState('tab1'); // Add state for the active tab

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => handleItemPress(item)}
      >
        <Image source={icons.rice}
          style={{ width: 30, height: 30, tintColor: COLORS.darkOrange }}
        />
        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text>{item.requestType}</Text>
          <Text>{item.date}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

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

  function renderHeader() {
    return (
      <HeaderDetails
        title="Notifications"
        containerStyle={{
          height: "7%",
          marginTop: SIZES.padding,
          alignItems: 'center',
          ...SHADOWS.dark,
        }}
        titleStyle={{ ...FONTS.h2, fontWeight: 'bold' }}     
        leftComponent={
          <IconButton
            icon={icons.left}
            containerStyle={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{
              width: 40,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={onClose}
          />
        }
      />
    );
  }

  return (
    <Modal
      visible={isVisible}
      animationType="Fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Transparent background */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.transparentBackground} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [
                {
                  translateY: modalAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [SIZES.height, 0],
                  },
                )},
              ],
            },
          ]}
        >
          {renderHeader()}

          <View style={{
            height: 1,
            backgroundColor: COLORS.darkOrange,
            marginBottom: SIZES.padding
          }} />

          {/* Tab buttons */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'tab1' && { backgroundColor: COLORS.primary },
              ]}
              onPress={() => setActiveTab('tab1')}
            >
              <Text style={[styles.tabText, activeTab === 'tab1' && { color: COLORS.white }]}>Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'tab2' && { backgroundColor: COLORS.primary },
              ]}
              onPress={() => setActiveTab('tab2')}
            >
              <Text style={[styles.tabText, activeTab === 'tab2' && { color: COLORS.white }]}>Messages</Text>
            </TouchableOpacity>
          </View>
          {/* Tab content */}
          {activeTab === 'tab1' && (
            <FlatList
              scrollEnabled={false}
              data={notificationHistory}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return (
                  <View style={{
                    width: "100%",
                    height: 1,
                  }}>
                  </View>
                );
              }}
            />
          )}
          {activeTab === 'tab2' && (
            <View>
              {/* Content for Tab 2 */}
            </View>
          )}

          {/* Abre a janela de detalhes para as notificacoes */}
          {showDetailModal &&
            <DetailModalNotification
              isVisible={showDetailModal}
              onClose={() => setShowDetailModal(false)}
              selectedItem={selectedItem}
            />
          }

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
    height: SIZES.height,
    width: SIZES.width,
    padding: SIZES.padding,
    borderTopRightRadius: SIZES.padding,
    borderTopLeftRadius: SIZES.padding,
    backgroundColor: COLORS.lightGray2,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
    padding: SIZES.padding,
    ...SHADOWS.medium
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: SIZES.base,
  },
  tabButton: {
    flex: 1,
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  tabText: {
    ...FONTS.h3,
  },
});

export default ModalTemplate;
