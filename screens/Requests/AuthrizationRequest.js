import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  TextInput,
  Button,
  ScrollView, ActivityIndicator // Import ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { FONTS, SIZES, COLORS, SHADOWS } from '../../constants';
import { TextButton } from '../../components';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import api from '../Authentication/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthorizationRequest = ({ userData }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(
    'Add New Member/ Dependent'
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [selectedIncomeDocuments, setSelectedIncomeDocuments] = useState([]);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  
  const [loading, setLoading] = React.useState(false);

  // Add a success state and initialize it as false
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false); // Close the dropdown after selecting an option
  };

  useEffect(() => {
    // Use a switch statement to set the subject based on the selected option
    switch (selectedOption) {
      case 'Add New Member/ Dependent':
        setSubject('Add New Member/ Dependent');
        break;
      case 'Request Refund':
        setSubject('Request Refund');
        break;
      case 'Surgery':
        setSubject('Request Authorization for Surgery');
        break;
      case 'Other':
        setSubject('Other');
        break;
      default:
        setSubject('');
        break;
    }
  }, [selectedOption]);

  // ------ Render Dropdown List --------------------------------
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
            {/* Previous Options */}
            <TouchableOpacity
              style={{
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.base,
              }}
              onPress={() => handleOptionPress('Add New Member/ Dependent')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ fontWeight: 'bold' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      ...FONTS.body3,
                    }}
                  >{`1 - `}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color:
                        selectedOption === 'Add New Member/ Dependent'
                          ? COLORS.darkOrange
                          : COLORS.black,
                    }}
                  >
                    Add New Member/ Dependent
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                height: 1,
                marginHorizontal: SIZES.padding,
                backgroundColor: COLORS.gray2,
              }}
            />

            <TouchableOpacity
              style={{
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.base,
              }}
              onPress={() => handleOptionPress('Request Refund')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ fontWeight: 'bold' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      ...FONTS.body3,
                    }}
                  >{`2 - `}</Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color:
                        selectedOption === 'Request Refund'
                          ? COLORS.darkOrange
                          : COLORS.black,
                    }}
                  >
                    Request Refund
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                height: 1,
                marginHorizontal: SIZES.padding,
                backgroundColor: COLORS.gray2,
              }}
            />

            {/* Additional Options */}
            <TouchableOpacity
              style={{
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.base,
              }}
              onPress={() => handleOptionPress('Surgery')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ fontWeight: 'bold' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      ...FONTS.body3,
                    }}
                  >{`3 - `}</Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color:
                        selectedOption === 'Surgery'
                          ? COLORS.darkOrange
                          : COLORS.black,
                    }}
                  >
                    Request Authorization for Surgery
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
{/* 
            <View
              style={{
                height: 1,
                marginHorizontal: SIZES.padding,
                backgroundColor: COLORS.gray2,
              }}
            />

            <TouchableOpacity
              style={{
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.base,
              }}
              onPress={() => handleOptionPress('Other')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ fontWeight: 'bold' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      ...FONTS.body3,
                    }}
                  >{`4 - `}</Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color:
                        selectedOption === 'Other'
                          ? COLORS.darkOrange
                          : COLORS.black,
                    }}
                  >
                    Other
                  </Text>
                </View>
              </View>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  if (status === null) {
    requestPermission();
  }

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log(result)
      if (result.type === 'success') {
        setSelectedDocuments([...selectedDocuments, result]);
        // Enable the button when a file is selected
      }
    } catch (error) {
      console.error('Error picking a document:', error);
    }
  };

  const pickIncomeDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setSelectedIncomeDocuments([...selectedIncomeDocuments, result]);
        // Enable the button when a file is selected
      }
    } catch (error) {
      console.error('Error picking a document:', error);
    }
  };

  const removeDocument = (index) => {
    const updatedDocuments = [...selectedDocuments];
    updatedDocuments.splice(index, 1);
    setSelectedDocuments(updatedDocuments);
  
  }; 

  const removeIncomeDocument = (index) => {
    const updatedDocuments = [...selectedIncomeDocuments];
    updatedDocuments.splice(index, 1);
    setSelectedIncomeDocuments(updatedDocuments);
  
  };

  const handleSubmit = async () => {
    try {     
      setLoading(true); // Show loading indicator
  
       // Check if no files are selected

        if (selectedDocuments.length === 0 && selectedIncomeDocuments.length === 0) {
          alert('Please select at least one file before submitting.');
          return;
        }
        const formData = new FormData();
  
        const allSelectedDocuments = [...selectedDocuments, ...selectedIncomeDocuments];
  
        // Append selectedDocuments and selectedIncomeDocuments to the formData
        selectedDocuments.forEach((document, index) => {
          formData.append(`files[]`, document);
        });
    
        selectedIncomeDocuments.forEach((document, index) => {
          formData.append(`files[]`, document);
        });
    
        formData.append('title', subject);
        formData.append('comment', message);
    
        const token = await AsyncStorage.getItem('@user_token');

        console.log(formData)
    
        const response = await api.uploadAuthorizationsRequests(
          formData,
          token
        );

       // console.log(response)
  
  
        if (response) {
          alert('Authorization request sent successfully');
          setIsSuccess(true);
          resetForm();
        } else {
          throw new Error('Failed to submit authorization request');
        }
      
    } catch (error) {
      alert('Error: ' + error.message);
      console.error(error);
  
      // Optionally, you can reset the form after an error
      resetForm();
    } finally {
      setLoading(false); // Hide loading indicator regardless of success or failure
      resetForm();
    }
  };
  
  
  const renderRequestMemberId = () => {
    return (
      <Animated.View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <View>
          <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>Message:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              marginTop: 5,
              height: 150,
              textAlignVertical: 'top',
              color: COLORS.darkGray2,
              ...FONTS.h3,
            }}
            multiline={true}
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>Attachments:</Text>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            {selectedDocuments.map((document, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text>{document.name}</Text>
                </View>
                <View>
                  <Button
                    title="Remove"
                    onPress={() => removeDocument(index)}
                    color="red"
                  />
                </View>
              </View>
            ))}
            {selectedDocuments.length === 0 && (
              <Button
                title="Add ID Document"
                onPress={() => pickDocument()}
              />
            )}
            {selectedIncomeDocuments.map((document, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text>{document.name}</Text>
                </View>
                <View>
                  <Button
                    title="Remove"
                    onPress={() => removeIncomeDocument(index)}
                    color="red"
                  />
                </View>
              </View>
            ))}
            {selectedIncomeDocuments.length === 0 && (
              <Button
                title="Add Income Credentials"
                onPress={() => pickIncomeDocument()}
              />
            )}
            <Text style={{ marginTop: 3 }}>
              {selectedIncomeDocuments.length + selectedDocuments.length} file(s) selected
            </Text>
          </View>
        </View>
        {/* <View style={{ alignItems: 'center', marginTop: 10 }}>
          <TextButton
            label="Send Request"
            title="Submit"
            buttonContainerStyle={{
              height: 40,
              width: 150,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.darkOrange
            }}
            onPress={handleSubmit}
          />
        </View> */}
      </Animated.View>
    );
  };

  const renderAutoization = () => {
    return (
      <Animated.View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <View>
          <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>Message:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              marginTop: 5,
              height: 150,
              textAlignVertical: 'top',
            }}
            multiline={true}
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Attachments:</Text>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            {selectedDocuments.map((document, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text>{document.name}</Text>
                </View>
                <View>
                  <Button
                    title="Remove"
                    onPress={() => removeDocument(index)}
                    color="red"
                  />
                </View>
              </View>
            ))}
            {selectedDocuments.length === 0 && (
              <Button title="Add Proof/Payment" onPress={() => pickDocument()} />
            )}
            {selectedIncomeDocuments.map((document, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text>{document.name}</Text>
                </View>
                <View>
                  <Button
                    title="Remove"
                    onPress={() => removeIncomeDocument(index)}
                    color="red"
                  />
                </View>
              </View>
            ))}
            {selectedIncomeDocuments.length === 0 && (
              <Button title="Add Form" onPress={() => pickIncomeDocument()} />
            )}
            <Text style={{ marginTop: 3 }}>
              {selectedIncomeDocuments.length + selectedDocuments.length} file(s) selected
            </Text>
          </View>
        </View>
        {/* <View style={{ alignItems: 'center', marginTop: 10 }}>
          <TextButton
            label="Send Request"
            title="Submit"
            buttonContainerStyle={{
              height: 40,
              width: 150,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.darkOrange
            }}
            onPress={handleSubmit}
          />
        </View> */}
      </Animated.View>
    );
  };

  const renderSurgery = () => {
    return (
      <Animated.View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <View>
          <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>Message:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              marginTop: 5,
              height: 150,
              textAlignVertical: 'top',
            }}
            multiline={true}
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Attachments:</Text>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            {selectedDocuments.map((document, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text>{document.name}</Text>
                </View>
                <View>
                  <Button
                    title="Remove"
                    onPress={() => removeDocument(index)}
                    color="red"
                  />
                </View>
              </View>
            ))}
            {selectedDocuments.length === 0 && (
              <Button title="Add Dorctors Report" onPress={() => pickDocument()} />
            )}
            {selectedIncomeDocuments.map((document, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text>{document.name}</Text>
                </View>
                <View>
                  <Button
                    title="Remove"
                    onPress={() => removeIncomeDocument(index)}
                    color="red"
                  />
                </View>
              </View>
            ))}
            {selectedIncomeDocuments.length === 0 && (
              <Button title="Add Quotation" onPress={() => pickIncomeDocument()} />
            )}
            <Text style={{ marginTop: 3 }}>
              {selectedIncomeDocuments.length + selectedDocuments.length} file(s) selected
            </Text>
          </View>
        </View>
        {/* <View style={{ alignItems: 'center', marginTop: 10 }}>
          <TextButton
            label="Send Request"
            title="Submit"
            buttonContainerStyle={{
              height: 40,
              width: 150,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.darkOrange
            }}
            onPress={handleSubmit}
          />
        </View> */}
      </Animated.View>
    );
  };

  const renderOther = () => {
    return (
      <Animated.View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <View>
          <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>Message:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              marginTop: 5,
              height: 150,
              textAlignVertical: 'top',
            }}
            multiline={true}
            value={message}
            onChangeText={setMessage}
          />
        </View>
      </Animated.View>
    );
  };

  // Add a function to reset the form after successful submission
  const resetForm = () => {
    setSubject('');
    setMessage('');
    setSelectedOption('Add New Member/ Dependent');
    setSelectedDocuments([]);
    setSelectedIncomeDocuments([]);
    setIsSuccess(false); // Reset the success state
  };

  return (
    <ScrollView style={{ flex: 1 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={loading} // Show the modal when loading is true
          onRequestClose={() => setLoading(false)} // Close the modal when needed
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
            }}
          >
            <ActivityIndicator size="large" color={COLORS.darkOrange} />
          </View>
        </Modal>

        {renderDropdown()}

        {isSuccess ? (
          // Render a success message and a button to reset the form
          <View style={{ padding: SIZES.padding}}>
            <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>
              Form submitted successfully!
            </Text>
            <TouchableOpacity
              onPress={resetForm}
              style={{
                backgroundColor: COLORS.darkOrange,
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              <Text style={{fontWeight: 'bold', color: COLORS.white }}>Submit Another Request</Text>
            </TouchableOpacity>
          </View>
        ) : (
          
          <View style={{ padding: SIZES.padding }}>
          {/* <View style={{ padding: SIZES.padding }}> */}
            <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'justify' }}>Please fill in the form</Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>Agent:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                marginTop: 5,
                height: 40,
                padding: 5,
                fontWeight: 'bold',
                color: COLORS.darkGray2,
                ...FONTS.h3,
              }}
              value={userData.user.user.firstName + " " + userData.user.user.lastName}
              //onChangeText={setFrom}
              editable={false}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>Subject:</Text>
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
                  color: COLORS.darkGray2,
                }}
              >
                {selectedOption === 'Add New Member/ Dependent'
                  ? "1 - Add New Member/ Dependent"
                  : selectedOption === 'Request Refund'
                  ? "2 - Request Refund"
                  : selectedOption === 'Surgery'
                  ? "3 - Request Authorization for Surgery"
                  : selectedOption === 'Other'
                  ? "4 - Other Requests"
                  : null}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {/* Content based on selected option */}
            {selectedOption === 'Add New Member/ Dependent' ? (
              <View>
                {renderRequestMemberId()}
              </View>
            ) : selectedOption === 'Request Refund' ? (
              <View>
                {renderAutoization()}
              </View>
            ) : selectedOption === 'Surgery' ? (
              <View>
                {renderSurgery()}
              </View>
            ) : selectedOption === 'Other' ? (
              <View>
                {renderOther()}
              </View>
            ) : null}
          </View>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <TextButton
              label="Send Request"
              title="Submit"
              buttonContainerStyle={{
                height: 40,
                width: 150,
                alignItems: 'center',
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.darkOrange,
                // Disable the button when the message is empty
                opacity: message.trim() === '' ? 0.5 : 1,
                // Add a conditional onPress function to prevent submission when the message is empty
                // onPress: message.trim() === '' ? null : handleSubmit,
              }}
              // Disabled property can also be used to disable the button
              disabled={message.trim() === ''}
              onPress={handleSubmit}
            />
          </View>
      </View>)}
    </ScrollView>
  );
};

export default AuthorizationRequest;
