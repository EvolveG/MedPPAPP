import { View, Text,TouchableOpacity,Image } from 'react-native';
import React from 'react';
import {FONTS,SIZES,COLORS,icons} from '../constants';


const VerticalListCard = ({containerStyle,imageStyle,item,onPress}) => {
    return (
        <TouchableOpacity 
            style={{
                width:200,
                padding: SIZES.radius,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor:COLORS.lightGray2,
                ...containerStyle
        }}>
            {/* image section */}
            <View style={{
                height:150,
                width:150,
                alignItems:'center',
                justifyContent:'center'
            }}>
            <Image
                source={item.Image}
                style={{height:"100%",
                width:"100%"}}
            />

            </View>

            {/* description */}
            <View style={{
                alignItems:'center',
                marginTop: -20
            }}>

                <Text style={{...FONTS.h3}}>{item.name}</Text>

                <Text style={{color: COLORS.darkGray2, textAlign:'center', ...FONTS.body5}}>{item.description}</Text>

                <Text style={{marginTop:SIZES.radius, ...FONTS.h2}}>{item.price}%</Text>


            </View>
  
  
        </TouchableOpacity>
    )
  }
  
  export default VerticalListCard;