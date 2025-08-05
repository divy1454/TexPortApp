import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DeleteStaffModal = ({ visible, staff, onDelete, onCancel }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (!selectedStaffId) {
      // Show error inside modal
      setShowConfirm(false);
      return;
    }
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(selectedStaffId);
    setSelectedStaffId(null);
    setShowConfirm(false);
  };

  const staffOptions = staff.map(s => ({ label: s.name, value: s.id }));

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Delete Staff</Text>
          {!showConfirm ? (
            <>
              <View style={styles.inputContainer}>
                <Icon name="person-remove" size={20} color="#EF4444" style={styles.inputIcon} />
                <DropDownPicker
                  open={dropdownOpen}
                  value={selectedStaffId}
                  items={staffOptions}
                  setOpen={setDropdownOpen}
                  setValue={setSelectedStaffId}
                  style={styles.picker}
                  dropDownContainerStyle={styles.dropdown}
                  placeholder="Select Staff to Delete"
                  zIndex={100}
                />
              </View>
              {!selectedStaffId && (
                <Text style={{ color: '#EF4444', marginBottom: 8, textAlign: 'center' }}>
                  Please select a staff member to delete.
                </Text>
              )}
              <View style={styles.actionsRow}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#EF4444' }]} onPress={handleDelete}>
                  <Text style={styles.actionBtnText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => {
                  setSelectedStaffId(null);
                  setShowConfirm(false);
                  onCancel();
                }}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={{ color: '#EF4444', fontWeight: 'bold', fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
                Are you sure you want to delete this staff member?
              </Text>
              <View style={styles.actionsRow}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#EF4444' }]} onPress={confirmDelete}>
                  <Text style={styles.actionBtnText}>Confirm Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowConfirm(false)}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    elevation: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 18,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  inputIcon: {
    marginRight: 8,
  },
  picker: {
    flex: 1,
    minHeight: 44,
    borderColor: '#EF4444',
  },
  dropdown: {
    borderColor: '#EF4444',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#EF4444',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DeleteStaffModal;
