
import React, { useState, useRef, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const StaffModal = ({ visible, mode, formData, setFormData, onSubmit, onCancel, staff, demoMode }) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Helper for input props
  const createInputProps = (field, placeholder, options = {}) => ({
    value: formData[field],
    onChangeText: value => setFormData(prev => ({ ...prev, [field]: value })),
    placeholder,
    style: [styles.input, errors[field] && styles.inputError],
    ...options,
    editable: !demoMode,
  });

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim() === '') newErrors.name = 'Name is required';
    if (!formData.role || formData.role.trim() === '') newErrors.role = 'Role is required';
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (demoMode) return;
    if (!validateForm()) return;
    setIsLoading(true);
    onSubmit();
    setIsLoading(false);
  };

  useEffect(() => {
    if (visible) setErrors({});
  }, [visible]);

  // Auto ID display
  const autoId = formData.id ? `STF-${formData.id}` : 'Auto';

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <KeyboardAwareScrollView
          style={styles.keyboardAvoidingView}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={styles.content}>
            <Text style={styles.header}>{mode === 'add' ? 'Add Staff' : 'Edit Staff'}</Text>
            <View style={styles.autoIdContainer}>
              <Text style={styles.autoIdLabel}>Staff ID</Text>
              <Text style={styles.autoIdValue}>{autoId}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
              <TextInput {...createInputProps('name', 'Enter staff name')} />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Role <Text style={styles.required}>*</Text></Text>
              <TextInput {...createInputProps('role', 'Enter role (e.g. Machine Operator)')} />
              {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput {...createInputProps('email', 'Email (optional)', { keyboardType: 'email-address' })} />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Machine</Text>
              <TextInput {...createInputProps('machine', 'Machine ID (optional)')} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Hours Today</Text>
              <TextInput {...createInputProps('hoursToday', 'Hours worked today', { keyboardType: 'numeric' })} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Hourly Rate</Text>
              <TextInput {...createInputProps('hourlyRate', 'Hourly rate', { keyboardType: 'numeric' })} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Meters Today</Text>
              <TextInput {...createInputProps('metersToday', 'Meters calculated today', { keyboardType: 'numeric' })} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Meter Rate</Text>
              <TextInput {...createInputProps('meterRate', 'Meter rate', { keyboardType: 'numeric' })} />
            </View>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.actionBtn, demoMode && styles.disabledButton]} onPress={handleSave} disabled={isLoading || demoMode}>
                <Text style={styles.actionBtnText}>{mode === 'add' ? 'Add Staff' : 'Save Changes'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            {demoMode && (
              <Text style={{ color: '#6366F1', marginTop: 12, textAlign: 'center' }}>
                Demo mode: changes will not be saved.
              </Text>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  required: {
    color: '#EF4444',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
    // Removed justifyContent and alignItems to avoid ScrollView warning
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 16,
    textAlign: 'center',
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
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  scrollArea: {
    width: '100%',
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 12,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    flex: 1,
    marginBottom: 0,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 1,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 1,
  },
  cancelBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
    marginLeft: 4,
  },
});

export default StaffModal;
