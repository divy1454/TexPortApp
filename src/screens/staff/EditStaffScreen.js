import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API from '../../../config/apiConfig';
import styles from '../../../components/Css/AddStaffScreen.styles';

const EditStaffScreen = ({ navigation, route }) => {
  const { staffId } = route.params;
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    designation: '',
    salary_type: 'monthly',
    salary_amount: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);

  // Get current user ID from AsyncStorage
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userIdFromStorage = await AsyncStorage.getItem('userId');
        setUserId(userIdFromStorage || '1'); // fallback to '1' if not found
      } catch (error) {
        console.error('Error getting user ID:', error);
        setUserId('1'); // fallback
      }
    };
    getCurrentUser();
  }, []);

  // Fetch staff details
  useEffect(() => {
    if (staffId && userId) {
      fetchStaffDetails();
    }
  }, [staffId, userId]);

  const fetchStaffDetails = async () => {
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API}staff/${staffId}?created_by=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const staffData = result.data;
        setForm({
          name: staffData.name || '',
          phone: staffData.phone || '',
          email: staffData.email || '',
          designation: staffData.designation || '',
          salary_type: staffData.salary_type || 'monthly',
          salary_amount: staffData.salary_amount ? staffData.salary_amount.toString() : '',
        });
      } else {
        throw new Error(result.message || 'Failed to fetch staff details');
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
      Alert.alert(
        'Error',
        'Failed to load staff details. Please try again.',
        [
          { text: 'Retry', onPress: fetchStaffDetails },
          { text: 'Go Back', onPress: () => navigation.goBack() },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm(prevForm => ({ ...prevForm, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
      if (!phoneRegex.test(form.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    // Email validation (optional but must be valid if provided)
    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Designation validation
    if (!form.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    // Salary amount validation
    if (!form.salary_amount.trim()) {
      newErrors.salary_amount = 'Salary amount is required';
    } else {
      const amount = parseFloat(form.salary_amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.salary_amount = 'Please enter a valid salary amount';
      } else if (amount > 10000000) {
        newErrors.salary_amount = 'Salary amount seems too high';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API}staff/${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...form,
          salary_amount: parseFloat(form.salary_amount),
          created_by: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        Alert.alert(
          'Success',
          'Staff member updated successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        throw new Error(result.message || 'Failed to update staff member');
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      Alert.alert(
        'Error',
        'Failed to update staff member. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Continue Editing', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#6366F1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Staff</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={[styles.contentContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={[styles.formLabel, { marginTop: 16, textAlign: 'center' }]}>
            Loading staff details...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#6366F1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Staff</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Name Field */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Full Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.formInput, errors.name && styles.formInputError]}
              value={form.name}
              onChangeText={(value) => handleChange('name', value)}
              placeholder="Enter full name"
              placeholderTextColor="#9CA3AF"
              editable={!saving}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Phone Field */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.formInput, errors.phone && styles.formInputError]}
              value={form.phone}
              onChangeText={(value) => handleChange('phone', value)}
              placeholder="Enter phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              editable={!saving}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* Email Field */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email Address</Text>
            <TextInput
              style={[styles.formInput, errors.email && styles.formInputError]}
              value={form.email}
              onChangeText={(value) => handleChange('email', value)}
              placeholder="Enter email address (optional)"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!saving}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Designation Field */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Designation <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.formInput, errors.designation && styles.formInputError]}
              value={form.designation}
              onChangeText={(value) => handleChange('designation', value)}
              placeholder="Enter job title/designation"
              placeholderTextColor="#9CA3AF"
              editable={!saving}
            />
            {errors.designation && <Text style={styles.errorText}>{errors.designation}</Text>}
          </View>

          {/* Salary Type Field */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Salary Type <Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.pickerContainer, errors.salary_type && styles.formInputError]}>
              <Picker
                selectedValue={form.salary_type}
                onValueChange={(value) => handleChange('salary_type', value)}
                style={styles.picker}
                enabled={!saving}
              >
                <Picker.Item label="Monthly" value="monthly" />
                <Picker.Item label="Daily" value="daily" />
                <Picker.Item label="Hourly" value="hourly" />
                <Picker.Item label="Fixed" value="fixed" />
              </Picker>
            </View>
            {errors.salary_type && <Text style={styles.errorText}>{errors.salary_type}</Text>}
          </View>

          {/* Salary Amount Field */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Salary Amount <Text style={styles.required}>*</Text>
              <Text style={styles.salaryHint}>
                {form.salary_type === 'monthly' ? ' (Per Month)' :
                 form.salary_type === 'daily' ? ' (Per Day)' :
                 form.salary_type === 'hourly' ? ' (Per Hour)' : ' (Fixed Amount)'}
              </Text>
            </Text>
            <TextInput
              style={[styles.formInput, errors.salary_amount && styles.formInputError]}
              value={form.salary_amount}
              onChangeText={(value) => handleChange('salary_amount', value)}
              placeholder="Enter salary amount"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              editable={!saving}
            />
            {errors.salary_amount && <Text style={styles.errorText}>{errors.salary_amount}</Text>}
          </View>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={saving}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveStaffButton, saving && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={saving}
          >
            {saving ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size="small" color="white" />
                <Text style={[styles.saveStaffButtonText, { marginLeft: 8 }]}>Updating...</Text>
              </View>
            ) : (
              <>
                <Icon name="save" size={20} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.saveStaffButtonText}>Update Staff</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditStaffScreen;
