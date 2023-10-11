import { View, Text } from 'react-native';
import React from 'react';
import {FONTS, icons, images, SHADOWS } from '../constants';


const HeaderDetails = ({
    containerStyle,
    title,
    titleStyle,
    leftComponent,
    rightComponent
}) => {
  return (
    <View style={{
        height:60,
        flexDirection:'row',
        ...containerStyle
    }}>
        {
            leftComponent
        }

        <View style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }}>
            <Text style={{
                ...FONTS.body2,
                ...titleStyle
            }}>
                {title}
            </Text>
        </View>

        
        {
            rightComponent
        }
    </View>
  )
}

export default HeaderDetails