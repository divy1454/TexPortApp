// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import styles from '../../../components/Css/AddStaffScreen.styles';
// import API from '../../../config/apiConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddStaffScreen = ({ navigation }) => {
//   const scrollViewRef = useRef(null);
//   const { height: screenHeight } = Dimensions.get('window');
//   const [isLoading, setIsLoading] = useState(false);
//   const [newStaffId, setNewStaffId] = useState('STF-001');

//   const [form, setForm] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     designation: '',
//     salary_type: 'monthly',
//     salary_amount: '',
//     created_by: ''
//   });
//   const [errors, setErrors] = useState({});

//   // Get new staff ID when component mounts
//   useEffect(() => {
//     const getUserFromStorage = async () => {
//       try {
//         isLoading(true);
//         const userString = await AsyncStorage.getItem('user');
//         if (userString) {
//           const user = JSON.parse(userString);
          
//           // Set the created_by field with user ID
//           if (user.id) {
//             const userId = user.id.toString();
//             setFormData(prev => ({ ...prev, created_by: userId }));

//             // Get new staff ID after user is loaded
//             try {
//               const response = await fetch(`${API}staff/new-id/${userId}`);

//               // Check if response is ok
//               if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//               }

//               // Get response text first to check if it's valid JSON
//               const responseText = await response.text();

//               // Check if response is empty
//               if (!responseText) {
//                 console.warn('Empty response from server for new staff ID');
//                 setNewStaffId('STF-001'); // Default fallback
//                 return;
//               }

//               // Try to parse JSON
//               let data;
//               try {
//                 data = JSON.parse(responseText);
//               } catch (jsonError) {
//                 console.error('JSON parse error for new staff ID:', jsonError);
//                 console.log('Response was not valid JSON:', responseText);
//                 setNewStaffId('STF-001'); // Default fallback
//                 return;
//               }

//               if (data.success) {
//                 console.log('New staff ID generated:', data.new_id);
//                 setNewStaffId(data.new_id);
//               } else {
//                 console.error('Failed to get new staff ID:', data.message);
//                 setNewStaffId('STF-001'); // Default fallback
//               }
//             } catch (error) {
//               console.error('Error fetching new staff ID:', error);
//               setNewStaffId('STF-001'); // Default fallback
//             }
//           } else {
//             console.warn('User ID not found in stored user data');
//             setNewStaffId('STF-001'); // Default fallback
//           }
//         } else {
//           console.warn('No user data found in AsyncStorage');
//           // Alert.alert('Error', 'User session not found. Please login again.');
//           setNewStaffId('STF-001'); // Default fallback
//         }
//       } catch (error) {
//         console.error('Error getting user from AsyncStorage:', error);
//         // Alert.alert('Error', 'Failed to load user data. Please login again.');
//         setNewStaffId('STF-001'); // Default fallback
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getUserFromStorage(); 
//     console.log('Hello');
    
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!form.name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!form.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d{10,15}$/.test(form.phone.replace(/[^0-9]/g, ''))) {
//       newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
//     }

//     if (form.email.trim()) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(form.email)) {
//         newErrors.email = 'Please enter a valid email address';
//       }
//     }

//     if (!form.designation.trim()) {
//       newErrors.designation = 'Designation is required';
//     }

//     if (!form.salary_amount.trim()) {
//       newErrors.salary_amount = 'Salary amount is required';
//     } else if (isNaN(form.salary_amount) || parseFloat(form.salary_amount) <= 0) {
//       newErrors.salary_amount = 'Please enter a valid salary amount';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (isLoading) return;
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch(`${API}staff`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//         body: JSON.stringify(form),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const responseText = await response.text();

//       if (!responseText) {
//         throw new Error('Empty response from server');
//       }

//       let data;
//       try {
//         data = JSON.parse(responseText);
//       } catch (jsonError) {
//         console.error('JSON parse error:', jsonError);
//         throw new Error('Server returned invalid JSON response');
//       }

//       Alert.alert(
//         'Success!',
//         data.message || 'Staff member has been added successfully.',
//         [
//           {
//             text: 'OK',
//             onPress: () => navigation.goBack(),
//           },
//         ],
//       );
//     } catch (error) {
//       console.error('Error:', error);
      
//       let errorMessage = 'An unexpected error occurred. Please try again.';
      
//       if (error.message.includes('Network request failed')) {
//         errorMessage = 'Network error. Please check your internet connection.';
//       } else if (error.message.includes('HTTP error')) {
//         errorMessage = 'Server error. Please try again later.';
//       } else if (error.message.includes('invalid JSON')) {
//         errorMessage = 'Server configuration error. Please contact support.';
//       }

//       Alert.alert('Error', errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateFormData = (field, value) => {
//     setForm(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: null }));
//     }
//   };

//   // Helper function to create consistent input props
//   const createInputProps = (field, placeholder, options = {}) => {
//     const { transform, ...validTextInputProps } = options;

//     return {
//       style: [
//         styles.formInput,
//         options.multiline && styles.textArea,
//         errors[field] && styles.formInputError,
//       ],
//       placeholder,
//       placeholderTextColor: '#9CA3AF',
//       value: form[field],
//       onChangeText: value =>
//         updateFormData(field, transform ? transform(value) : value),
//       ...validTextInputProps,
//     };
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Icon name="close" size={24} color="#1F2937" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add New Staff</Text>
//         <View style={styles.placeholder} />
//       </View>

//       <KeyboardAvoidingView
//         style={styles.keyboardAvoidingView}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
//       >
//         <KeyboardAwareScrollView
//           ref={scrollViewRef}
//           style={styles.content}
//           contentContainerStyle={styles.contentContainer}
//           enableOnAndroid={true}
//           enableAutomaticScroll={true}
//           extraHeight={Platform.OS === 'ios' ? 50 : 80}
//           extraScrollHeight={Platform.OS === 'ios' ? 50 : 80}
//           keyboardOpeningTime={250}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           resetScrollToCoords={{ x: 0, y: 0 }}
//           scrollEventThrottle={16}
//           enableResetScrollToCoords={false}
//           viewIsInsideTabBar={false}
//         >
//           <View style={styles.autoIdContainer}>
//             <Text style={styles.autoIdLabel}>👤 Auto-Generated Staff ID</Text>
//             <Text style={styles.autoIdValue}>{newStaffId}</Text>
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.formLabel}>
//               Full Name <Text style={styles.required}>*</Text>
//             </Text>
//             <TextInput {...createInputProps('name', 'Enter full name', {
//               autoCapitalize: 'words',
//               returnKeyType: 'next'
//             })} />
//             {errors.name && (
//               <Text style={styles.errorText}>{errors.name}</Text>
//             )}
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.formLabel}>
//               Phone Number <Text style={styles.required}>*</Text>
//             </Text>
//             <TextInput {...createInputProps('phone', 'Enter phone number', {
//               keyboardType: 'phone-pad',
//               returnKeyType: 'next'
//             })} />
//             {errors.phone && (
//               <Text style={styles.errorText}>{errors.phone}</Text>
//             )}
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.formLabel}>Email</Text>
//             <TextInput {...createInputProps('email', 'Enter email address (optional)', {
//               keyboardType: 'email-address',
//               autoCapitalize: 'none',
//               returnKeyType: 'next'
//             })} />
//             {errors.email && (
//               <Text style={styles.errorText}>{errors.email}</Text>
//             )}
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.formLabel}>
//               Designation <Text style={styles.required}>*</Text>
//             </Text>
//             <TextInput {...createInputProps('designation', 'Enter job title/designation', {
//               autoCapitalize: 'words',
//               returnKeyType: 'next'
//             })} />
//             {errors.designation && (
//               <Text style={styles.errorText}>{errors.designation}</Text>
//             )}
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.formLabel}>
//               Salary Type <Text style={styles.required}>*</Text>
//             </Text>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={form.salary_type}
//                 onValueChange={itemValue =>
//                   updateFormData('salary_type', itemValue)
//                 }
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Monthly" value="monthly" />
//                 <Picker.Item label="Daily" value="daily" />
//                 <Picker.Item label="Per Meter" value="per_meter" />
//               </Picker>
//             </View>
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.formLabel}>
//               Salary Amount <Text style={styles.required}>*</Text>
//               <Text style={styles.salaryHint}>
//                 {form.salary_type === 'monthly'
//                   ? ' (Monthly)'
//                   : form.salary_type === 'daily'
//                   ? ' (Per Day)'
//                   : ' (Per Meter)'}
//               </Text>
//             </Text>
//             <TextInput {...createInputProps('salary_amount', 'Enter amount', {
//               keyboardType: 'numeric',
//               returnKeyType: 'done'
//             })} />
//             {errors.salary_amount && (
//               <Text style={styles.errorText}>{errors.salary_amount}</Text>
//             )}
//           </View>
//         </KeyboardAwareScrollView>
//       </KeyboardAvoidingView>

//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => navigation.goBack()}
//           disabled={isLoading}
//         >
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.saveStaffButton,
//             isLoading && styles.disabledButton,
//           ]}
//           onPress={handleSubmit}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator size="small" color="white" />
//           ) : (
//             <Text style={styles.saveStaffButtonText}>Save Staff</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default AddStaffScreen;
