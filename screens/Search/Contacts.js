import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Image, TextInput, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { COLORS, SIZES, FONTS, icons, SHADOWS } from '../../constants';
import HospitalListModal from './HospitalListModal';
import MediplusLocation from './MediplusLocation';
import FarmaciesListModal from './FarmaciesListModal';

const { width, height } = Dimensions.get('window');

const Contacts = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isHospitalsModalVisible, setHospitalsModalVisible] = useState(false);
  const [isClinicsModalVisible, setClinicsModalVisible] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedFarmacy, setSelectedFarmacy] = useState(null);
  const [modalAnimatedValue] = useState(new Animated.Value(0));
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [filteredFarmacies, setFilteredFarmacies] = useState([]);
  const searchInputRef = useRef(null);
  const mapRef = useRef(null);

  {/* List of Hospitals DATA rendered in the map */}
  const hospitalsAndClinicsData = [
    {
      name: 'Hospital Central',
      address:'1653 Avenida Eduardo Mondlane, Maputo',
      contact: '+258 21 357900',
      openingTime: '08:00 AM',
      closingTime: '06:00 PM',
      latitude: -25.968734643264572, 
      longitude: 32.58886295779855,
    },
    {
      name: 'Hospital Privado',
      address:'Avenida Para o Palmar',
      contact: '+258 21 424080',
      openingTime: '08:00 AM',
      closingTime: '06:00 PM',
      latitude: -25.94295290035986,
      longitude: 32.61219596864086,
    },
    {
      name: 'Hospital Geral de Mavalane',
      address:'Avenidas das Forças Populares de Libertação de Moçambique (FPLM) 798',
      contact: '+258 21 424080',
      openingTime: '08:00 AM',
      closingTime: '10:00 PM',
      latitude: -25.93023875146013,
      longitude: 32.58653210725467,
    },
    {
      name: 'Hospital Militar de Maputo',
      address:'Av.Eduardo Mondlane 1427, Central',
      contact: '+258 21 424080',
      openingTime: '08:00 AM',
      closingTime: '06:00 PM',
      latitude: -25.956632836636796,
      longitude: 32.593054160719994,
    },
    {
      name: 'Centro de Saúde 1º de Junho',
      address:'Av.Eduardo Mondlane 1427, Central',
      contact: '+258 21 424080',
      openingTime: '08:00 AM',
      closingTime: '06:00 PM',
      latitude: -25.914711577391454,
      longitude: 32.609415273096296,
    },
    {
      name: 'Hospital de Xipamanine',
      address:'1100 Maputo',
      contact: '+258 82 1401970',
      openingTime: '08:00 AM',
      closingTime: '06:00 PM',
      latitude: -25.938160359921255,
      longitude: 32.565613253790076,
    },
    {
      name: 'Instituto Do Coração - ICOR',
      address:'111 Av. Kenneth Kaunda, Maputo',
      contact: '+258 82 327 4800',
      openingTime: '08:00 AM',
      closingTime: '06:00 PM',      
      latitude: -25.953875438950075, 
      longitude:  32.59295521887639,
    },
    // Add more hospitals here
  ];

  {/* List of Hospitals DATA rendered in the map */}
  const farmaciesData = [
    {
      name: 'Farmácia Moderna',
      address:'Av.Eduardo Mondlane 1427, Central',
      contact: '+258 21 424080',
      openingTime: '08:00 AM',
      closingTime: '06:00 PM',
      open:'Open 24hrs',
      latitude: -25.965744516373096,
      longitude: 32.582021263362584,       
    },
    {
      name: 'Farmácia Calendula',
      address:'Mao Tse Tung, Central',
      contact: '+258 21 497606',
      openingTime: '08:00 AM',
      closingTime: '07:00 PM',
      latitude: -25.96497284792432,
      longitude: 32.59626915838874,        
    },
    {
      name: 'Pharmacy compone',
      address:'Avenida Vladimir Lenine',
      contact: '+258 82 921 7970',
      openingTime: '08:00 AM',
      closingTime: '08:00 PM',
      latitude: -25.89077795533948,
      longitude: 32.61559654651403,    
          
    },
    {
      name: 'Farmácia Truinfo',
      address:'Rua Do Costa DO Sol',
      contact: '+258 82 921 7970',
      openingTime: '08:00 AM',
      closingTime: '08:00 PM',
      latitude: -25.9185098,
      longitude: 32.6184841,    
          
    },
    // Add more farmacies here
  ];

  const zoomToLocation = (latitude, longitude) => {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      1000
    );
  };

  {/* ENDList of Hospitals DATA rendered in the map */}
  useEffect(() => {
    fetchUserLocation();
  }, []);

  useEffect(() => {
    // Filter hospitals based on the search query
    const filteredHospitals = hospitalsAndClinicsData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter hospitals based on the search query
    const filteredFarmacies = farmaciesData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredFarmacies(filteredFarmacies);
    setFilteredHospitals(filteredHospitals);
  }, [searchQuery]);

  useEffect(() => {
    if (isLocationModalVisible || isHospitalsModalVisible || isClinicsModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isLocationModalVisible, isHospitalsModalVisible, isClinicsModalVisible, modalAnimatedValue]);

  // Function to fetch user's current location
  const fetchUserLocation = async () => {
    // Check if location permission is granted
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission not granted');
      return;
    }

    // Get the user's current location
    const location = await getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setUserLocation({ latitude, longitude });
  };

  // Function to handle the search action
  const handleSearch = (query) => {
    setSearchQuery(query);

    const firstHospital = filteredHospitals[0];
    if (firstHospital) {
      setSelectedHospital(firstHospital);
      zoomToLocation(firstHospital.latitude, firstHospital.longitude);
    }

    const firstFarmacies = filteredFarmacies[0];
    if (firstFarmacies) {
      setSelectedFarmacy(firstFarmacies);
      zoomToLocation(firstFarmacies.latitude, firstFarmacies.longitude);
    }
  };
  

  const handleFilterPress = () => {
    setSearchQuery('');
    searchInputRef.current.clear();
    resetMapToInitialPosition();
  };

  const resetMapToInitialPosition = () => {
    mapRef.current.animateToRegion(
      {
        latitude: userLocation?.latitude || -25.9667,
        longitude: userLocation?.longitude || 32.5833,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      1000
    );
  };

  // Function to zoom the map to the selected hospital
  const zoomToHospital = (hospital) => {
    if (hospital) {
      mapRef.current.animateToRegion(
        {
          latitude: hospital.latitude,
          longitude: hospital.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000
      );
    }
  };
  const zoomToFarmacy = (farmacy) => {
    if (farmacy) {
      mapRef.current.animateToRegion(
        {
          latitude: farmacy.latitude,
          longitude: farmacy.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000
      );
    }
  };
  const zoomToMediplusLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: -25.95167006696966, 
        longitude: 32.59078343729454,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
    setLocationModalVisible(false); // Close the modal
  };

  const animateToUserLocation = async () => {
    // Check if location permission is granted
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission not granted');
      return;
    }
  
    // Get the user's current location
    const location = await getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
  
    // Animate the map to the user's current location
    zoomToLocation(latitude, longitude);
  };
  
  

  

  // Function to render the map with markers for hospitals and clinics
  const renderMap = () => {
    return (
      <View style={styles.mapContainer}>
        <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: userLocation?.latitude || -25.9667,
          longitude: userLocation?.longitude || 32.5833,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
          {/* Marker for user's current location */}
          {userLocation && (
            <Marker
              coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
              title="Your Location"
            />
          )}

          {/* Marker for MediPlus Location */}
          <Marker
            coordinate={{
              latitude: -25.95167006696966, 
              longitude: 32.59078343729454,
            }}
            title="MediPlus Location"
            description="Bairro Coop Rua D no. 27"
          >
            {/* MediPlus icon */}
            <Image
              source={icons.mediplus1}
              style={{ width: 35, height: 35, }}
            />
          </Marker>

          {/* Markers for hospitals and clinics */}
          {filteredHospitals.map((item) => (
            <Marker
              key={item.name}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              title={item.name}
              description={`${item.address}\n Open: ${item.openingTime} - Close: ${item.closingTime}`}
              onPress={() => zoomToHospital(item)}
            >
              {/* Hospital icon */}
              <Image
                source={icons.hospitals}
                style={{ width: 35, height: 35, tintColor: COLORS.red }}
              />
            </Marker>
          ))}

          {/* Markers for Farmacy */}
          {filteredFarmacies.map((item) => (
          <Marker
            key={item.name}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.name}
            description={`${item.address}\n Open: ${item.openingTime} - Close: ${item.closingTime}`}
            onPress={() => zoomToFarmacy(item)}
          >
            {/* Pharmacy icon */}
            <Image
              source={icons.farmacy}
              style={{ width: 35, height: 35, tintColor: COLORS.green }}
            />
          </Marker>
          ))}


          {/* User Location button */}  
          <TouchableOpacity style={styles.userLocationButton} onPress={animateToUserLocation}>
            <Image source={icons.location} style={styles.userLocationIcon} />
          </TouchableOpacity>
        </MapView>
      </View>
    );
  };

  // Function to toggle the chat modal visibility
  

  const toggleLocationModal = () => {
    setLocationModalVisible(!isLocationModalVisible);
  };

  const toggleHospitalsModal = () => {
    setHospitalsModalVisible(!isHospitalsModalVisible);
  };

  const toggleClinicsModal = () => {
    setClinicsModalVisible(!isClinicsModalVisible);
  };

  // Render the component
  return (
    <View style={{ flex: 1 }}>
      {renderMap()}
      {/* Fixed Modal */}
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Image
          source={icons.search}
          style={{ height: 20, width: 20, tintColor: COLORS.black }}
        />
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search locations..."
          onChangeText={handleSearch} // Connect the search input to the handleSearch function
        />
        <TouchableOpacity onPress={handleFilterPress}>
          <Image
            source={icons.cancel}
            style={{ height: 20, width: 20, tintColor: COLORS.gray }}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.fixedModalContainer}>
        {/* First column */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleLocationModal}>
            <Text style={styles.buttonText}>MediPlus Location</Text>
          </TouchableOpacity>
        </View>

        {/* Second column */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleHospitalsModal}>
            <Text style={styles.buttonText}>Hospitals/Clinics</Text>
          </TouchableOpacity>
        </View>

        {/* Third column */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleClinicsModal}>
            <Text style={styles.buttonText}>Farmacies</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for showing MediPlus Location */}
      <MediplusLocation
        visible={isLocationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        onShowOnMap={zoomToMediplusLocation} // Pass the callback function
        locationCoordinates={{
          latitude: -25.968734643264572,
          longitude: 32.58886295779855,
        }}
      />

      {/* Modal for showing Hospitals associated with MediPlus */}
      <HospitalListModal
        visible={isHospitalsModalVisible}
        hospitals={filteredHospitals}
        onClose={() => setHospitalsModalVisible(false)}
        onHospitalSelect={(hospital) => {
          setSelectedHospital(hospital);
          zoomToHospital(hospital);
        }}
      />

      {/* Modal for showing Farmacies associated with MediPlus */}
      <FarmaciesListModal
        visible={isClinicsModalVisible}
        farmacies={filteredFarmacies}
        onClose={() => setClinicsModalVisible(false)}
        onFarmaciesSelect={(farmacy) => {
          setSelectedFarmacy(farmacy);
          zoomToFarmacy(farmacy);
        }}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  fixedModalContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    marginBottom: height * 0.1, // Adjust as needed
  },
  searchContainer: {
    //flex:1,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: SIZES.padding,
    left: SIZES.padding,
    right: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
    zIndex: 1,    
    ...SHADOWS.dark,
  },
  searchInput: {
    flex: 1,
    marginLeft: SIZES.radius,
    ...FONTS.body3,
  },
  buttonContainer: {
    marginTop:50,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.white2,
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '95%',
    ...SHADOWS.dark,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userLocationButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    top:'68%',
    justifyContent: 'center',
    left:SIZES.padding,
    ...SHADOWS.dark,
  },
  userLocationIcon: {    
    left:SIZES.padding,
    top:'1145%',
    width: 30,
    height: 30,
    tintColor: COLORS.darkOrange,
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%', // Use '100%' to occupy the full width of the container
    height: '100%', // Use '100%' to occupy the full height of the container
  },
});

export default Contacts;
