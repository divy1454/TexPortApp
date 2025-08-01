import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    gstNumber: '',
    location: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (formData.gstNumber && formData.gstNumber.length !== 15) {
      newErrors.gstNumber = 'GST number must be 15 characters';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!acceptedTerms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      // axios call to register the user
      setIsLoading(true);
      try {
        const response = await fetch('http://10.131.152.6:8000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          Alert.alert('Success', 'Account created successfully!');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', data.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        Alert.alert('Error', 'Network error. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

    // Check if user is already logged in
  const checkLoginStatus = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      navigation.navigate('Main');
    }
  };
  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <LinearGradient colors={['#10B981', '#059669']} style={styles.headerGradient}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.appIcon}>🏭</Text>
            <Text style={styles.appName}>Join TextilePro</Text>
            <Text style={styles.appTagline}>Start managing your textile business today</Text>
          </LinearGradient>

          {/* Registration Form */}
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Create Your Account 🚀</Text>
              <Text style={styles.formSubtitle}>Fill in your business details to get started</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Business Name *</Text>
              <View style={styles.inputContainer}>
                <Icon name="business" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={[styles.formInput, errors.businessName && styles.formInputError]}
                  placeholder="Enter your business name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.businessName}
                  onChangeText={(value) => updateFormData('businessName', value)}
                />
              </View>
              {errors.businessName && <Text style={styles.errorText}>{errors.businessName}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Owner Name *</Text>
              <View style={styles.inputContainer}>
                <Icon name="person" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={[styles.formInput, errors.ownerName && styles.formInputError]}
                  placeholder="Enter owner's full name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.ownerName}
                  onChangeText={(value) => updateFormData('ownerName', value)}
                />
              </View>
              {errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email Address *</Text>
              <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={[styles.formInput, errors.email && styles.formInputError]}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Phone Number *</Text>
              <View style={styles.inputContainer}>
                <Icon name="phone" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={[styles.formInput, errors.phone && styles.formInputError]}
                  placeholder="Enter 10-digit phone number"
                  placeholderTextColor="#9CA3AF"
                  value={formData.phone}
                  onChangeText={(value) => updateFormData('phone', value)}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>GST Number (Optional)</Text>
              <View style={styles.inputContainer}>
                <Icon name="receipt" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={[styles.formInput, errors.gstNumber && styles.formInputError]}
                  placeholder="24ABCDE1234F1Z5"
                  placeholderTextColor="#9CA3AF"
                  value={formData.gstNumber}
                  onChangeText={(value) => updateFormData('gstNumber', value.toUpperCase())}
                  maxLength={15}
                />
              </View>
              {errors.gstNumber && <Text style={styles.errorText}>{errors.gstNumber}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Business Location *</Text>
              <View style={styles.inputContainer}>
                <Icon name="location-on" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={[styles.formInput, errors.location && styles.formInputError]}
                  placeholder="City, State"
                  placeholderTextColor="#9CA3AF"
                  value={formData.location}
                  onChangeText={(value) => updateFormData('location', value)}
                />
              </View>
              {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Password *</Text>
              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={[styles.formInput, errors.password && styles.formInputError]}
                  placeholder="Create a strong password"
                  placeholderTextColor="#9CA3AF"
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon 
                    name={showPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color="#9CA3AF" 
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Confirm Password *</Text>
              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={[styles.formInput, errors.confirmPassword && styles.formInputError]}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormData('confirmPassword', value)}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity 
                  style={styles.passwordToggle}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon 
                    name={showConfirmPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color="#9CA3AF" 
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            <TouchableOpacity 
              style={styles.termsContainer}
              onPress={() => {
                setAcceptedTerms(!acceptedTerms);
                if (errors.terms) {
                  setErrors(prev => ({ ...prev, terms: null }));
                }
              }}
            >
              <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                {acceptedTerms && <Icon name="check" size={16} color="white" />}
              </View>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

            <TouchableOpacity 
              style={[styles.registerButton, isLoading && styles.registerButtonDisabled]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              <LinearGradient colors={['#10B981', '#059669']} style={styles.registerButtonGradient}>
                {isLoading ? (
                  <Text style={styles.registerButtonText}>🔄 Creating Account...</Text>
                ) : (
                  <Text style={styles.registerButtonText}>🎉 Create Account</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.loginPrompt}>
              <Text style={styles.loginPromptText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  appIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  appName: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  appTagline: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: -20,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
  },
  inputIcon: {
    marginLeft: 16,
    marginRight: 12,
  },
  formInput: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  formInputError: {
    borderColor: '#EF4444',
  },
  passwordToggle: {
    padding: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  termsLink: {
    color: '#10B981',
    fontWeight: '600',
  },
  registerButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPromptText: {
    color: '#6B7280',
    fontSize: 16,
  },
  loginLink: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;