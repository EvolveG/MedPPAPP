import React from 'react';
import { View, Text, Image, TouchableOpacity, LogBox, Alert, Dimensions, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import MainLayout from '../screens/MainLayout';
import { useFonts } from 'expo-font';
import { COLORS, FONTS, SIZES, constants, icons, dummyData } from '../constants';

import { connect } from "react-redux";
import { setSelectedTab } from "../stores/tab/tabActions";

import AsyncStorage from "@react-native-async-storage/async-storage";

//--- Limpa as credenciais armazenadas no device --------------------------
const clearUserCredentials = async () => {
    try {
      await AsyncStorage.removeItem("@user_credentials");
    } catch (error) {
      console.log("Error clearing user credentials:", error);
    }
};

// --- Inicio do design da aplicacao ---------------------------------

// --- Layout in every device ----------------------------------------

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderImage: {
      width: 100,
      height: 100,
    },
    errorMessage: {
      textAlign: 'center',
    },
});

// --- END Layout in every device ------------------------------------


const Drawer = createDrawerNavigator();

const CustomDrawerItem= ({label,icon, isFocused, onPress})=>{
    return(
        <TouchableOpacity style={{
            flexDirection:'row',
            height: 40,
            marginBottom: SIZES.base,
            alignItems:'center',
            paddingLeft: SIZES.radius,
            borderRadius: SIZES.base,
            backgroundColor: isFocused ? COLORS.darkOrange : null
            }}
            
        onPress={onPress}
        >

            <Image source={icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white
                }}
            />

            <Text style={{ 
                marginLeft:15,
                color: COLORS.white,
                ...FONTS.h3
            }}>
                {label}
            </Text>
        
        </TouchableOpacity>
    )
}

const CustomDrawerContent= ({navigation, selectedTab, setSelectedTab, userData}) => {
    const [requestsOpen, setRequestsOpen] = React.useState(false); // track whether Requests menu is open
    const [docRequestsOpen, setDocRequestsOpen] = React.useState(false); // track whether Dependent Requests submenu is open
    const [memCardRequestsOpen, setMemCardRequestsOpen] = React.useState(false); // track whether Dependent Requests submenu is open
    const [authRequestsOpen, setAuthRequestsOpen] = React.useState(false); // track whether Appointment Requests submenu is open
    

    const handleLogout = () => {
        // Show the confirmation popup
        Alert.alert(
          "Logout",
          "Are you sure you want to log out?",
          [
            {
              text: "No",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                // Clear the user's credentials from AsyncStorage
               // clearUserCredentials();
                // Navigate to the SignIn screen
                navigation.replace("SignIn");
              },
            },
          ],
          { cancelable: false }
        );
    };

    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{flex:1}}
            
        >
            <View style={styles.container}>


            {/* -------------- Seccao de Perfil ------------------ */}
            <TouchableOpacity style={{
                flexDirection:'row',
                marginTop: SIZES.radius,
                alignItems:'center'
            }}
            >
                <Image source={dummyData.myProfile?.profile_image}
                    style={{
                        width:50,
                        height:50,
                        borderRadius: SIZES.radius
                    }}                    
                />
                <View style={{
                    marginLeft: SIZES.radius
                }}>
                    <Text style={{color: COLORS.white, ...FONTS.h3}}>
                        {userData?.user.firstName} {userData?.user.lastName} 
                    </Text>
                    <Text style={{color: COLORS.white, ...FONTS.body4}}>
                        Memb. ID: {userData?.user.memberShipID} 
                    </Text>
                </View>
            </TouchableOpacity>


            {/* Seccao de LogOut */}

            <View style={{ marginTop: SIZES.padding }}>
                <CustomDrawerItem
                    label="Logout"
                    icon={icons.logout}
                    onPress={handleLogout} // Update the onPress handler
                />
            </View>

            {/* --------------- Linha que ddivide os menus ------------------ */}

            <View style={{
                height:1,
                marginVertical: SIZES.radius,
                marginLeft:SIZES.radius,
                backgroundColor:COLORS.lightGray1,
                marginTop:5
            }}/>

            {/* --------------- Linha que ddivide os menus ------------------ */}    

            {/* -------------- End Seccao de Perfil -------------- */}           


            {/* --------------- Items do Drawer ------------------ */}
            <View style={{
                flex:1,
            }}>
                <CustomDrawerItem
                    label={constants.screens.home}
                    icon={icons.home}
                    isFocused={selectedTab == constants.screens.home}
                    onPress={()=>{
                        setSelectedTab(constants.screens.home)
                    }}
                />
                {/* <CustomDrawerItem
                    label={constants.screens.notification}
                    icon={icons.notification}
                    isFocused={selectedTab == constants.screens.notification}
                    onPress={()=>{
                        setSelectedTab(constants.screens.notification)
                    }}
                /> */}

                <TouchableOpacity
                    style={{
                        flexDirection:'row',
                        height: 40,
                        marginBottom: SIZES.base,
                        alignItems:'center',
                        paddingLeft: SIZES.radius,
                        borderRadius: SIZES.base,
                        backgroundColor: selectedTab == constants.screens.requests ? COLORS.darkOrange : null
                    }}
                    onPress={() => setRequestsOpen(!requestsOpen)}
                >
                    <Image
                        source={icons.wallet}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.white
                        }}
                    />
                    <Text style={{ 
                        marginLeft:15,
                        color: COLORS.white,
                        ...FONTS.h3
                    }}>
                        {constants.screens.requests}
                    </Text>
                    <Image
                        source={requestsOpen ? icons.up_arrow : icons.down_arrow}
                        style={{
                            width: 20,
                            height: 20,
                            marginLeft: 'auto',
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>

                {/* Document Requests submenu */}
                {requestsOpen && (
                    <TouchableOpacity
                        style={{
                            flexDirection:'row',
                            height: 40,
                            marginBottom: SIZES.base,
                            borderRadius: SIZES.base,
                            marginLeft: 35,
                            alignItems:'center',
                            paddingLeft: SIZES.radius,
                            backgroundColor: selectedTab == constants.screens.documentRequests ? COLORS.darkOrange : null
                        }}
                        onPress={() => {
                            setSelectedTab(constants.screens.documentRequests);
                            setDocRequestsOpen(false);
                        }}
                    >
                        <Image
                        source={icons.wallet}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.white
                        }}
                        />
                        <Text style={{ 
                            marginLeft: 10,
                            color: COLORS.white,
                            ...FONTS.h3
                        }}>
                            {constants.screens.documentRequests}
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Dependent Requests submenu
                {requestsOpen && (
                    <TouchableOpacity
                        style={{
                            flexDirection:'row',
                            height: 40,
                            marginBottom: SIZES.base,
                            borderRadius: SIZES.base,
                            marginLeft: 30,
                            alignItems:'center',
                            paddingLeft: SIZES.radius,
                            backgroundColor: selectedTab == constants.screens.memBerCardRequests ? COLORS.darkOrange : null
                        }}
                        onPress={() => {
                            setSelectedTab(constants.screens.memBerCardRequests);
                            setMemCardRequestsOpen(false);
                        }}
                    >
                        <Image
                        source={icons.membCard}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}/>
                        <Text style={{ 
                            marginLeft: 10,
                            color: COLORS.white,
                            ...FONTS.h3
                        }}>
                            {constants.screens.memBerCardRequests}
                        </Text>
                    </TouchableOpacity>
                )} */}


                {/* Appointment Requests submenu */}
                {requestsOpen && (
                    <TouchableOpacity
                        style={{
                            flexDirection:'row',
                            height: 40,
                            marginBottom: SIZES.base,
                            borderRadius: SIZES.base,
                            marginLeft: 30,
                            alignItems:'center',
                            paddingLeft: SIZES.radius,
                            backgroundColor: selectedTab == constants.screens.authorizationRequests ? COLORS.darkOrange : null
                        }}
                        onPress={() => {
                            setSelectedTab(constants.screens.authorizationRequests);
                            setAuthRequestsOpen(false);
                        }}
                    >
                        <Image
                        source={icons.authorization}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}/>
                        <Text style={{ 
                            marginLeft: 10,
                            color: COLORS.white,
                            ...FONTS.h3
                        }}>
                            {constants.screens.authorizationRequests}
                        </Text>
                    </TouchableOpacity>
                )}

                
                {/* --------------- Linha que ddivide os menus ------------------ */}

                <View style={{
                    height:1,
                    marginVertical: SIZES.radius,
                    marginLeft:SIZES.radius,
                    backgroundColor:COLORS.lightGray1
                }}/>

                {/* --------------- Linha que divide os menus ------------------ */}

                {/* Escondi o menu manageDependent */}
                {/* <CustomDrawerItem
                    label={constants.screens.manageDependent}
                    icon={icons.manageDependent}
                    isFocused={selectedTab == constants.screens.manageDependent}
                    onPress={()=>{
                        setSelectedTab(constants.screens.manageDependent)
                    }}
                /> */}
                <CustomDrawerItem
                    label={constants.screens.history}
                    icon={icons.history}
                    isFocused={selectedTab == constants.screens.history}
                    onPress={()=>{
                        setSelectedTab(constants.screens.history)
                    }}
                />
                {/* <CustomDrawerItem
                    label={constants.screens.HealthCare}
                    icon={icons.medCare}
                    isFocused={selectedTab == constants.screens.HealthCare}
                    onPress={()=>{
                        setSelectedTab(constants.screens.HealthCare)
                    }}
                /> */}
                <CustomDrawerItem
                    label={constants.screens.contacts}
                    icon={icons.contacts}
                    isFocused={selectedTab == constants.screens.contacts}
                    onPress={()=>{
                        setSelectedTab(constants.screens.contacts)
                    }}
                />

                {/* --------------- Linha que ddivide os menus ------------------ */}

                <View style={{
                    height:1,
                    marginVertical: SIZES.radius,
                    marginLeft:SIZES.radius,
                    backgroundColor:COLORS.lightGray1
                }}/>

                {/* --------------- Linha que divide os menus ------------------ */}

                {/* <CustomDrawerItem
                    label={constants.screens.profile}
                    icon={icons.membCard}
                    isFocused={selectedTab == constants.screens.profile}
                    onPress={()=>{
                        setSelectedTab(constants.screens.profile)
                    }}
                /> */}

                <CustomDrawerItem
                    label={constants.screens.help}
                    icon={icons.help}
                    isFocused={selectedTab == constants.screens.help}
                    onPress={()=>{
                        setSelectedTab(constants.screens.help)
                    }}
                />

            </View>

            </View>
        </DrawerContentScrollView>
    )
}

const CustomDrawer =({selectedTab, setSelectedTab})=>{
    //Remove todos os warning logs
    React.useEffect(() => {
        LogBox.ignoreAllLogs();
    });
        
    const [userData, setUserData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null); // Add a state to handle errors
  
    const fetchUserData = async () => {
        try {
          const token = await AsyncStorage.getItem("@user_token");
          //console.log(token);
    
          const response = await fetch("https://zeus-api-63pe.onrender.com/api/me", {
            headers: {
              token: token,
            },
          });
    
          if (!response.ok) {
            throw new Error("Error fetching user data");
          }
          const data = await response.json();
          setUserData(data);
          setIsLoading(false);
          //console.log(data);
        } catch (error) {
          console.log("Error fetching user data:", error);
          setError(error.message);
          setIsLoading(false);
        }
    };
    
    React.useEffect(() => {
        fetchUserData();
    }, []); 

    // const fetchUserDataUser = async (userId) => {
    //     try {
    //       const token = await AsyncStorage.getItem('@user_token');
    //       //console.log(token);
          
    //       const response = await fetch(`https://zeus-api-63pe.onrender.com/api/user/${userId}`, {
    //         headers: {
    //           token: token,
    //         },
    //       });

    //       if (!response.ok) {
    //         throw new Error('Error fetching user data'); // Throw an error for non-2xx response status
    //       }
      
    //       const data1 = await response.json();
    //       //console.log(data1);
    //       setUserDataUser(data1);
    //       setIsLoading(false);
    //     } catch (error) {
    //       setError(error.message); // Save the error message to the state
    //       setIsLoading(false);
    //     }
    // };
  
    // React.useEffect(() => {
    //   fetchUserData();

    //     if (userData) {
    //        // fetchUserDataUser(userData.user._id); // Fetch user data using the user's ID
    //     }
    // }, [userData]);

    //--- Elimina os logs das fontes que a aplicacao esta a usar -----------------------

    const [loaded]=useFonts({
        InterBold: require("../assets/fonts/Inter-Bold.ttf"),
        InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
        InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
        InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
        InterLight: require("../assets/fonts/Inter-Light.ttf"),
        PoppinsBlack: require('../assets/fonts/Poppins-Black.ttf'),
        PoppinsBlackItalic: require('../assets/fonts/Poppins-BlackItalic.ttf'),
        PoppinsExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
        PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
        PoppinsBoldItalic: require('../assets/fonts/Poppins-BoldItalic.ttf'),
        PoppinsExtraBoldItalic: require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
        PoppinsExtraLight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
        PoppinsExtraLightItalic: require('../assets/fonts/Poppins-ExtraLightItalic.ttf'),
        PoppinsItalic: require('../assets/fonts/Poppins-Italic.ttf'),
        PoppinsLightItalic: require('../assets/fonts/Poppins-LightItalic.ttf'),
    });
    
    if(!loaded)return null;


    return(
        <View style={styles.container}>
        {isLoading ? (
            // Show the loader with the GIF image while data is being fetched
            <View style={styles.loaderContainer}>
                {/* You can replace 'loader.gif' with the actual name of your GIF image */}
                <Image source={icons.loading2} style={styles.loaderImage} />
                <Text>Loading...</Text>
            </View>

        ) : error ? 
        (
            // Show an error message if there was an error fetching the data
            <View style={styles.loaderContainer}>
                <Text style={styles.errorMessage}>Error fetching user data.</Text>
                <Text style={styles.errorMessage}>{error}</Text>
                
                <TouchableOpacity onPress={navigation.replace("SignIn")}>
                    <Text>Try Again</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <Drawer.Navigator
                drawerTye="slide"
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                    flex: 1,
                    width: width * 0.65,
                    paddingRight: 20,
                    backgroundColor: 'transparent',
                    },
                    sceneContainerStyle: {
                    backgroundColor: 'transparent',
                    },
                    overlayColor: 'transparent',
                }}
                initialRouteName="MainLayout"
                drawerContent={props => {
                    return (
                    <CustomDrawerContent
                        navigation={props.navigation}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                        userData={userData}
                    />
                    );
                }}
            >
            <Drawer.Screen name="DrawerSreen">{props => <MainLayout {...props} userData={userData}/>}</Drawer.Screen>
            </Drawer.Navigator>
        )}
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);