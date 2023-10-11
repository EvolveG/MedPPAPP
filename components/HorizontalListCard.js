import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { dummyData, COLORS, SIZES, FONTS, icons, images, SHADOWS } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';

const HorizontalListCard = ({ containerStyle, imageStyle, item, onPress }) => {
  return (
      <TouchableOpacity style={{
        ...containerStyle
      }}>
        <View style={{ flex: 1 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.radius,
            paddingHorizontal:SIZES.radius,
            borderBottomColor: COLORS.white,
            marginRight:SIZES.padding,
            marginBottom:5,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.body2,
                color: COLORS.black,
                paddingHorizontal: SIZES.padding,
              }}>
                {item.name}
              </Text>
            </View>
            <View style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Text >STATUS</Text>
              <Text style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.body2,
                color: dummyData.myProfile.status == "Active" ? COLORS.green : COLORS.red,
              }}>
                {dummyData.myProfile.status}
              </Text>
            </View>

          </View>


          <View style={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: SIZES.radius,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.white,
          }}>
            <Text style={{ marginBottom: 5 }}>MEMBERSHIP Nº</Text>
            <Text style={{
              fontFamily: FONTS.regular,
              fontSize: SIZES.body2,
              color: COLORS.black,
            }}>
              {dummyData.myProfile.menbership_ID}
            </Text>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.white,
            borderRadius: SIZES.radius,
          }}>
            <View>
              <Text>SAVINGS</Text>
              <Text style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.body2,
                color: COLORS.black,
              }}>
                {dummyData.myProfile.balance}
              </Text>
            </View>
          </View>
        </View>

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[
            COLORS.transparent,
            COLORS.lightGray1
          ]}
          style={{
            position: 'absolute',
            top: 20,
            left: 0,
            right: 0,
            height: 46,
          }}
        />
      </TouchableOpacity>
  )
}

export default HorizontalListCard;
