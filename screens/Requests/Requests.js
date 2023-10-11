import React from 'react';
import { View, FlatList, TouchableOpacity, Animated, Text, Image, Linking, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS, icons, SHADOWS } from '../../constants';
import api from '../../screens/Authentication/api'; // Import the api object
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';


import AsyncStorage from "@react-native-async-storage/async-storage";

const Requests = () => {
  const [fileTemplates, setFileTemplates] = React.useState([]);
  

  const fetchFileTemplates = async () => {
    try {
        const token = await AsyncStorage.getItem('@user_token');
        //setUserToken(token); // Save user token

        const templates = await api.fetchTemplates(token); // Use the API function
        setFileTemplates(templates.fileTemplates);
    } catch (error) {
        console.log('Error fetching file templates:', error);
    }
  };

  React.useEffect(() => {
    fetchFileTemplates();
  }, []);

  const handleItemPress = async (item) => {
    try {
      if (item) {
        //const pdfUrl = `https://zeus-api-63pe.onrender.com/uploads/${item.fileTemplate.replace(/^.*[\\\/]/, '')}`;
        
        const fileName = item.fileTemplate.replace(/^.*[\\\/]/, ''); // Extract file name
        const pdfUrl = api.getFullPdfUrl(fileName); // Get full PDF URL

        // Open the PDF with an external application
        const supported = await Linking.canOpenURL(pdfUrl);
  
        if (supported) {
          await Linking.openURL(pdfUrl);
        } else {
          console.log("Don't know how to open URI: " + pdfUrl);
          alert('Unable to open PDF.');
        }
      } else {
        console.log('PDF URL not provided in the item:', item);
        alert('Unable to open PDF.');
      }
    } catch (error) {
      console.log('Error handling PDF:', error);
      alert('Unable to open PDF.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base,
      }}
      onPress={() => handleItemPress(item)}
    >
      <Image
        source={icons.cherry}
        style={{
          width: 30,
          height: 30,
          tintColor: COLORS.darkOrange,
        }}
      />
      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        {/* Render the description of the form */}
        <Text>{item.description}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <View style={{fontWeight: 'bold' }}>
            <Text style={{fontWeight: 'bold'}}>{`Updated: `}</Text>
          </View>

          <View style={{marginLeft: 5 }}>
            {/* Trim the updatedAt date to show only the year, month, and date */}
            <Text style={{ fontWeight: 'regular' }}>{item.updatedAt ? item.updatedAt.substring(0, 10) : ''}</Text>
          </View>
        </View>
      </View>

      
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={icons.pdf}
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.red,
          }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        ...SHADOWS.dark,
      }}
    >
      <Animated.View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        <Text style={{ ...FONTS.h2 }}>Required Forms</Text>

        <View
          style={{
            height: 1,
            backgroundColor: COLORS.darkGray,
          }}
        />

        <FlatList
          contentContainerStyle={{ marginTop: SIZES.radius }}
          scrollEnabled={false}
          data={fileTemplates}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLORS.lightGray1,
              }}
            />
          )}
        />
      </Animated.View>
    </View>
  );
};


export default Requests;
