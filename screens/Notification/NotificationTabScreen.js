import React, { useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,Image,TextInput,FlatList,Animated
} from 'react-native';
import{FONTS, SIZES, COLORS,icons,dummyData,SHADOWS} from "../../constants";
import {DetailModalNotification} from "../";
import { HeaderDetails, IconButton, NotificationAlertButton } from '../../components';
import { useNavigation } from '@react-navigation/native'; // Import the hook


import { CustomDrawer } from '../../navigation/CustomDrawer';


const NotificationTabScreen = ({customContainerStyle,history}) => {

    const [notificationHistory, setNotificationHistory]= React.useState(dummyData.notificationHistory)

    const navigation = useNavigation(); // Access the navigation object


    const[showDetailModal, setShowDetailModal]= React.useState(false);

    const [selectedItem, setSelectedItem] = React.useState(null);

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setShowDetailModal(true);
    }

    function renderHeader() {
        return (
          <HeaderDetails
            title="Notifications"
            containerStyle={{
              height: 35,
              marginHorizontal: SIZES.padding,
              marginTop: 55,
            }}
            leftComponent={
              <IconButton
                icon={icons.left}
                containerStyle={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: SIZES.radius,
                  borderColor: COLORS.gray2,
                }}
                iconStyle={{
                  width: 40,
                  height: 20,
                  tintColor: COLORS.gray2,
                }}
                //onPress={() => navigation.goBack()} 
                onPress={() => navigation.navigate("CustomD")}
 
              />
            }
            rightComponent={<NotificationAlertButton quantity={3} />}
          />
        );
    } 
   
    function renderSearch (){
        return(
            <View style={{
                flexDirection:'row',
                height:40,
                alignItems:'center',
                marginTop:SIZES.padding,
                marginHorizontal: SIZES.padding,
                marginVertical: SIZES.base,
                paddingHorizontal: SIZES.radius,
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightGray2
            }}>

                {/* icon */}
                <Image source={icons.search}
                    style={{
                        height:20,
                        width:20,
                        tintColor:COLORS.black
                    }}
                />

                {/* Text input */}
                <TextInput style={{
                        flex:1,
                        marginLeft:SIZES.radius,
                        ...FONTS.body3
                    }}
                    placeholder="Search notifications..."
                />

                {/* Filter Button
                <TouchableOpacity 
                    //onPress={}
                    
                >
                    <Image source={icons.filter} 
                        style={{
                            height:20,
                            width:20,
                            tintColor: COLORS.gray
                    
                        }}  

                    />
                </TouchableOpacity> */}

            </View>
        )
    }

    const renderItem=({item})=>(
        <TouchableOpacity style={{
            flexDirection:'row',
            alignItems:'center',
            paddingVertical:SIZES.base
        }}
        //onPress={()=>setShowDetailModal(true)}        
        onPress={() => handleItemPress(item)}
        >
            <Image source={icons.rice}
                style={{width:30,
                height:30,
                tintColor: COLORS.darkOrange}}
            />
            <View style={{flex:1, marginLeft:SIZES.radius}}>
                <Text>{item.requestType}</Text>
                <Text>{item.date}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        
        <View
            style={{
                flex: 1,
                ...SHADOWS.dark
            }}
        >
            {renderHeader()} 

            {/* HistoryList */}
            <Animated.View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                //minHeight: 150, // Set a minimum height to prevent the view from collapsing when there are only a few items
                //height: showMoreToggle ? null : 230, // Set a fixed height to show only two items
                //overflow: 'hidden', // Hide the overflow when there are only a few items
                ...customContainerStyle,
            }}>

                {/* <Text style={{...FONTS.h2}}>Notifications</Text>
                <View style={{
                    height:1,
                    backgroundColor:COLORS.darkGray,
                }}/>  */}

                <FlatList
                    scrollEnabled={false}
                    data={notificationHistory}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={()=>{
                        return(
                            <View style={{
                                width:"100%",
                                height:1,
                                backgroundColor:COLORS.lightGray1
                                }
                            }>

                            </View>
                        )
                    }}
                />
                {/* Abre a janela de detalhes para as notificacoes */}
                {showDetailModal &&
                    <DetailModalNotification
                        isVisible={showDetailModal}
                        onClose={()=> setShowDetailModal(false)}                        
                        selectedItem={selectedItem}
                    />
                }                
               
            </Animated.View>

            

        </View>
    )
}

export default NotificationTabScreen;