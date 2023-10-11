import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTS, SIZES, COLORS, icons, SHADOWS } from '../../constants';
import { HeaderDetails, IconButton, NotificationAlertButton } from '../../components';

const BenefitDetails = ({route}) => {
    const navigation = useNavigation();
    const [selectedItem, setSelectedItem] = useState(route.params.selectedItem);
      

    //console.log(selectedItem)
  
    function renderHeader() {
      return (
        <HeaderDetails
          title={selectedItem.sName}
          containerStyle={{
            height: 35,
            marginHorizontal: SIZES.padding,
            marginTop: 55,
          }}
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
              onPress={() => navigation.goBack()}
            />
          }
          rightComponent={<NotificationAlertButton quantity={3} />}
        />
      );
    }
    
    const handleItemPress = (item) => {
      //setSelectedItem(item);
      //navigation.navigate('BenefitDetails', { selectedItem: item });
    };
  
    return (
      
      <View style={{ flex: 1, ...SHADOWS.dark }}>
        {renderHeader()}
      
        <Animated.View
          style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            padding: 20,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
          }}>
          <Text style={{ ...FONTS.h2 }}>DETAILS OF BENEFITS</Text>
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.darkGray,
              marginBottom: 15,
            }}
          />
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image
                source={icons.burger}
                style={{ width: 40, height: 40, tintColor: COLORS.darkOrange, }}
              />
              <Text style={{ fontWeight: 'bold', fontSize: 19, marginLeft: 10 }}>{selectedItem.serviceName}</Text>
            </View>
              
            <View style={{ width: '100%', height: 1, backgroundColor: COLORS.lightOrange, marginVertical: 10 }} />

            <View style={{ flexDirection: 'row'}}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>Description</Text>
                <Text>{selectedItem.serviceDescription}</Text>
              </View>              
            </View>

            <View style={{ width: '100%', height: 1, backgroundColor: COLORS.lightGray1, marginVertical: 10 }} />

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>Total</Text>
                <Text>{selectedItem.servicePrice}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>Status</Text>
                <Text style={{ color: selectedItem.status = 'Active' ? COLORS.green : COLORS.red }}>{selectedItem.status}</Text>
              </View>
              <View style={{ flex: 1, marginBottom: SIZES.padding,}}>
                <Text style={{ fontWeight: 'bold' }}>Remaining</Text>
                <Text style={{ color: selectedItem.remainingBalance > 0 ? COLORS.green : COLORS.red }}>{selectedItem.remainingBalance}</Text>
              </View>
            </View>        
        </Animated.View>
      </View>
    );
}

export default BenefitDetails