import { View, Text, Animated, TouchableOpacity, TouchableWithoutFeedback, Modal, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, FONTS, icons, SHADOWS } from '../../constants';
import { IconButton } from '../../components';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pdf from 'react-native-pdf'; // Import the react-native-pdf component


const PDFModal = ({ isVisible, pdfUrl, onClose }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={{
        flex: 1,
        backgroundColor: COLORS.transparentBlack7,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {loading && (
          <ActivityIndicator size="large" color={COLORS.darkOrange} />
        )}

        <WebView
          source={{ uri: pdfUrl }}
          style={{ flex: 1, width: SIZES.width, height: SIZES.height }}
          onLoad={() => setLoading(false)}
          onError={(error) => {
            console.error('WebView error:', error);
          }}
        />

        <IconButton
          containerStyle={{
            position: 'absolute',
            top: 50,
            right: 10,
          }}
          icon={icons.cross}
          iconStyle={{
            tintColor: COLORS.gray2
          }}
          onPress={() => onClose()}
        />
      </View>
    </Modal>
  )
}

const DetailModal = ({ isVisible, onClose, selectedItem }) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showDetailModal, setShowDetailModal] = React.useState(isVisible);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = React.useState(false);

  const updatedAtDate = new Date(selectedItem.updatedAt);
  const formattedDate = `${updatedAtDate.getFullYear()}-${updatedAtDate.getMonth() + 1}-${updatedAtDate.getDate()}`;

  const handlePDFDownload = async (item) => {
    try {
      setLoading(true);
      if (!item) {
        console.log('Invoice code not provided in the item:', item);
        alert('Invoice code not provided.');
        return;
      }

      const token = await AsyncStorage.getItem('@user_token');

      const response = await fetch(`https://zeus-api-63pe.onrender.com/api/get/mobilecustomerinvoice/${item}`, {
        method: 'GET',
        headers: {
          token: token,
        },
      });

      if (response.ok) {
        const pdfUrlWithToken = response.url;
        setPdfUrl(response.url);
        setPdfVisible(true);
      } else {
        console.log('Failed to fetch PDF:', response.status);
        alert('Failed to fetch PDF.');
      }
    } catch (error) {
      console.log('Error handling PDF:', error);
      alert('Error handling PDF.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (showDetailModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start(() => onClose());
    }
  }, [showDetailModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680]
  });

  const hasPDFFile = selectedItem.multipleFiles.includes('.pdf');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={{
        flex: 1,
        backgroundColor: COLORS.transparentBlack7
      }}>
        <TouchableWithoutFeedback
          onPress={() => setShowDetailModal(false)}
        >
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}>
          </View>
        </TouchableWithoutFeedback>

        <Animated.View style={{
          position: 'absolute',
          left: 0,
          top: modalY,
          width: "100%",
          height: "100%",
          padding: SIZES.padding,
          borderTopRightRadius: SIZES.padding,
          borderTopLeftRadius: SIZES.padding,
          backgroundColor: COLORS.white
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image source={icons.burger}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                tintColor: COLORS.darkOrange
              }}
            />
            <Text style={{
              flex: 1,
              ...FONTS.h2,
              fontSize: SIZES.body2,
            }}>
              Transaction Details
            </Text>

            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2
              }}
              onPress={() => setShowDetailModal(false)}
            />
          </View>

          <View style={{
            height: 1,
            marginTop: 15,
            backgroundColor: COLORS.darkOrange,
            marginBottom: SIZES.padding
          }} />

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.base,
          }}>
            <View style={{ flexDirection: 'column', marginRight: SIZES.radius }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: SIZES.padding }}>{`Name:`}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: SIZES.padding }}>{`Updated:`}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: SIZES.padding }}>{`Location:`}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: SIZES.padding }}>{`Service Type:`}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: SIZES.padding }}>{`Invoice Nº:`}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: SIZES.padding }}>{`Amount:`}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: SIZES.padding }}>{`Status:`}</Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, marginBottom: SIZES.padding, color: COLORS.darkGray2 }}>{selectedItem.customerId.firstName} {selectedItem.customerId.lastName}</Text>
              <Text style={{ fontSize: 18, marginBottom: SIZES.padding, color: COLORS.darkGray2 }}>{formattedDate}</Text>
              <Text style={{ fontSize: 18, marginBottom: SIZES.padding, color: COLORS.darkGray2 }}>{selectedItem.user.partnerUser.partnerName}</Text>
              <Text style={{ fontSize: 18, marginBottom: SIZES.padding, color: COLORS.darkGray2 }}>{selectedItem.serviceIds[0].serviceName}</Text>
              <Text style={{ fontSize: 18, marginBottom: SIZES.padding, color: COLORS.darkGray2 }}>{selectedItem.invoiceNumber}</Text>
              <Text style={{ fontSize: 18, marginBottom: SIZES.padding, color: COLORS.darkGray2 }}>{selectedItem.amountSpent}</Text>
              <Text style={{ fontSize: 18, marginBottom: SIZES.padding, color: COLORS.darkGray2 }}>{selectedItem.transactionStatus}</Text>
            </View>
          </View>

          <View style={{
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {loading && (
              <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
                onRequestClose={() => setLoading(false)}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator size="large" color={COLORS.darkOrange} />
                </View>
              </Modal>
            )}

            <View style={{
              marginTop: SIZES.padding,
              justifyContent: 'space-around'
            }}>
              <Text style={{
                fontSize: 17,
                ...SHADOWS.dark
              }}>
                Press the PDF to download the Invoice:
              </Text>
            </View>

            {hasPDFFile && !loading && (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <TouchableOpacity onPress={() => handlePDFDownload(selectedItem._id)}>
                  <Image source={icons.pdf}
                    style={{
                      width: 45,
                      marginTop: "5%",
                      height: 45,
                      marginRight: 10,
                      tintColor: COLORS.darkOrange
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
      </View>
      <PDFModal isVisible={pdfVisible} pdfUrl={pdfUrl} onClose={() => setPdfVisible(false)} />
    </Modal>
  )
}

export default DetailModal;
