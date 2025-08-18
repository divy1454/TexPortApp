import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import API from '../config/apiConfig';
import styles from './Css/EditStaffModal.styles';

const EditStaffModal = ({ visible, staff, onClose, onStaffUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    designation: '',
    salary_type: 'monthly',
    salary_amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form when staff data changes
  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || '',
        phone: staff.phone || '',
        email: staff.email || '',
        designation: staff.designation || '',
        salary_type: staff.salary_type || 'monthly',
        salary_amount: staff.salary_amount?.toString() || '',
      });
      setErrors({});
    }
  }, [staff]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.salary_amount.trim()) {
      newErrors.salary_amount = 'Salary amount is required';
    } else if (isNaN(formData.salary_amount) || parseFloat(formData.salary_amount) <= 0) {
      newErrors.salary_amount = 'Please enter a valid salary amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}staff/${staff.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          salary_amount: parseFloat(formData.salary_amount),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        Alert.alert('Success', 'Staff member updated successfully');
        onStaffUpdated(result.data);
        onClose();
      } else {
        throw new Error(result.message || 'Failed to update staff member');
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      Alert.alert('Error', 'Failed to update staff member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      designation: '',
      salary_type: 'monthly',
      salary_amount: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Icon name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Staff Member</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Name Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter full name"
              placeholderTextColor="#9CA3AF"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Phone Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholder="Enter phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* Email Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Enter email address"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Designation Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Designation *</Text>
            <TextInput
              style={[styles.input, errors.designation && styles.inputError]}
              value={formData.designation}
              onChangeText={(text) => setFormData({ ...formData, designation: text })}
              placeholder="Enter designation"
              placeholderTextColor="#9CA3AF"
            />
            {errors.designation && <Text style={styles.errorText}>{errors.designation}</Text>}
          </View>

          {/* Salary Type Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Salary Type *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.salary_type}
                onValueChange={(value) => setFormData({ ...formData, salary_type: value })}
                style={styles.picker}
              >
                <Picker.Item label="Monthly" value="monthly" />
                <Picker.Item label="Daily" value="daily" />
                <Picker.Item label="Hourly" value="hourly" />
                <Picker.Item label="Fixed" value="fixed" />
              </Picker>
            </View>
          </View>

          {/* Salary Amount Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Salary Amount *</Text>
            <TextInput
              style={[styles.input, errors.salary_amount && styles.inputError]}
              value={formData.salary_amount}
              onChangeText={(text) => setFormData({ ...formData, salary_amount: text })}
              placeholder="Enter salary amount"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
            {errors.salary_amount && <Text style={styles.errorText}>{errors.salary_amount}</Text>}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={[styles.submitButtonText, loading && styles.submitButtonTextDisabled]}>
              {loading ? 'Updating...' : 'Update Staff'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditStaffModal;
