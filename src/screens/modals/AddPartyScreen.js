import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddPartyScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    partyName: '',
    gstNumber: '',
    location: '',
    creditLimit: '',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

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
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      Alert.alert(
        'Success!',
        `Party "${formData.partyName}" has been added successfully with ID: PTY-004`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>➕ Add New Party</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.autoIdContainer}>
          <Text style={styles.autoIdLabel}>🆔 Auto-Generated Party ID</Text>
          <Text style={styles.autoIdValue}>PTY-004</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Party Name *</Text>
          <TextInput
            style={[styles.formInput, errors.partyName && styles.formInputError]}
            placeholder="Enter party name"
            placeholderTextColor="#9CA3AF"
            value={formData.partyName}
            onChangeText={(value) => updateFormData('partyName', value)}
          />
          {errors.partyName && <Text style={styles.errorText}>{errors.partyName}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>GST Number *</Text>
          <TextInput
            style={[styles.formInput, errors.gstNumber && styles.formInputError]}
            placeholder="24ABCDE1234F1Z5"
            placeholderTextColor="#9CA3AF"
            value={formData.gstNumber}
            onChangeText={(value) => updateFormData('gstNumber', value.toUpperCase())}
            maxLength={15}
          />
          {errors.gstNumber && <Text style={styles.errorText}>{errors.gstNumber}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Location *</Text>
          <TextInput
            style={[styles.formInput, errors.location && styles.formInputError]}
            placeholder="City, State"
            placeholderTextColor="#9CA3AF"
            value={formData.location}
            onChangeText={(value) => updateFormData('location', value)}
          />
          {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Contact Person</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Enter contact person name"
            placeholderTextColor="#9CA3AF"
            value={formData.contactPerson}
            onChangeText={(value) => updateFormData('contactPerson', value)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Phone Number</Text>
          <TextInput
            style={[styles.formInput, errors.phoneNumber && styles.formInputError]}
            placeholder="Enter 10-digit phone number"
            placeholderTextColor="#9CA3AF"
            value={formData.phoneNumber}
            onChangeText={(value) => updateFormData('phoneNumber', value)}
            keyboardType="numeric"
            maxLength={10}
          />
          {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Email</Text>
          <TextInput
            style={[styles.formInput, errors.email && styles.formInputError]}
            placeholder="Enter email address"
            placeholderTextColor="#9CA3AF"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Credit Limit</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Enter credit limit amount"
            placeholderTextColor="#9CA3AF"
            value={formData.creditLimit}
            onChangeText={(value) => updateFormData('creditLimit', value)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Address</Text>
          <TextInput
            style={[styles.formInput, styles.textArea]}
            placeholder="Enter complete address"
            placeholderTextColor="#9CA3AF"
            value={formData.address}
            onChangeText={(value) => updateFormData('address', value)}
            multiline={true}
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.savePartyButton} onPress={handleSave}>
          <Text style={styles.savePartyButtonText}>Save Party</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
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
    marginBottom: 16,
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
  },
  formInputError: {
    borderColor: '#EF4444',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
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
  savePartyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPartyScreen;