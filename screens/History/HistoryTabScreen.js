import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    Image,
    Animated,
    ScrollView, // Import ScrollView
    Dimensions, // Import Dimensions
} from 'react-native';
import { FONTS, SIZES, COLORS, icons, SHADOWS } from "../../constants";
import { DetailModal } from "../";
import DatePickerModal from "./DatePickerModal";

import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryTabScreen = ({ customContainerStyle }) => {
    const [selectedOption, setSelectedOption] = useState('listLatest');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [transactionHistory, setTransactionHistory] = useState([]);    
    const [transactionHistoryPers, setTransactionHistoryPers] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [scrollHeight, setScrollHeight] = useState(0); // State to hold ScrollView height
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Track if data is loaded



    const handleOptionPress = (itemValue) => {
        setSelectedOption(itemValue);
        setIsDropdownVisible(false);
        setIsDataLoaded(false);
        // Handle the selected option (e.g., update the transaction list)
    };

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
    
    useEffect(() => {
        // Calculate the available height for the ScrollView
        const screenHeight = Dimensions.get('window').height;
        const headerHeight = 100; // Adjust this value based on your header's height
        const dropdownHeight = 240; // Adjust this value based on your dropdown's height
    
        // Calculate the ScrollView height
        const calculatedHeight = screenHeight - headerHeight - dropdownHeight;
    
        // Set the ScrollView height
        setScrollHeight(calculatedHeight);
    }, []);

    React.useEffect(() => {
        fetchTransactionHistory();
    }, []);
    
    // ------ Fetchs the transaction using API --------------------
    // Function to fetch data using the specified API
    const fetchData = async (startDate, endDate) => {
        try {
          const token = await AsyncStorage.getItem("@user_token");
      
          // Extract the date portion from startDate
          const startDateDate = new Date(startDate);
          const startDateFormatted = startDateDate.toISOString().split('T')[0];

          const endDateDate = new Date(endDate);
          const endDateFormatted = endDateDate.toISOString().split('T')[0];

          const url = `https://zeus-api-63pe.onrender.com/api/get/logedusertransaction?startDate=${startDateFormatted}&endDate=${endDateFormatted}`;
          console.log(url);
      
          const response = await fetch(url, {
            headers: {
              token: token,
            },
          });
      
          console.log(startDateFormatted);
          console.log(response);

          if (!response.ok) {
            throw new Error("Error fetching transaction history");
          }
      
          const data = await response.json();
          // Process the fetched data as needed
          
          setTransactionHistoryPers(data.transactions);
          setIsDataLoaded(true)
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      

    const handleFetchData = () => {
        // Call the fetchData function with selected start date and end date
        fetchData(startDate, endDate);
    };
    // ------ End Fetchs the transaction using API --------------------

    // ------ Render Dorpdownlist --------------------------------
    const renderDropdown = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDropdownVisible}
                onRequestClose={() => setIsDropdownVisible(false)}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                    onPress={() => setIsDropdownVisible(false)}
                >
                    <View
                        style={{
                            backgroundColor: COLORS.lightGray2,
                            borderRadius: SIZES.radius,
                            paddingVertical: SIZES.base,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: SIZES.padding,
                                paddingVertical: SIZES.base,
                            }}
                            onPress={() => handleOptionPress('listLatest')}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        
                                <View style={{fontWeight: 'bold' }}>
                                    <Text style={{fontWeight: 'bold',...FONTS.body3}}>{`1 - `}</Text>
                                </View>

                                <View style={{ flex: 1}}>
                                    <Text 
                                        style={{ ...FONTS.h3,
                                            color: selectedOption === 'listLatest' ? COLORS.darkOrange : COLORS.black, 
                                    }}> List Latest Transactions</Text>
                                </View>

                            </View>   

                        </TouchableOpacity>

                        <View style={{
                            height:1,
                            marginHorizontal: SIZES.padding,
                            backgroundColor:COLORS.gray2,
                        }}/> 

                        <TouchableOpacity
                            style={{
                                paddingHorizontal: SIZES.padding,
                                paddingVertical: SIZES.base,
                            }}
                            onPress={() => handleOptionPress('personalizer')}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        
                                <View style={{fontWeight: 'bold' }}>
                                    <Text style={{fontWeight: 'bold',...FONTS.body3}}>{`2 - `}</Text>
                                </View>
                                <View >
                                    <Text style={{ ...FONTS.h3,
                                        color: selectedOption === 'personalizer' ? COLORS.darkOrange : COLORS.black, }}>  
                                    Personalizer Transactions</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };
    // ------ End DropDown List ----------------------------------

    // ------- Render the list of transaction made ---------------
    const renderItem=({item})=>{
        // Parse updatedAt as a Date object
        const updatedAtDate = new Date(item.createdAt);
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
    // ------- End Render the list of transaction made -----------
    
    // Function to render the Date field with a date picker
    const DatePickerField = ({ label, selectedDate, onDateChange }) => {
        const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    
        const handleDateChange = (date) => {
          date.setHours(0, 0, 0, 0);
          onDateChange(date);
          setDatePickerVisible(false);
        };
    
        const formatDate = (date) => {
          if (!date) return 'Select date';
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        };
    
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base }}>
            <Text style={{ ...FONTS.body3 }}>{label}</Text>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: COLORS.lightGray1,
                marginLeft: SIZES.base
              }}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                {formatDate(selectedDate)}
              </Text>
            </TouchableOpacity>
            {isDatePickerVisible && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={isDatePickerVisible}
                onRequestClose={() => setDatePickerVisible(false)}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  }}
                  onPress={() => setDatePickerVisible(false)}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      borderRadius: SIZES.radius,
                      paddingHorizontal: SIZES.padding,
                      paddingVertical: SIZES.base,
                    }}
                  >
                    <DatePickerModal
                      isVisible={isDatePickerVisible}
                      selectedDate={selectedDate}
                      onDateChange={handleDateChange}
                      onClose={() => setDatePickerVisible(false)}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            )}
          </View>
        );
      };
    
    
    


    // ------ Start populating transactions on the views ----------------------

    const renderTransactionList = (transactionHistory, title) => {
        return (
            <ScrollView style={{ height: scrollHeight }}>
                <Animated.View style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 20,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
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
                        <Text style={{ ...FONTS.h2, color: COLORS.darkGray2 }}>{title}</Text>

                        
                    </View>   

                    <View style={{
                        height: 1,
                        backgroundColor: COLORS.darkGray,
                    }} />
                    <FlatList
                        contentContainerStyle={{ marginTop: SIZES.radius }}
                        scrollEnabled={true}
                        data={transactionHistory}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => {
                            return (
                                
                                <View style={{
                                    width: "100%",
                                    height: 1,
                                    backgroundColor: COLORS.lightGray1
                                }}
                                />
                                
                            )
                        }}
                    />
                    {showDetailModal &&
                        <DetailModal
                            isVisible={showDetailModal}
                            onClose={() => setShowDetailModal(false)}
                            selectedItem={selectedItem}
                        />
                    }
                </Animated.View>
            </ScrollView>
        );
    };
 

    const renderPersonTransactionList = (transactionHistoryPers, title) => {
        // Extract the date portion from startDate
        const startDateDate = new Date(startDate);
        const startDateFormatted = `${startDateDate.getFullYear()}-${(startDateDate.getMonth() + 1).toString().padStart(2, '0')}-${startDateDate.getDate().toString().padStart(2, '0')}`;

        // Extract the date portion from endDate
        const endDateDate = new Date(endDate);
        const endDateFormatted = `${endDateDate.getFullYear()}-${(endDateDate.getMonth() + 1).toString().padStart(2, '0')}-${endDateDate.getDate().toString().padStart(2, '0')}`;

        return (
            
          <>
          
            {isDataLoaded ? (
                <ScrollView style={{ height: scrollHeight }}>
                <Animated.View
                  style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 20,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    ...customContainerStyle,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ ...FONTS.h2, color: COLORS.darkGray2 }}>
                      Date | 
                    </Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.darkGray2 }}>
                      {` ${startDateFormatted} - ${endDateFormatted}`}
                    </Text>
                  </View>
      
                  <View
                    style={{
                      height: 1,
                      backgroundColor: COLORS.darkGray,
                    }}
                  />
                  <FlatList
                    contentContainerStyle={{ marginTop: SIZES.radius }}
                    scrollEnabled={true}
                    data={transactionHistoryPers}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                      return (
                        <View
                          style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: COLORS.lightGray1,
                          }}
                        />
                      );
                    }}
                  />
                  {showDetailModal && (
                    <DetailModal
                      isVisible={showDetailModal}
                      onClose={() => setShowDetailModal(false)}
                      selectedItem={selectedItem}
                    />
                  )}
                </Animated.View>
              </ScrollView>
            ) : (
                <Animated.View
                style={{
                  marginTop: SIZES.padding,
                  marginHorizontal: SIZES.padding,
                  padding: 20,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.white,
                  ...customContainerStyle,
                }}
              >
                <Text style={{ ...FONTS.h2, color: COLORS.darkGray2 }}>{title}</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: COLORS.darkGray,
                  }}
                />
      
                {/* Start Date Row */}
                <View style={{ marginTop: SIZES.padding }}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      fontWeight: 'bold',
                      color: COLORS.gray,
                    }}
                  >
                    Start Date
                  </Text>
                  <DatePickerField
                    selectedDate={startDate}
                    onDateChange={setStartDate}
                  />
                </View>
      
                {/* End Date Row */}
                <View style={{ marginTop: SIZES.padding }}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      fontWeight: 'bold',
                      color: COLORS.gray,
                    }}
                  >
                    End Date
                  </Text>
                  <DatePickerField selectedDate={endDate} onDateChange={setEndDate} />
                </View>
      
                {/* Submit Button */}
                <TouchableOpacity
                  style={{
                    marginTop: SIZES.padding,
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary,
                    ...SHADOWS.dark,
                  }}
                  onPress={handleFetchData}
                >
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.white,
                      fontWeight: 'bold',
                    }}
                  >
                    View List
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              
            )}
          </>
        );
    };
      

    // ------ End Start populating transactions on the views ----------------------

    return (
        <View style={{
            ...SHADOWS.dark
        }}>
            {renderDropdown()}

            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 15,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...customContainerStyle,
            }}>
                <Text style={{ ...FONTS.h2,  }}>Select the Type of List</Text>

                <View style={{
                    height: 1,
                    backgroundColor: COLORS.primary,
                }} />
                <TouchableOpacity
                    style={{
                        height: 40,
                        justifyContent: 'center',
                        marginTop: 10,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2,
                        ...SHADOWS.dark,
                    }}
                    onPress={() => setIsDropdownVisible(true)}
                >
                    <Text
                        style={{
                            ...FONTS.h3,
                        }}
                    >
                        {selectedOption === 'listLatest' ? "1 - List Latest Transactions" : "2 - Personalizer Transactions"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Conditional rendering of transaction lists */}
            {selectedOption === 'listLatest' ?
                renderTransactionList(transactionHistory, 'Latest Transactions') :
                renderPersonTransactionList(transactionHistoryPers, 'Select date')
            }
        </View>
    );
};

export default HistoryTabScreen;