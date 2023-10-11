import { View, Text,FlatList, Animated,TouchableOpacity, Image,
  ScrollView,ImageBackground } from 'react-native';
import React from 'react';
import { dummyData, COLORS, SIZES, FONTS, icons, images, SHADOWS } from '../../constants';
import { HeaderDetails, IconButton, NotificationAlertButton } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

const ManageDepDetails = () => {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const route = useRoute();
  const userData = route.params?.userData;
  
  const navigation= useNavigation(); 
  

  const renderItem = ({ item }) => (

    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base,
      }}
      onPress={() => handleItemPress(item)}
      //onPress={() => navigation.navigate('MembBenefDetails', { item })}
    >
      <Image
        source={icons.cardMemb}
        style={{
          width: 65,
          height: 45,
          tintColor: COLORS.darkOrange,
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        
        <View style={{marginLeft: 10,fontWeight: 'bold' }}>
          <Text style={{fontWeight: 'bold'}}>{`NAME: `}</Text>
          <Text style={{fontWeight: 'bold'}}>{`ID: `}</Text>
          <Text style={{fontWeight: 'bold'}}>{`Gender: `}</Text>
          <Text style={{fontWeight: 'bold'}}>{`Status: `}</Text>
        </View>

        <View style={{ flex: 1,marginLeft: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>{userData.user.firstName} {userData.user.lastName}</Text>
          <Text>{userData.user.memberShipID}</Text>
          <Text>{userData.user.gender}</Text>
          <Text style={{color: userData.user.status == "Active" ? COLORS.green : COLORS.red}}>{userData.user.status}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );

  const renderItem2 = ({ item }) => (

    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base,
      }}
      onPress={() => handleItemPress(item)}
      //onPress={() => navigation.navigate('MembBenefDetails', { item })}
    >
      <Image
        source={icons.cardMemb}
        style={{
          width: 65,
          height: 45,
          tintColor: COLORS.darkOrange,
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        
        <View style={{marginLeft: 10,fontWeight: 'bold' }}>
          <Text style={{fontWeight: 'bold'}}>{`NAME: `}</Text>
          <Text style={{fontWeight: 'bold'}}>{`ID: `}</Text>
          <Text style={{fontWeight: 'bold'}}>{`Gender: `}</Text>
          <Text style={{fontWeight: 'bold'}}>{`Status: `}</Text>
        </View>

        <View style={{ flex: 1,marginLeft: 5 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.firstName} {item.lastName}</Text>
          <Text>{item.memberShipID}</Text>
          <Text>{item.gender}</Text>
          <Text style={{ color: item.status === 'Active' ? COLORS.green : COLORS.red }}>{item.status}</Text>
          </View>

      </View>
    </TouchableOpacity>
  );


  const handleItemPress = (item) => {
    // Determine if the selected item is a direct member of the main user
    const isDirectMember = userData.user.myMembers.some(member => member._id === item._id);
    
    // Pass the selected item, user data, and the isDirectMember flag to the MembBenefDetails component
    navigation.navigate('MembBenefDetails', { selectedItem: item, userData, isDirectMember });
  };



  function renderHeader() {
    return (
      <HeaderDetails
        //title="DETAILS"
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
            //onPress={() => console.log('Back')}
            
            onPress={() => navigation.navigate('CustomD')}
          />
        }
        rightComponent={<NotificationAlertButton quantity={3} />}
      />
    );
  }  

  function renderList() {
    const userPlan = userData.user.plan;
  
    //console.log(userData.user.myMembers.length)

    //console.log(userData.user)
    // Check if the user is the main user
    const isMainUser = userData.user._id === userData.user.accountOwner;
  
    return (
      <Animated.View
        style={{
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          ...SHADOWS.dark,
        }}
      >
        {/* Render main user's plan */}
        <FlatList
          scrollEnabled={false}
          data={userPlan}
          keyExtractor={(item) => `${item._id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: COLORS.lightGray1,
              }}
            ></View>
          )}
        />
  
        
  
        {/* Check if the user is the main user before rendering the myMembers list */}
        {userData.user.myMembers.length > 0 && (
          
          <View>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: COLORS.lightGray1,
              }}
            ></View>
            
            <FlatList
              scrollEnabled={false}
              data={userData.user.myMembers}
              keyExtractor={(item) => `${item._id}`}
              renderItem={renderItem2}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: COLORS.lightGray1,
                  }}
                ></View>
              )}
            />
          </View>
        )}
      </Animated.View>
    );
  }
  
  
  
  

  return (
    <View style={{
      flex:1,
      backgroundColor: COLORS.white,
    }}>

      {renderHeader()}      


      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>  
        <View style={{
            width:"100%",
            height: 430 ,               
            marginTop: SIZES.padding,
            ...SHADOWS.dark
          }}>
            <ImageBackground
              source={images.medCardNew}
              style={{
                flex:1,
                borderRadius: SIZES.radius, // Add border radius here
              }}
            />

            <View style={{            
              marginHorizontal: SIZES.padding,
              bottom:"7%",
              borderRadius: SIZES.radius,
              padding:SIZES.padding,
              backgroundColor:COLORS.white,
            }}>


              <View style={{        
                flexDirection:'row',
              }}>
                <Text style={{
                  ...FONTS.h3,
                  fontSize:20,
                }}>
                  MEMBERS DETAILS
                </Text>

                
              </View>              
              
              <View style={{
                height:1,
                backgroundColor:COLORS.darkGray,                
                marginBottom:10,
              }}/> 

              <Text style={{
                fontFamily:FONTS.regular, 
                fontSize:SIZES.body3, 
                color: COLORS.gray,
                marginBottom:7,
                fontWeight:'bold'
              }}>
                {userData.user.plan[0].planName}
              </Text>
              
              <Text style={{
                fontFamily:FONTS.regular, 
                fontSize:SIZES.body4, 
                color: COLORS.black,
              }}>
                Actual Balance
              </Text>

              <Text style={{
                fontFamily:FONTS.regular, 
                fontSize:SIZES.body2, 
                color: COLORS.black,
              }}>
                {userData?.user.plan[0].planTotalBalance}
              </Text>

              <Text style={{
                fontFamily:FONTS.regular, 
                fontSize:SIZES.body5, 
                color: COLORS.lightOrange,
                marginTop: 10,
              }}>
                * Please click on the members name bellow to view each benefits
              </Text>

            </View>              
        </View>
        
        {renderList()}                

        
      </ScrollView>

    </View>
  )
}

export default ManageDepDetails