import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,FlatList, StyleSheet
} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import {Home, Contacts, HealthCare, NotificationTabScreen, ManageDep, Requests, MembCardRequest, AuthrizationRequest, HelpMenu, HistoryTabScreen, Profile} from "../screens";

import {FONTS, COLORS, SIZES, icons,images, constants} from "../constants";
import { Header } from "../components";

import { LinearGradient } from 'expo-linear-gradient';

import { Entypo } from '@expo/vector-icons';

const TabButton = ({label, icon, isFocused, onPress, outerContainerStyle, innerContainerStyle}) =>{
    return(
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View style={[
                {
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                },
                outerContainerStyle
            ]}>
                <Animated.View style={[
                    {
                        flexDirection:'row',
                        width:"100%",
                        height:50,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:25
                    },
                    innerContainerStyle


                ]}>

                    <Image source={icon} style={{
                        width:27,
                        height:25,
                        tintColor: isFocused ? COLORS.darkOrange :COLORS.gray
                    }}/>

                    {isFocused && 
                        <Text 
                            numberOfLines={1}
                            style={{
                                marginLeft:5,
                                color: COLORS.darkOrange,
                                ...FONTS.h3
                            }}>
                            {label}
                        </Text>
                    }

                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )

}

const MainLayout = ({userData, navigation, setSelectedTab, selectedTab}) => {

    const flatListRef = React.useRef()

    // Animacao dos botoes de baixo
    const homeTabFlex = useSharedValue(1)
    const homeTabColor = useSharedValue(COLORS.white)

    const notificationTabFlex = useSharedValue(1)
    const notificationTabColor = useSharedValue(COLORS.white)

    const healthCareTabFlex = useSharedValue(1)
    const healthCareTabColor = useSharedValue(COLORS.white)

    const contactTabFlex = useSharedValue(1)
    const contactTabColor = useSharedValue(COLORS.white)

    // estilo da animacao dos botoes de baixo

    const homeFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:homeTabFlex.value
        }
    })
    const homeColorStyle = useAnimatedStyle(()=>{
        return {
            backgroungColor: homeTabColor.value
        }
    })

    const notificationFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:notificationTabFlex.value
        }
    })
    const notificationColorStyle = useAnimatedStyle(()=>{
        return {
            backgroungColor:notificationTabColor.value
        }
    })

    const healthCareFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:healthCareTabFlex.value
        }
    })
    const healthCareColorStyle = useAnimatedStyle(()=>{
        return {
            backgroungColor:healthCareTabColor.value
        }
    })

    const contactFlexStyle = useAnimatedStyle(()=>{
        return {
            flex: contactTabFlex.value
        }
    })
    const contactColorStyle = useAnimatedStyle(()=>{
        return {
            backgroungColor: contactTabColor.value
        }
    })

    React.useEffect(() => {
        setSelectedTab(constants.screens.home)
    },[])

    React.useEffect(() => {
        if(selectedTab == constants.screens.home){
            flatListRef?.current?.scrollToIndex({
                index:0,
                animated: false
            })


            homeTabFlex.value = withTiming( 2 , {duration: 500})    
            homeTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            homeTabFlex.value = withTiming(1,{duration:500})    
            homeTabColor.value = withTiming(COLORS.white,{duration:500})
        }

        if(selectedTab == constants.screens.notification){
            flatListRef?.current?.scrollToIndex({
                index:1,
                animated: false
            })


            notificationTabFlex.value = withTiming(2,{duration:500})    
            notificationTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            notificationTabFlex.value = withTiming(1,{duration:500})    
            notificationTabColor.value = withTiming(COLORS.white,{duration:500})
        }

        if(selectedTab == constants.screens.HealthCare){
            flatListRef?.current?.scrollToIndex({
                index:2,
                animated: false
            })

            healthCareTabFlex.value = withTiming(2,{duration:500})    
            healthCareTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            healthCareTabFlex.value = withTiming(1,{duration:500})    
            healthCareTabColor.value = withTiming(COLORS.white,{duration:500})
        }

        if(selectedTab == constants.screens.contacts){
            flatListRef?.current?.scrollToIndex({
                index:3,
                animated: false
            })

            contactTabFlex.value = withTiming(2,{duration:500})    
            contactTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            contactTabFlex.value = withTiming(1,{duration:500})    
            contactTabColor.value = withTiming(COLORS.white,{duration:500})
        }

        if(selectedTab == constants.screens.manageDependent){
            flatListRef?.current?.scrollToIndex({
                index:4,
                animated: false
            })

            contactTabFlex.value = withTiming(2,{duration:500})    
            contactTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            contactTabFlex.value = withTiming(1,{duration:500})    
            contactTabColor.value = withTiming(COLORS.white,{duration:500})
        }

        if(selectedTab == constants.screens.history){
            flatListRef?.current?.scrollToIndex({
                index:5,
                animated: false
            })

            contactTabFlex.value = withTiming(2,{duration:500})    
            contactTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            contactTabFlex.value = withTiming(1,{duration:500})    
            contactTabColor.value = withTiming(COLORS.white,{duration:500})
        }

        if(selectedTab == constants.screens.requests){
            flatListRef?.current?.scrollToIndex({
                index:6,
                animated: false
            })

            contactTabFlex.value = withTiming(2,{duration:500})    
            contactTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            contactTabFlex.value = withTiming(1,{duration:500})    
            contactTabColor.value = withTiming(COLORS.white,{duration:500})
        }     

        if(selectedTab == constants.screens.help){
            flatListRef?.current?.scrollToIndex({
                index:7,
                animated: false
            })

            contactTabFlex.value = withTiming(2,{duration:500})    
            contactTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            contactTabFlex.value = withTiming(1,{duration:500})    
            contactTabColor.value = withTiming(COLORS.white,{duration:500})
        }

        if(selectedTab == constants.screens.documentRequests){
            flatListRef?.current?.scrollToIndex({
                index:8,
                animated: false
            })

            contactTabFlex.value = withTiming(2,{duration:500})    
            contactTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            contactTabFlex.value = withTiming(1,{duration:500})    
            contactTabColor.value = withTiming(COLORS.white,{duration:500})
        }

        if(selectedTab == constants.screens.memBerCardRequests){
            flatListRef?.current?.scrollToIndex({
                index:9,
                animated: false
            })

            contactTabFlex.value = withTiming(2,{duration:500})    
            contactTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            contactTabFlex.value = withTiming(1,{duration:500})    
            contactTabColor.value = withTiming(COLORS.white,{duration:500})
        }

        if(selectedTab == constants.screens.authorizationRequests){
            flatListRef?.current?.scrollToIndex({
                index:10,
                animated: false
            })

            contactTabFlex.value = withTiming(2,{duration:500})    
            contactTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            contactTabFlex.value = withTiming(1,{duration:500})    
            contactTabColor.value = withTiming(COLORS.white,{duration:500})
        }

        if(selectedTab == constants.screens.profile){
            flatListRef?.current?.scrollToIndex({
                index:11,
                animated: false
            })

            contactTabFlex.value = withTiming(2,{duration:500})    
            contactTabColor.value = withTiming(COLORS.darkOrange,{duration:500})
        }else{
            contactTabFlex.value = withTiming(1,{duration:500})    
            contactTabColor.value = withTiming(COLORS.white,{duration:500})
        }


        //console.log(userData);



    }, [selectedTab])


    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                
            }}
        >

        {/*------------------- Heather ---------------------- */}
            <Header 
                containerStyle={{
                    height: 50,
                    paddingHorizontal: SIZES.padding,
                    marginTop:50,
                    alignItems:'center'
                }}
                
                //title={selectedTab.toUpperCase()}

                leftComponet={
                    <TouchableOpacity 
                        style={{
                            width:40,
                            height:40,
                            alignItems:'center',
                            justifyContent:'center',
                            borderWidth:1,
                            borderColor:COLORS.gray2,
                            borderRadius: SIZES.radius,
                            
                        }}

                        onPress={()=> navigation.openDrawer()}
                    >

                    <Image source={icons.menu}/>
                    
                    </TouchableOpacity>
                }

                rightComponent={
                    <TouchableOpacity style={{
                        borderRadius: SIZES.radius,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>

                    <Image source={images.medPlusLogo02}
                        style={{
                            width:90,
                            height:40,
                        }}
                    />


                    </TouchableOpacity>

                }
            />
            {/* ----------------- Content ------------------------ */}
            <View style={{
                flex:1
            }}>                
              {/* <Text>MainLayout</Text> */}

              {/* -------------------------------- Corpo do Main Menu -------------------------------------- */}

                <FlatList
                    ref={flatListRef}
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={item=> `${item.id}`}
                    drawerContent={props =>{
                        return(
                            <Home 
                                navigation= {props.navigation}
                                selectedTab= {selectedTab}
                                setSelectedTab={setSelectedTab}
                            />
                        )
                    }}
                    renderItem={({item, index})=>{
                        return(
                            <View style={{
                                height: SIZES.height,
                                width: SIZES.width,
                            }}>
                                {/* {item.label == constants.screens.Login && <Login/>} */}
                                {item.label == constants.screens.home && <Home userData={userData}/>}
                                {item.label == constants.screens.notification && <NotificationTabScreen userData={userData}/>}
                                {item.label == constants.screens.HealthCare && <HealthCare/>}
                                {item.label == constants.screens.contacts && <Contacts/>}
                                
                                {item.label == constants.screens.manageDependent && <ManageDep/>}                                
                                {item.label == constants.screens.documentRequests && <Requests userData={userData}/>} 
                                {item.label == constants.screens.memBerCardRequests && <MembCardRequest userData={userData}/>} 
                                {item.label == constants.screens.authorizationRequests && <AuthrizationRequest userData={userData}/>} 
                                {item.label == constants.screens.history && <HistoryTabScreen userData={userData}/>} 
                                {item.label == constants.screens.profile && <Profile/>}                                    
                                {item.label == constants.screens.help && <HelpMenu userData={userData}/>} 
                                

                            </View>
                        )
                    }}
                />

            {/* -------------------------------- Faz desaparecer o Botao de chat quando abre a tela do Help ---------------------------------- */}
                {selectedTab !== constants.screens.help ? (
                    <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => setSelectedTab(constants.screens.help)}
                        style={styles.chatButton}
                    >
                        <Entypo name="chat" size={24} color={COLORS.lightGray1} />
                    </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.hiddenChatButton} />
                )}


              {/* -------------------------------- End Corpo do Main Menu ---------------------------------- */}

            </View>

            

            <View 
                style={{
                    height:100,
                    justifyContent:'flex-end'
                }}>

                {/* Shadow effect */}
                <LinearGradient
                    start={{ x: 0 , y: 0}}
                    end={{ x: 0 , y: 4}}
                    colors={[
                        COLORS.transparent,
                        COLORS.lightGray1
                    ]}
                    style={{
                        position:'absolute',
                        top:-20,
                        left:0,
                        right:0,
                        height:100,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    }}
                />

                {/* ----- Butoes do task bar onde vem as iteractions por baixo */}
                <View style={{
                    flex:1,
                    flexDirection:'row',
                    paddingHorizontal: SIZES.radius,
                    paddingBottom:10,
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    backgroundColor: COLORS.white
                }}>
                    <TabButton
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab==constants.screens.home}
                        outerContainerStyle={homeFlexStyle}
                        innerContainerStyle={homeColorStyle}
                        onPress={()=> setSelectedTab(constants.screens.home)}
                    />

                    <TabButton
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab==constants.screens.notification}
                        outerContainerStyle={notificationFlexStyle}
                        innerContainerStyle={notificationColorStyle}
                        onPress={()=> setSelectedTab(constants.screens.notification)}
                    />

                    <TabButton
                        label={constants.screens.HealthCare}
                        icon={icons.medCare}
                        isFocused={selectedTab==constants.screens.HealthCare}
                        outerContainerStyle={healthCareFlexStyle}
                        innerContainerStyle={healthCareColorStyle}
                        onPress={()=> setSelectedTab(constants.screens.HealthCare)}
                    />

                    <TabButton
                        label={constants.screens.contacts}
                        icon={icons.contacts}
                        isFocused={selectedTab==constants.screens.contacts}
                        outerContainerStyle={contactFlexStyle}
                        innerContainerStyle={contactColorStyle}
                        onPress={()=> setSelectedTab(constants.screens.contacts)}
                    />                    

                </View>


            </View>

        </Animated.View>
    )
}

function mapStateToProps(state){
    return{
        selectedTab: state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(dispatch){
    return{
        setSelectedTab: (selectedTab) => { return dispatch
        (setSelectedTab(selectedTab))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },
    chatButton: {
        backgroundColor: COLORS.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 20,
    },
    hiddenChatButton: {
        height: 50,
        width: 50,
        marginRight: 20,
        marginBottom: 20,
    },
});