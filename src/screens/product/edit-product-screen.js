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

/**
 * AddPartyScreen - Future-Proof Implementation
 *
 * This screen is designed to automatically handle keyboard avoidance for any number of input fields.
 * Key features:
 * - Automatic keyboard avoidance using KeyboardAwareScrollView
 * - Dynamic layout that adapts to screen size and platform
 * - Helper function (createInputProps) for consistent input creation
 * - Cross-platform optimized (iOS/Android)
 *
 * To add new input fields:
 * 1. Add the field to formData state
 * 2. Add validation to validateForm function
 * 3. Use the pattern shown in the comments below
 *
 * No manual keyboard offset adjustments needed!
 */

const EditProductScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { demoMode, showDemoAlert } = useDemoMode();
  const scrollViewRef = useRef(null);
  const { height: screenHeight } = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [formData, setFormData] = useState({
    productName: product.name ? String(product.name) : '',
    productPrice: product.price ? String(product.price) : '',
    productQty: product.qty ? String(product.qty) : '',
    product_id: product.id,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.productPrice.trim()) {
      newErrors.productPrice = 'Product price is required';
    }

    if (!formData.productQty.trim()) {
      newErrors.productQty = 'Product quantity is required';
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
      const apiUrl = `${API}products/${formData.product_id}`;

      // Prepare the data to send (excluding empty created_by if any issues)
      const requestData = {
        name: formData.productName,
        price: formData.productPrice,
        qty: formData.productQty,
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
        data.message || 'Product has been updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      console.log('product error:', error);

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
        <Text style={styles.headerTitle}>Add New Product</Text>
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
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Product Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              {...createInputProps('productName', 'Enter product name')}
            />
            {errors.productName && (
              <Text style={styles.errorText}>{errors.productName}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Product Price <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              {...createInputProps('productPrice', 'Enter product price', {
                maxLength: 15,
                transform: value => value.toUpperCase(),
              })}
            />
            {errors.productPrice && (
              <Text style={styles.errorText}>{errors.productPrice}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Product Qty <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              {...createInputProps('productQty', 'Enter product quantity', {
                keyboardType: 'numeric',
                maxLength: 10,
              })}
            />
            {errors.productQty && (
              <Text style={styles.errorText}>{errors.productQty}</Text>
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
            <Text style={styles.savePartyButtonText}>Update Product</Text>
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

export default EditProductScreen;
