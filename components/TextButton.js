import { View, Text, TouchableOpacity } from 'react-native'
import { FONTS,COLORS } from '../constants'
import React from 'react'

const TextButton = ({label, buttonContainerStyle, disabled, labelStyle, onPress}) => {
  return (
    <TouchableOpacity style={{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: COLORS.darkOrange,
        ...buttonContainerStyle
      }}
      disabled={disabled}
      onPress={onPress}
    >

        <Text 
        style={{
            color: COLORS.white,
            ...FONTS.h3,  
            ...labelStyle   
        }}>
            {label}
        </Text>

    </TouchableOpacity>

  )
}

export default TextButton