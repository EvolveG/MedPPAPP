import React from 'react';
import {
    View,
    Text,ImageBackground,
    Image, Animated, Dimensions
} from 'react-native';

import { constants, images, FONTS, SIZES, COLORS } from '../../constants';
import { TextButton } from '../../components';
import { useFonts } from 'expo-font';



const OnBoarding = ({navigation}) => {

    const scrollX = React.useRef( new Animated.Value(0)).current;
    const faltListRef = React.useRef()

    const [currentIndex, setcurrentIndex] = React.useState(0)

    const onViewChangeRef = React.useRef(({viewableItems, changed})=>{
        setcurrentIndex(viewableItems[0].index)
    })

    
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



    const Dots = () =>{
        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return(
            <View style={{
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {
                    constants.onboarding_screens.map((item,index)=>{
                        const dotColor = dotPosition.interpolate({
                            inputRange: [index-1, index, index + 1],
                            outputRange: [COLORS.lightOrange, COLORS.darkOrange, COLORS.lightOrange],
                            extrapolate:"clamp"
                        })

                        const dotWidth = dotPosition.interpolate({
                            inputRange: [index-1,index, index +1],
                            outputRange: [10, 30, 10],
                            extrapolate:"clamp"
                        })

                        return(
                            <Animated.View
                                key={`dot-${index}`}
                                style={{
                                    borderRadius:5,
                                    marginHorizontal:6,
                                    width: dotWidth,
                                    height:10,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })


                }
            </View>
        )
    }

    function renderHeaderLogo(){
        return(
            <View>
                {/* <Image
                    source={images.medPlusBackgroung}
                    style={{
                        width: "100%",
                        height: "100%"  
                    }}
                /> */}

                <View style={{
                    position:'absolute',
                    top: SIZES.height > 800 ? 50 : 25,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        source={images.medPlusLogo02}
                        resizeMode="contain"
                        style={{
                            width: SIZES.width * 0.5,
                            height: 150   
                        }}
                    />

                    


                </View>
            </View>
        )
    }

    function renderFooter(){
        return(
            <View style={{
                height:160,
            }}>

                {/* Butoes por baixo da description */}
                        
                <View 
                    style={{
                        flex:1,
                        justifyContent:'center',
                    }}>

                    <Dots/>
                </View>

                {/* botoes para ir ao login ou skip next page */}
                {currentIndex < constants.onboarding_screens.length -1 &&
                    <View style={{
                        flexDirection:'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: SIZES.padding,
                        marginVertical: SIZES.padding
                    }}>

                        <TextButton
                            label="Skip"
                            buttonContainerStyle={{
                                backgroundColor: null
                            }}
                            labelStyle={{
                                color: COLORS.darkGray2
                            }}
                            //onPress={()=> navigation.replace("Login")}
                            onPress={()=> navigation.replace("SignIn")}
                        />

                        <TextButton
                            label="Next"
                            buttonContainerStyle={{
                                height:60,
                                width:200,
                                borderRadius: SIZES.radius
                            }}
                            onPress={()=> 
                            {   faltListRef?.current?.scrollToIndex({
                                    index: currentIndex +1,
                                    animated: true
                                })                           
                            }}
                        />
                        
                    </View>
                }

                {currentIndex == constants.onboarding_screens.length -1  &&
                    <View 
                        style={{
                            paddingHorizontal:SIZES.padding,
                            marginVertical: SIZES.padding

                        }}
                    >
                        <TextButton 
                            label={"Let's Get Started"}
                            buttonContainerStyle={{
                                height:60,
                                borderRadius: SIZES.radius
                            }}
                            //onPress={()=> navigation.replace("Login")}
                            onPress={()=> navigation.replace("SignIn")}
                        />

                    </View>
                }

            </View>
        )

    }

    return (
        
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >

            {/* Logotipo e o background do OnBoarding screen */}

            {renderHeaderLogo()}

            {/* criar os slides das apresentacoes dos About Mediplus */}

            <Animated.FlatList
                ref={faltListRef}
                horizontal
                pagingEnabled
                data={constants.onboarding_screens}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [
                        {nativeEvent: {contentOffset: {x: scrollX}}}
                    ],
                    {useNativeDriver: false}
                )}
                onViewableItemsChanged={onViewChangeRef.current}
                keyExtractor={(item)=> `${item.id}`}
                renderItem={({item,index})=>{
                    return(
                        <View
                            style={{
                                width:SIZES.width
                            }}
                        >



                            {/* cabecalho */}
                            <View
                                style={{
                                    flex:3,
                                }}
                            >
                                <ImageBackground
                                    source={item.backgroundImage}
                                    style={{
                                        flex:1,
                                        alignItems:'center',
                                        justifyContent: 'flex-end',
                                        height: index == 1 ? "92%" : "100%",
                                        width: "100%"
                                    }}
                                >
                                    <Image
                                        source={item.bannerImage}
                                        resizeMode="contain"
                                        style={{
                                            width: SIZES.width * 0.8,
                                            height: SIZES.width * 0.8,
                                            marginBottom: -SIZES.padding
                                        }}
                                    />

                                </ImageBackground>

                            </View>



                            {/* Detalhes do cabecalho */}
                            <View style={{
                                flex:1,
                                marginTop:30,
                                alignItems:'center',
                                justifyContent:'center',
                                paddingHorizontal: SIZES.radius
                            }}>

                                <Text style={{
                                    ...FONTS.h1,
                                    fontSize:25,
                                }}>
                                    {item.title}
                                </Text>

                                <Text style={{
                                    marginTop:SIZES.radius,
                                    textAlign: 'center',
                                    color: COLORS.darkGray,
                                    paddingHorizontal: SIZES.padding,
                                    ...FONTS.body4
                                }}>
                                    {item.description}
                                </Text>

                                
                            </View>

                        </View>
                    )
                }}
            />


            {renderFooter()}    


        </View>
    )
}

export default OnBoarding;