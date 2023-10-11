import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants';
import React from 'react';
import History from '../History/History';
import Notification from '../Notification/Notification';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const Home = ({userData}) => {

    const navigation= useNavigation(); 
    const memberCount = userData?.user?.myMembers?.length || 0;

    // Responsive Design
    const windowWidth = Dimensions.get('window').width;

    const headerStyle = {
        justifyContent: 'flex-start',
        backgroundColor: COLORS.lightOrange3,
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 20,
        borderRadius: SIZES.radius,
        ...SHADOWS.dark,
        // Responsive width
        width: windowWidth - 2 * SIZES.padding,
    };

    function renderHeader(){
        //console.log(userData);

        return(
        <TouchableOpacity
        style={headerStyle}
        //onPress={console.log(navigation)}
        onPress={() => navigation.navigate("ManageDepDetails", { userData })}
        >
        

            <LinearGradient
                start={{ x: 0 , y: 0}}
                end={{ x: 0 , y: 4}}
                colors={[
                    COLORS.transparent,
                    COLORS.lightGray1
                ]}
                style={{
                    position:'absolute',
                    top:20,
                    left:0,
                    right:0,
                    height:56,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,
                }}
            />

            <View>
            <Text style={{
                fontFamily:FONTS.regular, 
                fontSize:SIZES.body2, 
                color: COLORS.black,
                }}
            >
                Hello, {userData?.user.firstName} {userData?.user.lastName} 👋
            </Text>
            <Text style={{
                fontFamily:FONTS.regular, 
                fontSize:SIZES.body4, 
                color: COLORS.black,
                }}
            >
            Welcome to your personal area</Text>
            </View>

            <View style={{
                height:1,
                marginVertical: SIZES.radius,
                backgroundColor:COLORS.white,
            }}/>           
            <View style={{
                flexDirection:'row',
                alignItems: 'flex-start',
                marginBottom: 10,
                }}>
                <View style={{flex: userData?.user.status == "Active" ? 0.9:0.85}}>
                    <Text>MEMBERSHIP Nº</Text>
                    <Text style={{
                        fontFamily:FONTS.regular, 
                        fontSize:SIZES.body2, 
                        color: COLORS.black,
                    }}>
                    {userData?.user.memberShipID}
                    </Text>
                </View>
                                
                <View>
                    <Text>SAVINGS</Text>
                    <Text style={{
                        fontFamily:FONTS.regular, 
                        fontSize:SIZES.body2, 
                        color: COLORS.black,
                    }}>
                    {userData?.user.plan[0].planTotalBalance}
                    </Text>
                </View>
                </View>

                <View style={{
                flexDirection:'row',
                alignItems: 'flex-start',
                }}>
                
                <View style={{flex:0.9}}>
                    <Text>{userData?.user.relation == 'Main' ? "DEPENDENTS" : "MEMBER"}</Text>
                    <Text style={{
                        fontFamily:FONTS.regular, 
                        fontSize:SIZES.body2, 
                        color: COLORS.black,
                    }}>
                    {userData?.user.relation == 'Main' ? memberCount : userData?.user.relation}
                    </Text>
                </View>
                                
                <View>
                    <Text>STATUS</Text>
                    <Text style={{
                        fontFamily:FONTS.regular, 
                        fontSize:SIZES.body2, 
                        marginRight:35,                    
                        color: userData?.user.status == "Active" ? COLORS.green : COLORS.red ,
                    }}>
                    {userData?.user.status}
                    </Text>
                </View>
            </View>

        </TouchableOpacity>
        )
    }  

  function renderNotification(){
    return(
        <Notification
            customContainerStyle={{...SHADOWS.dark}}
        />
    )
  }
  function renderTransactionHistory(){
    return(
        <History
            customContainerStyle={{...SHADOWS.dark}}
        />
    )
  }


  return (
    <ScrollView>
      <View style={{paddingBottom:245}}>
       {renderHeader()}
       {renderNotification()}
       {renderTransactionHistory()}

       
      </View>
    </ScrollView>
  )
}

export default Home