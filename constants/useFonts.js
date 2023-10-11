import * as Font from "expo-font";

export default useFonts = async () =>{
    await Font.loadAsync({
        'PoppinsBlack': require('../assets/fonts/Poppins-Black.ttf'),
        'PoppinsBlackItalic': require('../assets/fonts/Poppins-BlackItalic.ttf'),
        'PoppinsExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'PoppinsBold': require('../assets/fonts/Poppins-Bold.ttf'),
        'PoppinsBoldItalic': require('../assets/fonts/Poppins-BoldItalic.ttf'),
        'PoppinsExtraBoldItalic': require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
        'PoppinsExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
        'PoppinsExtraLightItalic': require('../assets/fonts/Poppins-ExtraLightItalic.ttf'),
        'PoppinsItalic': require('../assets/fonts/Poppins-Italic.ttf'),
        'PoppinsLightItalic': require('../assets/fonts/Poppins-LightItalic.ttf'),
    })
};