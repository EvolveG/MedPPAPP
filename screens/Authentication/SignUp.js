import React from 'react';
import {
    View,
    Text, TouchableOpacity, Image
} from 'react-native';
import AuthLayout from './AuthLayout';
import { icons, FONTS,SIZES, COLORS } from '../../constants';
import { FormInput, TextButton } from '../../components';
import {utils} from "../../utils";


const SignUp = ({navigation}) => {

    
    const [email, setEmail] = React.useState("")
    const [membNumb, setmembNumb] = React.useState("")
    const [membID, setmembID] = React.useState("")

    const [emailError, setEmailError] = React.useState("")
    const [membNumbError, setmembNumbError] = React.useState("")    
    const [membIDError, setmembIDError] = React.useState("")

    function isEnableRegister(){
        return email != "" && membNumb != "" && membID != "" && emailError == "" && membNumbError == "" && membIDError == ""
    }


    return (
        <AuthLayout
            title="Getting Started"
            subtitle="Registering an account"
            titleContainerStyle={{
                marginTop: SIZES.radius
            }}
        >
            
        {/* formulario para registar */}
        <View style={{
            flex:1,
            marginTop: SIZES.padding
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

            <FormInput
                label="Member Numb."
                containerStyle={{
                    marginTop: SIZES.radius
                }}
                onChange={(value)=>{
                    utils.validateMemNumber(value, setmembNumbError)
                    // Validate E-mail
                    setmembNumb(value)
                }}
                errorMsg={membNumbError}
                appendComponent={
                    <View style={{
                        justifyContent:'center'
                    }}>
                        <Image
                            source={membNumb == "" | (membNumb != "" && membNumbError == "") ? icons.correct : icons.cancel}
                            style={{
                                height:25,
                                width:25,
                                tintColor: membNumb==""? COLORS.gray : (membNumb !="" &&  membNumbError=="")? COLORS.green: COLORS.red
                            }}
                        />
                    </View>
                }
            />

            <FormInput
                label="ID Numb."
                containerStyle={{
                    marginTop: SIZES.radius
                }}
                onChange={(value)=>{
                    utils.validateMemID(value, setmembIDError)
                    // Validate E-mail
                    setmembID(value)
                }}
                errorMsg={membIDError}
                appendComponent={
                    <View style={{
                        justifyContent:'center'
                    }}>
                        <Image
                            source={membID == "" | (membID != "" && membIDError == "") ? icons.correct : icons.cancel}
                            style={{
                                height:25,
                                width:25,
                                tintColor: membID == "" ? COLORS.gray : (membID !="" &&  membIDError=="")? COLORS.green: COLORS.red
                            }}
                        />
                    </View>
                }
            />

            {/* Zona para registar e voltar ao login */}
            <TextButton
                label="Register"
                disabled={isEnableRegister()? false : true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:'center',
                    marginTop: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: isEnableRegister() ? COLORS.darkOrange : COLORS.transparentPrimray
                }}
                onPress={()=> navigation.navigate("Otp")}
            />
            <View style={{
                flexDirection: 'row',
                marginTop: SIZES.radius,
                justifyContent: 'center'
            }}>
                <Text style={{
                    color:COLORS.darkGray,
                    ...FONTS.body3
                }}>
                    Already have an account?
                </Text>

                <TextButton
                    label="Sign In"
                    buttonContainerStyle={{
                        marginLeft: 7,
                        backgroundColor: null
                    }}
                    labelStyle={{
                        color: COLORS.darkOrange,
                        ...FONTS.h3
                    }}
                    onPress={()=> navigation.goBack()}
                />
            </View>

        </View>

        </AuthLayout>
    )
}

export default SignUp;