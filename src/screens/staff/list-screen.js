import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StaffCard from '../../../components/StaffCard';
import Header from '../../../components/Header';
import DemoBanner from '../../../components/DemoBanner';
import { useDemoMode } from '../../context/DemoContext';
import StaffModal from './staff-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StaffScreen = ({ navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Ramesh Kumar',
      role: 'Machine Operator',
      machine: 'M-001',
      hoursToday: 8.5,
      hourlyRate: 100,
      status: 'present'
    },
    {
      id: 2,
      name: 'Suresh Patel',
      role: 'Machine Operator',
      machine: 'M-002',
      hoursToday: 7.2,
      hourlyRate: 100,
      status: 'present'
    },
    {
      id: 3,
      name: 'Vikash Singh',
      role: 'Machine Operator',
      machine: 'M-003',
      hoursToday: 0,
      hourlyRate: 100,
      status: 'absent'
    },
    {
      id: 4,
      name: 'Rajesh Sharma',
      role: 'Meter Calculator',
      metersToday: 2450,
      meterRate: 0.5,
      status: 'present'
    },
    {
      id: 5,
      name: 'Amit Gupta',
      role: 'Meter Calculator',
      metersToday: 1890,
      meterRate: 0.5,
      status: 'present'
    }
  ]);

  // Modal state for Add/Edit
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    role: 'Machine Operator',
    machine: '',
    hoursToday: '',
    hourlyRate: '',
    metersToday: '',
    meterRate: '',
    status: 'present',
  });

  // Open Add Staff Modal
  const openAddModal = () => {
    setFormData({
      id: null,
      name: '',
      role: 'Machine Operator',
      machine: '',
      hoursToday: '',
      hourlyRate: '',
      metersToday: '',
      meterRate: '',
      status: 'present',
    });
    setModalMode('add');
    setModalVisible(true);
  };

  // Open Edit Staff Modal
  const openEditModal = (staffObj) => {
    setFormData({ ...staffObj });
    setModalMode('edit');
    setModalVisible(true);
  };

  // Handle Add/Edit Submit
  const handleModalSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Name is required.');
      return;
    }
    if (modalMode === 'add') {
      const newId = staff.length ? staff[staff.length - 1].id + 1 : 1;
      setStaff([...staff, { ...formData, id: newId }]);
    } else {
      setStaff(staff.map(s => s.id === formData.id ? { ...formData } : s));
    }
    setModalVisible(false);
  };

  // Delete Staff
  const handleDeleteStaff = (id) => {
    Alert.alert(
      'Delete Staff',
      'Are you sure you want to delete this staff member?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setStaff(staff.filter(s => s.id !== id)) }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <DemoBanner navigation={navigation} />
      <ScrollView style={styles.content}>
        {/* Header with Attendance Button */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Staff Management</Text>
          <TouchableOpacity 
            style={styles.attendanceButton} 
            onPress={() => demoMode ? showDemoAlert() : navigation.navigate('Attendance')}
          >
            <Text style={styles.attendanceButtonText}>📝 Attendance</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Summary */}
        <LinearGradient
          colors={['#3B82F6', '#6366F1']}
          style={styles.summaryCard}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.summaryTitle}>📅 Today's Summary</Text>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>18</Text>
              <Text style={styles.summaryStatLabel}>Present</Text>
            </View>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>3</Text>
              <Text style={styles.summaryStatLabel}>Absent</Text>
            </View>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>3</Text>
              <Text style={styles.summaryStatLabel}>Late</Text>
            </View>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#F59E0B', '#FCD34D']}
          style={styles.actionBar}
        >
          <View style={styles.actionBarRow}>
            <TouchableOpacity style={styles.actionBarBtn} onPress={openAddModal}>
              <Icon name="person-add" size={20} color="#fff" />
              <Text style={styles.actionBarBtnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBarBtn} onPress={() => staff.length > 0 && openEditModal(staff[0])}>
              <Icon name="edit" size={20} color="#fff" />
              <Text style={styles.actionBarBtnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBarBtn} onPress={() => staff.length > 0 && handleDeleteStaff(staff[0].id)}>
              <Icon name="delete" size={20} color="#fff" />
              <Text style={styles.actionBarBtnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Machine Operators */}
        <Text style={styles.subsectionTitle}>🏭 Machine Operators (14 Machines)</Text>
        {staff.filter(s => s.role === 'Machine Operator').map((worker) => (
          <View key={worker.id} style={{ marginBottom: 8 }}>
            <StaffCard worker={worker} />
          </View>
        ))}

        {/* Meter Calculation Staff */}
        <Text style={styles.subsectionTitle}>📏 Meter Calculation Staff</Text>
        {staff.filter(s => s.role === 'Meter Calculator').map((worker) => (
          <View key={worker.id} style={{ marginBottom: 8 }}>
            <StaffCard worker={worker} />
          </View>
        ))}

        {/* Modal for Add/Edit Staff */}
        <StaffModal
          visible={modalVisible}
          mode={modalMode}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleModalSubmit}
          onCancel={() => setModalVisible(false)}
          staff={staff}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionBar: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    marginTop: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  actionBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 350,
    gap: 0,
  },
  actionBarBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.35)',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  actionBarBtnText: {
    color: '#1F2937',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 0,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  screenHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  attendanceButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  attendanceButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  summaryCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  summaryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStatItem: {
    alignItems: 'center',
  },
  summaryStatValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  summaryStatLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  viewAllButton: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  viewAllButtonText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  editBtn: {
    backgroundColor: '#6366F1',
    padding: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
    padding: 6,
    borderRadius: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionBtnText: {
    color: '#2563EB',
    fontWeight: '600',
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  modalBtn: {
    flex: 1,
    backgroundColor: '#6366F1',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  modalBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StaffScreen;