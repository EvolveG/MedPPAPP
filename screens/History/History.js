import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Animated,
} from 'react-native';
import{FONTS, SIZES, COLORS,icons, SHADOWS} from "../../constants";
import {DetailModal} from "../";

import AsyncStorage from "@react-native-async-storage/async-storage";

const History = ({customContainerStyle}) => {

    
    
    const [transactionHistory, setTransactionHistory] = React.useState([]);
    const [showDetailModal, setShowDetailModal]= React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);    
    const [showMoreToggle, setShowMoreToggle] = React.useState(false);

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setShowDetailModal(true);
    }

    const fetchTransactionHistory = async () => {
        try {
            const token = await AsyncStorage.getItem("@user_token");
            const response = await fetch("https://zeus-api-63pe.onrender.com/api/get/logedusertransaction", {
                headers: {
                    token: token,
                },
            });
    
            if (!response.ok) {
                throw new Error("Error fetching transaction history");
            }
    
            const data = await response.json();
            setTransactionHistory(data.transactions);
        } catch (error) {
            console.log("Error fetching transaction history:", error);
        }
    };
    
    React.useEffect(() => {
        fetchTransactionHistory();
    }, []);  

    // ------- Render the list of transaction made ---------------
    const renderItem=({item})=>{
        // Parse updatedAt as a Date object
        const updatedAtDate = new Date(item.updatedAt);
        // Format date (year, month, and day)
        const formattedDate = `${updatedAtDate.getFullYear()}-${updatedAtDate.getMonth() + 1}-${updatedAtDate.getDate()}`;
        // Format time (hours, minutes, and seconds)
        const formattedTime = `${updatedAtDate.getHours()}:${updatedAtDate.getMinutes()}:${updatedAtDate.getSeconds()}`;

        return(  
            <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SIZES.base,
            }}
            //onPress={()=>setShowDetailModal(true)}
            onPress={() => handleItemPress(item)}
        >
            
            {/* Left Column */}
            <View style={{ flexDirection: 'column', marginRight: SIZES.radius }}>
                <Text style={{ fontWeight: 'bold' }}>{`Service:`}</Text>
                <Text style={{ fontWeight: 'bold' }}>{`Time:`}</Text>
                <Text style={{ fontWeight: 'bold' }}>{`Date:`}</Text>
            </View>

            {/* Right Column */}
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text>{item.serviceIds[0].serviceName}</Text>
                <Text>{formattedTime}</Text>
                <Text>{formattedDate}</Text>
            </View>

            {/* Amount and Icon */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{item.amountSpent}</Text>
                <Image
                    source={icons.right1}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.gray,
                    }}
                />
            </View>
        </TouchableOpacity>
        )      
    };


    return (
        <View
            style={{
                flex: 1,                
                ...SHADOWS.dark
            }}
        >

            {/* HistoryList */}
            <Animated.View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                minHeight: 150, // Set a minimum height to prevent the view from collapsing when there are only a few items
                height: showMoreToggle ? null : 280, // Set a fixed height to show only two items
                overflow: 'hidden', // Hide the overflow when there are only a few items
                ...customContainerStyle,
            }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                }}>

                    <Image source={icons.burger}
                        style={{
                        //marginLeft:SIZES.padding,    
                        marginRight:10,
                        width:30,
                        height:30,
                        tintColor: COLORS.darkOrange}}
                    />
                    <Text style={{...FONTS.h2}}>Transaction History</Text>

                    
                </View>

                <View style={{
                    height:1,
                    backgroundColor:COLORS.darkGray,
                }}/> 

                <FlatList
                    contentContainerStyle={{marginTop:SIZES.radius}}
                    scrollEnabled={false}
                    data={transactionHistory.slice(0, 5)}
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

                {showDetailModal &&
                    <DetailModal
                        isVisible={showDetailModal}
                        onClose={()=> setShowDetailModal(false)}
                        selectedItem={selectedItem}
                    />
                }

                 {/* botao more */}
                <TouchableOpacity style={{
                    flexDirection:'row',
                    marginVertical: SIZES.base,
                    justifyContent:'center'
                }}
                onPress={()=>{
                    setShowMoreToggle(!showMoreToggle)
                }}
                >
                    <Text style={{
                        ...FONTS.body4
                    }}>
                        {showMoreToggle ? "LESS" : "MORE"}
                    </Text>
                    <Image
                        source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
                        style={{
                            marginLeft:5,
                            width:15,
                            height:15,
                            alignSelf:'center'
                        }}
                    />
                </TouchableOpacity>

            </Animated.View>

        </View>
    )
}

export default History