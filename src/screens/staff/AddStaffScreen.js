import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../../components/Css/AddStaffScreen.styles';

const AddStaffScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    designation: '',
    salary_type: 'monthly',
    salary_amount: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.designation.trim() || !form.salary_amount.trim()) {
      setError('Name, Phone, Designation, and Salary Amount are required.');
      return;
    }
    
    // Validate phone number format
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(form.phone.replace(/[^0-9]/g, ''))) {
      setError('Please enter a valid phone number.');
      return;
    }
    
    // Validate email if provided
    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setError('Please enter a valid email address.');
        return;
      }
    }
    
    // Validate salary amount
    if (isNaN(form.salary_amount) || parseFloat(form.salary_amount) <= 0) {
      setError('Please enter a valid salary amount.');
      return;
    }
    
    // Here you would call your API to save the staff data
    console.log('Staff data to save:', form);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color="#6366F1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Staff</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Name Field */}
          <Text style={styles.label}>Name *</Text>
          <TextInput 
            style={styles.input} 
            value={form.name} 
            onChangeText={v => handleChange('name', v)} 
            placeholder="Enter full name" 
            placeholderTextColor="#9CA3AF"
          />

          {/* Phone Field */}
          <Text style={styles.label}>Phone *</Text>
          <TextInput 
            style={styles.input} 
            value={form.phone} 
            onChangeText={v => handleChange('phone', v)} 
            placeholder="Enter phone number" 
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
          />

          {/* Email Field */}
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            value={form.email} 
            onChangeText={v => handleChange('email', v)} 
            placeholder="Enter email address (optional)" 
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Designation Field */}
          <Text style={styles.label}>Designation *</Text>
          <TextInput 
            style={styles.input} 
            value={form.designation} 
            onChangeText={v => handleChange('designation', v)} 
            placeholder="Enter job title/designation" 
            placeholderTextColor="#9CA3AF"
          />

          {/* Salary Type Field */}
          <Text style={styles.label}>Salary Type *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.salary_type}
              onValueChange={(itemValue) => handleChange('salary_type', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Per Meter" value="per_meter" />
            </Picker>
          </View>

          {/* Salary Amount Field */}
          <Text style={styles.label}>
            Salary Amount * 
            <Text style={styles.salaryHint}>
              {form.salary_type === 'monthly' ? ' (Monthly)' : 
               form.salary_type === 'daily' ? ' (Per Day)' : ' (Per Meter)'}
            </Text>
          </Text>
          <TextInput 
            style={styles.input} 
            value={form.salary_amount} 
            onChangeText={v => handleChange('salary_amount', v)} 
            placeholder="Enter amount" 
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}
          
          <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
            <Icon name="save" size={20} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.saveBtnText}>Save Staff</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddStaffScreen;
