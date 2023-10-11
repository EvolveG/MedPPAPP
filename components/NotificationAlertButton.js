import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { dummyData, COLORS, SIZES, FONTS, icons, images, SHADOWS } from '../constants';

const NotificationAlertButton = ({containerStyle, iconStyle, quantity, onPress}) => {
  return (
    <TouchableOpacity style={{
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightOrange2,
        ...containerStyle
    }}
    onPress={onPress}
    >
        <Image
            source={icons.notification}
            style={{
                width:30,
                height:25,
                tintColor: COLORS.black,
                ...iconStyle
            }}
        />

        <View style={{
            position:'absolute',
            top:3,
            right:1,
            width:15,
            height:15,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.darkOrange
        }}>
            <Text style={{
                color:COLORS.white,
                ...FONTS.body5,
                lineHeight:0,
                fontSize:10
            }}>
                {quantity}
            </Text>
        </View>

    </TouchableOpacity>
    
  )
}

export default NotificationAlertButton