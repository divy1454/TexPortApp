import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StaffModal = ({ visible, mode, formData, setFormData, onSubmit, onCancel, staff }) => {
  // Dropdown open states
  const [roleOpen, setRoleOpen] = React.useState(false);
  const [shiftOpen, setShiftOpen] = React.useState(false);
  const [departmentOpen, setDepartmentOpen] = React.useState(false);
  const [salaryTypeOpen, setSalaryTypeOpen] = React.useState(false);
  // For edit mode: select staff member by role
  const staffOptions = mode === 'edit' ? staff.filter(s => s.role === formData.role) : [];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.contentScrollable}>
          <LinearGradient colors={["#6366F1", "#8B5CF6"]} style={styles.header}>
            <Text style={styles.headerText}>{mode === 'add' ? 'Add Staff Member' : mode === 'edit' ? 'Edit Staff Member' : 'Delete Staff Member'}</Text>
          </LinearGradient>
          <View style={{ width: '100%', paddingHorizontal: 20, paddingBottom: 24 }}>
            {/* Modal Content Starts */}
            {/* ...existing code... */}
            {/* Edit Staff Picker */}
            {mode === 'edit' && staffOptions.length > 0 && (
              <View style={styles.inputContainer}>
                <Icon name="person-search" size={20} color="#6366F1" style={styles.inputIcon} />
                <DropDownPicker
                  open={departmentOpen}
                  value={formData.id}
                  items={staffOptions.map(s => ({ label: s.name, value: s.id }))}
                  setOpen={setDepartmentOpen}
                  setValue={val => {
                    const selected = staffOptions.find(s => s.id === val());
                    if (selected) setFormData({ ...selected });
                  }}
                  style={styles.picker}
                  dropDownContainerStyle={styles.dropdown}
                  zIndex={95}
                  placeholder="Select Staff"
                />
              </View>
            )}
            {/* Name Field */}
            <View style={styles.inputContainer}>
              <Icon name="person" size={20} color="#6366F1" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={formData.name}
                onChangeText={text => setFormData({ ...formData, name: text })}
              />
            </View>
            {/* Mobile Number Field */}
            <View style={styles.inputContainer}>
              <Icon name="phone" size={20} color="#6366F1" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={formData.mobile || ''}
                onChangeText={text => setFormData({ ...formData, mobile: text })}
                keyboardType="phone-pad"
              />
            </View>
            {/* Shift Picker */}
            <View style={styles.inputContainer}>
              <Icon name="access-time" size={20} color="#6366F1" style={styles.inputIcon} />
              <DropDownPicker
                open={shiftOpen}
                value={formData.shift}
                items={[
                  { label: 'Morning', value: 'Morning' },
                  { label: 'Evening', value: 'Evening' },
                  { label: 'Night', value: 'Night' },
                ]}
                setOpen={setShiftOpen}
                setValue={val => setFormData({ ...formData, shift: val() })}
                style={styles.picker}
                dropDownContainerStyle={styles.dropdown}
                zIndex={90}
                placeholder="Shift"
              />
            </View>
            {/* Department Picker */}
            <View style={styles.inputContainer}>
              <Icon name="work" size={20} color="#6366F1" style={styles.inputIcon} />
              <DropDownPicker
                open={departmentOpen}
                value={formData.department}
                items={[ 
                  { label: 'Production', value: 'Production' },
                  { label: 'Quality', value: 'Quality' },
                  { label: 'Maintenance', value: 'Maintenance' },
                  { label: 'Packing', value: 'Packing' },
                  { label: 'Other', value: 'Other' },
                ]}
                setOpen={setDepartmentOpen}
                setValue={val => setFormData({ ...formData, department: val() })}
                style={styles.picker}
                dropDownContainerStyle={styles.dropdown}
                zIndex={80}
                placeholder="Department"
              />
            </View>
            {/* Salary Type Picker */}
            <View style={styles.inputContainer}>
              <Icon name="payments" size={20} color="#6366F1" style={styles.inputIcon} />
              <DropDownPicker
                open={salaryTypeOpen}
                value={formData.salaryType}
                items={[ 
                  { label: 'Monthly', value: 'Monthly' },
                  { label: 'Weekly', value: 'Weekly' },
                  { label: 'Daily', value: 'Daily' },
                  { label: 'Piece Rate', value: 'Piece Rate' },
                ]}
                setOpen={setSalaryTypeOpen}
                setValue={val => setFormData({ ...formData, salaryType: val() })}
                style={styles.picker}
                dropDownContainerStyle={styles.dropdown}
                zIndex={70}
                placeholder="Salary Type"
              />
            </View>
            {/* Machine Operator Fields */}
            {formData.role === 'Machine Operator' && (
              <>
                <View style={styles.inputContainer}>
                  <Icon name="build" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Machine ID"
                    value={formData.machine}
                    onChangeText={text => setFormData({ ...formData, machine: text })}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon name="timer" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Hours Today"
                    value={formData.hoursToday?.toString()}
                    onChangeText={text => setFormData({ ...formData, hoursToday: text })}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon name="attach-money" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Hourly Rate"
                    value={formData.hourlyRate?.toString()}
                    onChangeText={text => setFormData({ ...formData, hourlyRate: text })}
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}
            {/* Meter Calculator Fields */}
            {formData.role === 'Meter Calculator' && (
              <>
                <View style={styles.inputContainer}>
                  <Icon name="straighten" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Meters Today"
                    value={formData.metersToday?.toString()}
                    onChangeText={text => setFormData({ ...formData, metersToday: text })}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon name="attach-money" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Meter Rate"
                    value={formData.meterRate?.toString()}
                    onChangeText={text => setFormData({ ...formData, meterRate: text })}
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}
            {/* Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={onSubmit}>
                <Text style={styles.actionBtnText}>{mode === 'add' ? 'Add' : 'Update'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            {/* Modal Content Ends */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    fontSize: 16,
    zIndex: 100,
  },
  contentScrollable: {
    shadowRadius: 3,
    shadowOpacity: 0.15,
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    maxHeight: '90%',
    overflow: 'hidden',
    flex: 1,
  },
  scrollArea: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    // Remove maxHeight to allow full scroll
  },
  pickerContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 8,
  },
  pickerLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 4,
    marginLeft: 2,
  },
  picker: {
    width: '100%',
    color: '#1F2937',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    height: 44,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  summaryCard: {
    width: '90%',
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#6366F1',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    minWidth: 100,
  },
  actionBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 0,
    marginHorizontal: 4,
    minWidth: 100,
    flex: 1,
  },
  cancelBtnText: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingLeft: 2,
  },
  inputIcon: {
    marginRight: 12,
    alignSelf: 'center',
    minWidth: 24,
    textAlign: 'center',
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  btn: {
    flex: 1,
    backgroundColor: '#6366F1',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default StaffModal;
