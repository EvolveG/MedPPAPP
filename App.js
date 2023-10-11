import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { LogBox,} from 'react-native';
import { useFonts } from "expo-font";
import CustomDrawer from "./navigation/CustomDrawer";
import SplashScreen from './components/SplashScreen';
import OnBoarding from "./screens/OnBoarding/OnBoarding";
import Login from "./screens/Login";
import {SignIn,SignUp,ForgotPassword,Otp,ManageDep,ManageDepDetails,MembBenefDetails,BenefitDetails,NotificationTabScreen,Home } from "./screens";

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./stores/rootReducer";

const Stack = createStackNavigator();

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

const App = () => {
    //Remove todos os warning logs
    React.useEffect(() => { LogBox.ignoreAllLogs})

	const [loaded]=useFonts({
        InterBold: require("./assets/fonts/Inter-Bold.ttf"),
        InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
        InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
        InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
        InterLight: require("./assets/fonts/Inter-Light.ttf"),
        PoppinsBlack: require('./assets/fonts/Poppins-Black.ttf'),
        PoppinsBlackItalic: require('./assets/fonts/Poppins-BlackItalic.ttf'),
        PoppinsExtraBold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
        PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
        PoppinsBoldItalic: require('./assets/fonts/Poppins-BoldItalic.ttf'),
        PoppinsExtraBoldItalic: require('./assets/fonts/Poppins-ExtraBoldItalic.ttf'),
        PoppinsExtraLight: require('./assets/fonts/Poppins-ExtraLight.ttf'),
        PoppinsExtraLightItalic: require('./assets/fonts/Poppins-ExtraLightItalic.ttf'),
        PoppinsItalic: require('./assets/fonts/Poppins-Italic.ttf'),
        PoppinsLightItalic: require('./assets/fonts/Poppins-LightItalic.ttf'),
    });
    
    if(!loaded)return null;
		
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                     screenOptions={{
                     headerShown: false
                  }}
                  initialRouteName={'OnBoarding'}
                >                   
                    
                    {/* 
                    
                        <Stack.Screen
                            name="Login"
                            component={Login}
                        />   
                        
                        <Stack.Screen
                        name="OnBoarding"
                        component={OnBoarding}
                        />

                        <Stack.Screen
                            name="SignIn"
                            component={SignIn}
                        />

                        <Stack.Screen
                            name="SignUp"
                            component={SignUp}
                        />

                        <Stack.Screen
                            name="ForgotPassword"
                            component={ForgotPassword}
                        />

                        <Stack.Screen
                            name="Otp"
                            component={Otp}
                        />	

                        name="ManageDepDetails"
                        component={ManageDepDetails}
                    />


                        <Stack.Screen
                            name="ManageDepDetails"
                            component={ManageDepDetails}
                        />						
					
					*/}
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                    />
                    <Stack.Screen
                        name="CustomD"
                        component={CustomDrawer}
                    />	
                    <Stack.Screen
                        name="ManageDepDetails"
                        component={ManageDepDetails}
                    />	
                    <Stack.Screen
                        name="MembBenefDetails"
                        component={MembBenefDetails}
                    />	
                    <Stack.Screen
                        name="BenefitDetails"
                        component={BenefitDetails}
                    />	
                    <Stack.Screen
                        name="NotificationTabScreen"
                        component={NotificationTabScreen}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App
