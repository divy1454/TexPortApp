import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDemoMode } from '../../context/DemoContext';
import { API } from '../../../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPartyScreen = ({ route, navigation }) => {
  const { party } = route.params;
  const { demoMode, showDemoAlert } = useDemoMode();
  const scrollViewRef = useRef(null);
  const { height: screenHeight } = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [newPartyId, setNewPartyId] = useState('PTY-' + party.id); // Default ID
  const [formData, setFormData] = useState({
    partyName: party.name,
    gstNumber: party.gst || '',
    // location: party.location || '',
    business_name: party.business_name || '',
    business_location: party.business_location || '',
    phoneNumber: party.phone || '',
    email: party.email || '',
    address: party.address || '',
    partyId: party.id,
  });
  const [errors, setErrors] = useState({});

  // Get user ID from AsyncStorage when component mounts
  //   useEffect(() => {
  //     const getUserFromStorage = async () => {
  //       try {
  //         setIsLoadingUser(true);
  //         const userString = await AsyncStorage.getItem('user');
  //         if (userString) {
  //           const user = JSON.parse(userString);
  //           // Set the created_by field with user ID
  //           if (user.id) {
  //             const userId = user.id.toString();
  //             setFormData(prev => ({ ...prev, created_by: userId }));

  //             // Get new party ID after user is loaded
  //             try {
  //               const response = await fetch(`${API}parties/new-id/${userId}`);

  //               // Check if response is ok
  //               if (!response.ok) {
  //                 throw new Error(`HTTP error! status: ${response.status}`);
  //               }

  //               // Get response text first to check if it's valid JSON
  //               const responseText = await response.text();

  //               // Check if response is empty
  //               if (!responseText) {
  //                 console.warn('Empty response from server for new party ID');
  //                 setNewPartyId('PTY-001'); // Default fallback
  //                 return;
  //               }

  //               // Try to parse JSON
  //               let data;
  //               try {
  //                 data = JSON.parse(responseText);
  //               } catch (jsonError) {
  //                 console.error('JSON parse error for new party ID:', jsonError);
  //                 console.log('Response was not valid JSON:', responseText);
  //                 setNewPartyId('PTY-001'); // Default fallback
  //                 return;
  //               }

  //               if (data.success) {
  //                 console.log('New party ID generated:', data.new_id);
  //                 setNewPartyId(data.new_id);
  //               } else {
  //                 console.error('Failed to get new party ID:', data.message);
  //                 setNewPartyId('PTY-001'); // Default fallback
  //               }
  //             } catch (error) {
  //               console.error('Error fetching new party ID:', error);
  //               setNewPartyId('PTY-001'); // Default fallback
  //             }
  //           } else {
  //             console.warn('User ID not found in stored user data');
  //             setNewPartyId('PTY-001'); // Default fallback
  //           }
  //         } else {
  //           console.warn('No user data found in AsyncStorage');
  //           // Alert.alert('Error', 'User session not found. Please login again.');
  //           setNewPartyId('PTY-001'); // Default fallback
  //         }
  //       } catch (error) {
  //         console.error('Error getting user from AsyncStorage:', error);
  //         // Alert.alert('Error', 'Failed to load user data. Please login again.');
  //         setNewPartyId('PTY-001'); // Default fallback
  //       } finally {
  //         setIsLoadingUser(false);
  //       }
  //     };

  //     // getUserFromStorage();
  //   }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.partyName.trim()) {
      newErrors.partyName = 'Party name is required';
    }

    if (!formData.gstNumber.trim()) {
      newErrors.gstNumber = 'GST number is required';
    } else if (formData.gstNumber.length !== 15) {
      newErrors.gstNumber = 'GST number must be 15 characters';
    }

    // if (!formData.location.trim()) {
    //   newErrors.location = 'Location is required';
    // }

    if (!formData.business_name.trim()) {
      newErrors.business_name = 'Business name is required';
    }

    if (!formData.business_location.trim()) {
      newErrors.business_location = 'Business location is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (demoMode) {
      showDemoAlert();
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = `${API}parties/${formData.partyId}`;

      // Prepare the data to send for update
      const requestData = {
        name: formData.partyName,
        gst: formData.gstNumber,
        business_name: formData.business_name,
        business_location: formData.business_location,
        phone: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
      };
 
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // Check if response is ok first
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get response text first to check if it's valid JSON
      const responseText = await response.text();

      // Check if response is empty
      if (!responseText) {
        throw new Error('Empty response from server');
      }

      // Try to parse JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.log('JSON parse error:', jsonError);
        console.log('Response was not valid JSON:', responseText);
        throw new Error('Server returned invalid JSON response');
      }

      Alert.alert(
        'Success!',
        data.message || 'Party has been updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      console.log('party error:', error);

      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error.message.includes('Network request failed')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message.includes('HTTP error')) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message.includes('invalid JSON')) {
        errorMessage = 'Server configuration error. Please contact support.';
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Helper function to create consistent input props for future-proofing
  const createInputProps = (field, placeholder, options = {}) => {
    const { transform, ...validTextInputProps } = options; // Extract transform from options

    return {
      style: [
        styles.formInput,
        options.multiline && styles.textArea,
        errors[field] && styles.formInputError,
      ],
      placeholder,
      placeholderTextColor: '#9CA3AF',
      value: formData[field],
      onChangeText: value =>
        updateFormData(field, transform ? transform(value) : value),
      ...validTextInputProps, // Spread only valid TextInput props
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Party</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          extraHeight={Platform.OS === 'ios' ? 50 : 80}
          extraScrollHeight={Platform.OS === 'ios' ? 50 : 80}
          keyboardOpeningTime={250}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEventThrottle={16}
          enableResetScrollToCoords={false}
          viewIsInsideTabBar={false}
          getTextInputRefs={() => {
            // This helps the library find all TextInput components automatically
            return [];
          }}
        >
          <View style={styles.autoIdContainer}>
            <Text style={styles.autoIdLabel}>🆔 Auto-Generated Party ID</Text>
            <Text style={styles.autoIdValue}>{newPartyId}</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Party Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput {...createInputProps('partyName', 'Enter party name')} />
            {errors.partyName && (
              <Text style={styles.errorText}>{errors.partyName}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              GST Number <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              {...createInputProps('gstNumber', '24ABCDE1234F1Z5', {
                maxLength: 15,
                transform: value => value.toUpperCase(),
              })}
            />
            {errors.gstNumber && (
              <Text style={styles.errorText}>{errors.gstNumber}</Text>
            )}
          </View>

          {/* <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Location <Text style={styles.required}>*</Text>
            </Text>
            <TextInput {...createInputProps('location', 'City, State')} />
            {errors.location && (
              <Text style={styles.errorText}>{errors.location}</Text>
            )}
          </View> */}

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              {...createInputProps(
                'phoneNumber',
                'Enter 10-digit phone number',
                {
                  keyboardType: 'numeric',
                  maxLength: 10,
                },
              )}
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Email <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              {...createInputProps('email', 'Enter email address', {
                keyboardType: 'email-address',
                autoCapitalize: 'none',
              })}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Address <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              {...createInputProps('address', 'Enter complete address', {
                multiline: true,
                numberOfLines: 3,
              })}
            />
            {errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Business Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              {...createInputProps('business_name', 'Enter business name')}
            />
            {errors.business_name && (
              <Text style={styles.errorText}>{errors.business_name}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Business Location <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              {...createInputProps(
                'business_location',
                'Enter business location',
              )}
            />
            {errors.business_location && (
              <Text style={styles.errorText}>{errors.business_location}</Text>
            )}
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.savePartyButton,
            (isLoading || isLoadingUser) && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={isLoading || isLoadingUser}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.savePartyButtonText}>Update Party</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  // hidden: {
  //   position: 'absolute',
  //   opacity: 0,
  //   height: 0,
  //   width: 0,
  // },
  required: {
    color: '#EF4444',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginTop: 25,
    padding: 8,
  },
  headerTitle: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 60 : 0,
    flexGrow: 1,
    minHeight: screenHeight * 0.2, // Ensures content takes adequate space
  },
  autoIdContainer: {
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#93C5FD',
    alignItems: 'center',
    marginBottom: 24,
  },
  autoIdLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  autoIdValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: 'white',
    minHeight: 48, // Ensures consistent touch target
  },
  formInputError: {
    borderColor: '#EF4444',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12, // Ensures text starts at the top
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savePartyButton: {
    flex: 1,
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  savePartyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditPartyScreen;
