import { View, Dimensions, Text, StyleSheet, Pressable } from "react-native";
import React,{useState} from "react";
import Svg, {Image, Ellipse, ClipPath} from 'react-native-svg';
import styles from "../styles";
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay} from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { icons } from "../constants";
import { CircleButton } from "../constants/Button";
import MainLayout from "./MainLayout";
import CustomDrawer from "../navigation/CustomDrawer";


const Login = () => {
  
  const navigation= useNavigation();  
  const {height,width} = Dimensions.get('window');
  const imagePosition = useSharedValue(1);

  const imageAnimatedSyle = useAnimatedStyle (() => {
    const interpolation = interpolate(imagePosition.value, [0,1], [-height/2,0])
    return{
      transform:[{translateY: withTiming(interpolation,{duration:1000})}]
    }
  })

  const [isRestering, setIsRegistering] = useState(false);
  {/* --------------- Click nos botoes --------------------- */}

  {/* --------------- Click nos botoes --------------------- */}
  const loginHandler = () =>{
    imagePosition.value = 0;
    if(isRestering){
      setIsRegistering(false);
    }
  }
  const registerHandler = () =>{
    imagePosition.value = 0;
    if(!isRestering){
      setIsRegistering(true);
    }
  }
  const closeLoginHandler = () =>{
    imagePosition.value = 1
  }
  {/* --------------- Fim Click nos botoes ------------------ */}

  
  
 
  
  const buttonAnimatedStyle = useAnimatedStyle (() => {
    const interpolation = interpolate(imagePosition.value, [0,1], [250,0])
    return{
      opacity:withTiming(imagePosition.value, {duration: 500}),
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
    }
  })
  const closeButtonContainerStyle = useAnimatedStyle(()=>{
    const interpolation= interpolate(imagePosition.value,[0,1],[180,360])
    return{
      opacity:withTiming(imagePosition.value === 1 ? 0 : 1, {duration:800}),
      transform:[{rotate: withTiming(interpolation + "deg", {duration:100})}]
    }
  })  

  const formAnimatedStyle = useAnimatedStyle(() => {
    return{
      opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1,{duration:800})): withTiming(0,{duration:300})
    }
  })
  
  


  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedSyle]}>
        {/* --------------- Background da MediPlus ---------------------- */}
        <Svg height={height} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width/2} rx={height} ry={height}/>
          </ClipPath>

          <Image 
            href={require('../assets/images/login-background.jpg')} 
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />        
        </Svg>
        {/* --------------- End Background da MediPlus ------------------ */} 

        <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
          
          <CircleButton 
            imgUrl={icons.left}
            handlePress={closeLoginHandler}            
          />
        </Animated.View>

      </Animated.View>

      <View style={styles.bottomContainer}>
        {/* --------------- Botoes de login ---------------------- */}
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>
              LOGIN
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>
              REGISTER
            </Text>
          </Pressable>
        </Animated.View>
        {/* --------------- End Botoes de login ---------------------- */}

        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput placeholder="Member Numb." placeholderTextColor="Black" style={styles.textInput}/>

          {isRestering && ([
            <TextInput placeholder="Email" placeholderTextColor="Black" style={styles.textInput}/>,
            <TextInput placeholder="Full Name" placeholderTextColor="Black" style={styles.textInput}/> 
            ]            
          )}

          <TextInput placeholder="Password" placeholderTextColor="Black" style={styles.textInput}/>
          
          <View style={styles.formButton}>
            <Text style={styles.buttonText} onPress={()=> navigation.navigate(CustomDrawer)}>
              {isRestering ? 'REGISTER' : 'LOGIN'} </Text>
          </View>
          
        </Animated.View>

      </View>





    </View>
  )
}

export default Login