import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTS, SIZES, COLORS, icons, SHADOWS } from '../../constants';
import { HeaderDetails, IconButton, NotificationAlertButton } from '../../components';
import { useRoute } from "@react-navigation/native";

const MembBenefDetails = ({ route }) => {
  const rota = useRoute();
  const userData = rota.params?.userData;
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(route.params?.selectedItem);

  // Function to get the plan services for a member
  const getMemberPlanServices = (member) => {
    return member.planService.map(serviceId => {
      return userData.user.plan[0].planService.find(serviceName => serviceName._id === serviceId);
    });
  };  

  // Extract the planService array from the main user's plan
  const mainUserPlanService = userData.user.plan[0].planService;

  // Function to check if the user is the user is a direct member os the account owner or if its the owner
  const isDirectMember = route.params?.isDirectMember;
  
  //console.log(isDirectMember)


  function renderHeader() {
    return (
      <HeaderDetails
        title={selectedItem.serviceName}
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
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={<NotificationAlertButton quantity={3} />}
      />
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base,
      }}
      onPress={() => handleItemPress(item)}>
      <Image
        source={item.icons} // Use the service's icon image here
        style={{ width: 30, height: 30, tintColor: COLORS.darkOrange }}
      />
      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        <Text style={{ marginLeft: SIZES.base, ...FONTS.h3 }}>{item.serviceName}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleItemPress = (item) => {
    
    navigation.navigate('BenefitDetails', { selectedItem: item, userData });
  };

  return (
    <View style={{ flex: 1, ...SHADOWS.dark }}>
      {renderHeader()}

      {/* HistoryList */}
      <Animated.View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <Text style={{ ...FONTS.h2 }}>LIST OF BENEFITS</Text>
        <View
          style={{
            height: 1,
            backgroundColor: COLORS.darkGray,
            marginBottom: 15,
          }}
        />

        <FlatList
          data={isDirectMember ? getMemberPlanServices(selectedItem) : mainUserPlanService}
          keyExtractor={(item) => `${item._id}`}
          renderItem={renderItem}
          contentContainerStyle={{ marginTop: SIZES.base }}
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
      </Animated.View>
    </View>
  );
};

export default MembBenefDetails;
