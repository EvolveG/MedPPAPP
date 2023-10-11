import { View, Text, Animated, ScrollView, TouchableOpacity,TouchableWithoutFeedback, Modal,Image } from 'react-native';
import React from 'react';
import { dummyData,COLORS,SIZES,FONTS,icons,images,SHADOWS } from '../../constants';
import { IconButton } from '../../components';

const DetailMDNotification = ({isVisible, onClose,selectedItem}) => {
    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current
    const [transactionHistory, setTransactionHistory]= React.useState(dummyData.transactionHistory)
    const [showDetailModal, setShowDetailModal]= React.useState(isVisible);

    React.useEffect(()=>{
        if(showDetailModal){
            Animated.timing(modalAnimatedValue,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            }).start();
        }else{
            Animated.timing(modalAnimatedValue,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }).start(()=>onClose());
        }
    },[showDetailModal])

    const modalY=modalAnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[SIZES.height,SIZES.height-680]
    })


  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        data={transactionHistory}
    >
        <View style={{
            flex:1,
            backgroundColor:COLORS.transparentBlack7
        }}>
            {/* Transparenst background */}
            <TouchableWithoutFeedback
                onPress={()=> setShowDetailModal(false)}
            >
                <View style={{
                    position:'absolute',
                    top:0,
                    left:0,
                    right:0,
                    bottom:0
                }}>

                </View>
            </TouchableWithoutFeedback>

            <Animated.View style={{
                position:'absolute',
                left:0,
                top:modalY,
                width:"100%",
                height:"100%",
                padding: SIZES.padding,
                borderTopRightRadius:SIZES.padding,
                borderTopLeftRadius: SIZES.padding,
                backgroundColor: COLORS.white
            }}>
                {/* cabecalho do modal de transferencias */}
                <View style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}> 
                    <Image source={icons.burger}
                        style={{width:30,
                        height:30,
                        marginRight:10,
                        tintColor: COLORS.darkOrange}}
                    />
                    <Text style={{
                        flex:1,
                        ...FONTS.h2,
                        fontSize:SIZES.body2,
                    }}>
                        Notification Details
                    </Text>

                    <IconButton
                        containerStyle={{
                            borderWidth:2,
                            borderRadius:10,
                            borderColor:COLORS.gray2
                        }}
                        icon={icons.cross}
                        iconStyle={{
                            tintColor:COLORS.gray2
                        }}
                        onPress={()=> setShowDetailModal(false)}
                    />                     

                </View>
                
                <View style={{
                    height:1,
                    marginTop:15,
                    backgroundColor:COLORS.darkOrange,
                }}/>

                <View style={{
                    flexDirection:'colum',
                    alignItems:'center'
                }}> 
                    <View style={{
                        marginTop:"10%",                                                
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            flex:0.6,
                            fontSize:20,
                            ...SHADOWS.dark
                        }}>
                            Status:
                        </Text>
                        <Text style={{
                            fontFamily:FONTS.regular, 
                            fontSize:18,
                            color:selectedItem.status == "Approved" ? COLORS.green : COLORS.red ,                            
                            flex: 1,
                        }}>                            
                            {selectedItem.status}
                        </Text>
                    </View>

                    <View style={{
                        marginTop:"5%",                                                
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent: 'space-between'
                        }}
                    >
                        <Text style={{
                            flex:0.6,
                            fontSize:20,
                            ...SHADOWS.dark
                        }}>
                        Request Type:
                        </Text>
                        <Text style={{
                            fontFamily:FONTS.regular, 
                            fontSize:18,
                            color:COLORS.gray,
                            flex: 1,
                        }}>
                            {selectedItem.requestType}
                        </Text>
                    </View>

                    <View style={{
                        marginTop:"5%",                                                
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent: 'space-between'
                        }}
                    >
                        <Text style={{
                            flex:0.6,
                            fontSize:20,
                            ...SHADOWS.dark
                        }}>
                        Date:
                        </Text>
                        <Text style={{
                            fontFamily:FONTS.regular, 
                            fontSize:18,
                            color:COLORS.gray,
                            flex: 1,
                        }}>
                            {selectedItem.date}
                        </Text>
                    </View>
                    
                    <View style={{
                        marginTop:"5%",                                                
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent: 'space-between'
                        }}
                    >
                        <Text style={{
                            flex:0.6,
                            fontSize:20,
                            ...SHADOWS.dark
                        }}>
                        Contact:
                        </Text>
                        <Text style={{
                            fontFamily:FONTS.regular, 
                            fontSize:18,
                            color:COLORS.gray,
                            flex: 1,
                        }}>
                            {selectedItem.contacto}
                        </Text>
                    </View>
                    
                </View>

            </Animated.View>
        </View>
    </Modal>
  )
}

export default DetailMDNotification