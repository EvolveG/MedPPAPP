import React from 'react';
import {
    View,
    Text, TouchableOpacity, Image
} from 'react-native';
import AuthLayout from './AuthLayout';
import { icons, FONTS,SIZES, COLORS } from '../../constants';
import { FormInput, TextButton } from '../../components';
import {utils} from "../../utils";

const ForgotPassword = ({navigation}) => {

    const [email, setEmail] = React.useState("")    
    const [emailError, setEmailError] = React.useState("")

    function isEnableEmail(){
        return email != "" && emailError == ""
    } 

    return (
        <AuthLayout
            title="Password Recovery"
            subtitle="Please enter your email address to recover your password"
            titleContainerStyle={{
                marginTop: SIZES.padding * 2
            }}
        >

        <View style={{
            flex:1,
            marginTop: SIZES.padding *2
        }}>
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
            </View>

            <TextButton
                label="Send Email"
                disabled={isEnableEmail() ? false: true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:'center',
                    marginTop: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: isEnableEmail() ? COLORS.darkOrange: COLORS.transparentPrimray
                }}
                onPress={()=> navigation.goBack()}
            />

        </AuthLayout>
    )
}

export default ForgotPassword;