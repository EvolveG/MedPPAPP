import { View, Text, Image, ImageBackground } from 'react-native';
import React from 'react';
import { images, SIZES, COLORS, FONTS } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Title } from 'react-native-paper';
import { useFonts } from 'expo-font';



const AuthLayout = ({title, subtitle, titleContainerStyle, children}) => {
    const [loaded]=useFonts({
        InterBold: require("../../assets/fonts/Inter-Bold.ttf"),
        InterSemiBold: require("../../assets/fonts/Inter-SemiBold.ttf"),
        InterMedium: require("../../assets/fonts/Inter-Medium.ttf"),
        InterRegular: require("../../assets/fonts/Inter-Regular.ttf"),
        InterLight: require("../../assets/fonts/Inter-Light.ttf"),
        PoppinsBlack: require('../../assets/fonts/Poppins-Black.ttf'),
        PoppinsBlackItalic: require('../../assets/fonts/Poppins-BlackItalic.ttf'),
        PoppinsExtraBold: require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
        PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
        PoppinsBoldItalic: require('../../assets/fonts/Poppins-BoldItalic.ttf'),
        PoppinsExtraBoldItalic: require('../../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
        PoppinsExtraLight: require('../../assets/fonts/Poppins-ExtraLight.ttf'),
        PoppinsExtraLightItalic: require('../../assets/fonts/Poppins-ExtraLightItalic.ttf'),
        PoppinsItalic: require('../../assets/fonts/Poppins-Italic.ttf'),
        PoppinsLightItalic: require('../../assets/fonts/Poppins-LightItalic.ttf'),
    });
    
    if(!loaded)return null;


  return (
    <View style={{
        flex:1,
        paddingVertical:SIZES.padding,
        backgroundColor: COLORS.white
    }}>
        <ImageBackground
                source={images.medPlusBackgroung}
                resizeMode="contain"
                style={{
                    flex:1,
                    justifyContent: 'flex-end',
                    height: "100%",
                    width: "100%"
                }}
            >

            <KeyboardAwareScrollView 
                keyboardDismissMode="on-drag"
                contentContainerStyle={{
                    flex:1,
                    paddingHorizontal: SIZES.padding
                }}
            >

                {/* ----------------- Logo Mediplus App Icon ----------- */}
                <View style={{
                    alignItems:'center',
                    marginTop:70,
                }}>
            
                    <Image
                        source={images.medPlusLogo02}
                        resizeMode="center"
                        style={{
                            height:100,
                            width:200,
                        }}
                    />
                </View>

                {/*----------------- titulo -----------------------*/}

                <View style={{
                    marginTop:SIZES.padding,
                    ...titleContainerStyle
                }}>
                    <Text style={{
                        textAlign:'center',
                        ...FONTS.h2
                    }}>
                        {title}
                    </Text>

                    <Text style={{
                        textAlign:'center',
                        color: COLORS.darkGray,
                        marginTop: SIZES.base,
                        marginBottom:50,
                        ...FONTS.body3

                    }}>{subtitle}</Text>
                </View>

                {/*---------------- children butoes ---------------- */}

                {children}
            </KeyboardAwareScrollView>

        </ImageBackground>     

    </View>
  )
}

export default AuthLayout