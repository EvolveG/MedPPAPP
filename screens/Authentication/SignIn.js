import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image,Modal, Alert, LogBox, ActivityIndicator, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import AuthLayout from './AuthLayout';
import { icons, FONTS, SIZES, COLORS } from '../../constants';
import { FormInput, CustomSwitch, TextButton } from '../../components';
import { utils } from "../../utils";
import api from './api'; // Import the default export

const SignIn = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [showPass, setShowPass] = React.useState(false);
    const [saveMe, setSaveMe] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    //Remove todos os warning logs
    React.useEffect(() => { LogBox.ignoreAllLogs})
    // buscar a funcao que pega o user a ser logado

    // Function to remove saved credentials from AsyncStorage
    const clearSavedCredentials = async () => {
        try {
        await AsyncStorage.removeItem('@user_credentials');
        console.log('Credentials cleared successfully.');
        } catch (error) {
        console.error('Error clearing credentials:', error);
        }
    };


    const storeCredentials = async (email, password, token) => {
        try {
            const credentials = JSON.stringify({ email, password, token });
            await AsyncStorage.setItem('@user_credentials', credentials);
            console.log('Credentials stored successfully.');
        } catch (error) {
            console.error('Error storing credentials:', error);
        }
    };

    // Inside the submitForm function
     const submitForm = async () => {
        console.log(email + ' ' + password);
        try {
            setLoading(true);
            const token = await api.loginUser(email, password);

            // Store credentials if "Save Me" is active
            if (saveMe) {
                storeCredentials(email, password, token); // Pass the token to the function
            }

            // Store the token in AsyncStorage for future use
            await AsyncStorage.setItem('@user_token', token);

            // Store the logged-in user's email in AsyncStorage
            await AsyncStorage.setItem('@logged_in_user', email);

            console.log(token);

            // Navigate to "CustomD" screen
            navigation.replace('CustomD');
        } catch (error) {
            console.log('There was an error!', error);
            // Display the popup alert here
            Alert.alert(
                'Login Failed',
                'Invalid email or password. Please try again.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false }
            );
        } finally {
            setLoading(false);
        }
    };
    

    function isEnableSignIn() {
        return email !== "" && password !== "" && emailError === "";
    }

    // Check for saved credentials when the component mounts
    useEffect(() => {
        clearSavedCredentials();
        const checkSavedCredentials = async () => {
            try {
                const credentials = await AsyncStorage.getItem('@user_credentials');
                if (credentials) {
                    const { email, password, token } = JSON.parse(credentials);
                    if (email && password && token) {
                        // Credentials are valid, use them as needed
                        console.log('Stored email:', email);
                        console.log('Stored password:', password);
                        console.log('Stored token:', token);

                        
                        // Attempt to login using the stored credentials
                        try {
                            const response = await api.loginUser(email, password);
                            console.log(response);

                            // Navigate to "CustomD" screen if login is successful
                           navigation.replace('CustomD');
                        } catch (error) {
                            console.log('There was an error!', error);

                            // If the saved credentials are invalid, remove them from AsyncStorage
                            AsyncStorage.removeItem('@user_credentials');
                        }
                    } else {
                        console.log('Invalid stored credentials.');
                    }
                } else {
                    console.log('No saved credentials found.');
                }
            } catch (error) {
                console.log('Error reading saved credentials:', error);
            }
        };
        
        
        // Fetch the logged-in user's email from AsyncStorage
        const fetchLoggedInUser = async () => {
            try {
            const loggedInUser = await AsyncStorage.getItem('@logged_in_user');
            if (loggedInUser) {
                // You can use the loggedInUser in your UI to display the logged-in user's email
                console.log('Logged-in user:', loggedInUser);
            }
            } catch (error) {
            console.log('Error fetching logged-in user:', error);
            }
        };
    
        checkSavedCredentials();
        fetchLoggedInUser();
    }, []);


    return (
        <AuthLayout 
            title="Let's Sign You In"
            subtitle="Welcome to Mediplus Information App"
        >
            <Modal
            animationType="fade"
            transparent={true}
            visible={loading} // Show the modal when loading is true
            onRequestClose={() => setLoading(false)} // Close the modal when needed
            >
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
                }}
            >
                <ActivityIndicator size="large" color={COLORS.darkOrange} />
            </View>
            </Modal>
        <View style={{
            flex: 1,
            marginTop: SIZES.padding * 2,
            width: windowWidth * 0.8, // Adjust width as needed
            alignSelf: 'center',
        }}>

            {/*---------------- TextInputs do formulario -------------*/}
            <FormInput
                label="Email"
                keyboardType="email-address"
                autoCompleteType="email"
                onChange={(value)=>{
                    utils.validateEmail(value, setEmailError)
                    // Validate E-mail
                    setEmail(value)
                }}
                errorMsg={emailError}
                appendComponent={
                    <View style={{
                        justifyContent:'center'
                    }}>
                        <Image
                            source={email == "" | (email != "" && emailError == "") ? icons.correct : icons.cancel}
                            style={{
                                height:25,
                                width:25,
                                tintColor: email==""? COLORS.gray : (email !="" && emailError=="")? COLORS.green: COLORS.red
                            }}
                        />
                    </View>
                }
            />

            <FormInput
                label="Password"
                secureTextEntry={!showPass}
                autoCompleteType="password"
                containerStyle={{
                    marginTop:SIZES.radius
                }}
                onChange={(value)=>{
                    // Validate Password
                    setPassword(value)
                }}
                appendComponent={
                    <TouchableOpacity style={{
                        width:40,
                        alignItems:'flex-end',
                        justifyContent:'center'
                    }}
                    onPress={()=>setShowPass(!showPass)}
                    >
                        <Image
                            source={showPass? icons.eye_close : icons.eye}
                            style={{
                                height:25,
                                width:25,
                                tintColor: COLORS.gray
                            }}
                        />
                    </TouchableOpacity>
                }
            />

            {/* --------------- Save me & Forgot Password ----------------*/}
            <View style={{
                flexDirection:'row',
                marginTop: SIZES.radius,
                justifyContent: 'space-between'
            }}>

                {/* ------------------switch de save me -------------------*/}
                <CustomSwitch
                    value={saveMe}
                    onChange={(value) => setSaveMe(value)}
                />

                {/* ------------------Botao Forgot password -----------------*/}
                <TextButton
                    label="Forgot Password?"
                    buttonContainerStyle={{
                        backgroundColor: null
                    }}
                    labelStyle={{
                        color: COLORS.gray,
                        ...FONTS.body4
                    }}
                    onPress={()=> navigation.navigate("ForgotPassword")}
                />        

            </View>

            {/* ------------------ Botao Sign In -------------------------*/}
            <TextButton
                label="Sign In"
                disabled={!isEnableSignIn()}
                buttonContainerStyle={{
                    height: 55,
                    alignItems: 'center',
                    marginTop: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: isEnableSignIn() ? COLORS.darkOrange : COLORS.transparentPrimray
                }}
                onPress={submitForm}
            />

            {/* ------------------ Botao Registar -------------------------*/}
            <View style={{
                flexDirection:'row',
                marginTop: SIZES.radius,
                justifyContent:'center'
            }}>
                <Text style={{
                    color: COLORS.gray,
                    ...FONTS.body3
                }}>
                    Don't have an account?
                </Text>
                <TextButton
                    label="Register"
                    buttonContainerStyle={{
                        marginLeft: 7,
                        backgroundColor: null
                    }}
                    labelStyle={{
                        color: COLORS.darkOrange,
                        ...FONTS.h3                        
                    }}
                    onPress={()=> navigation.navigate("SignUp")}
                />

            </View>
                {/* Loading indicator
                {loading && (
                    <ActivityIndicator
                        style={{ marginTop: SIZES.padding }}
                        size="large"
                        color={COLORS.darkOrange}
                    />
                )} */}
        </View>
        </AuthLayout>
    )
}

export default SignIn;