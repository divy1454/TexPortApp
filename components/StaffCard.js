import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDemoMode } from '../src/context/DemoContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API from '../config/apiConfig';
import EditStaffModal from './EditStaffModal';
import styles from './Css/StaffCard.styles';

const StaffCard = ({ worker, navigation, onStaffDeleted, onStaffUpdated }) => {
  const { demoMode, showDemoAlert } = useDemoMode();
  const [showEditModal, setShowEditModal] = useState(false);

  // Handle different data structures (API vs static data)
  const staffData = {
    id: worker.id,
    name: worker.name,
    phone: worker.phone || 'N/A',
    email: worker.email || 'N/A',
    designation: worker.designation || worker.role || 'Staff',
    salary_type: worker.salary_type || worker.salaryType || 'hourly',
    salary_amount: worker.salary_amount || worker.salaryAmount || 0,
    created_by: worker.created_by || worker.createdBy,
    // Legacy fields for backward compatibility
    role: worker.role || worker.designation || 'Staff',
    hourlyRate: worker.hourlyRate || worker.hourly_rate || 0,
    meterRate: worker.meterRate || worker.meter_rate || 0,
    hoursToday: worker.hoursToday || worker.hours_today || 0,
    metersToday: worker.metersToday || worker.meters_today || 0,
    machine: worker.machine || 'N/A',
    status: worker.status || 'active',
  };

  // Handle edit action
  const handleEdit = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      setShowEditModal(true);
    }
  };

  // Handle staff update
  const handleStaffUpdate = (updatedStaff) => {
    if (onStaffUpdated) {
      onStaffUpdated(updatedStaff);
    }
    setShowEditModal(false);
  };

  // Handle delete action
  const handleDelete = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      Alert.alert(
        'Confirm Delete',
        `Are you sure you want to delete ${staffData.name}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                const response = await fetch(`${API}staff/${staffData.id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                Alert.alert('Success', 'Staff member deleted successfully');
                
                // Call the callback to refresh the parent component
                if (onStaffDeleted) {
                  onStaffDeleted(staffData.id);
                }
              } catch (error) {
                console.error('Error deleting staff:', error);
                Alert.alert('Error', 'Failed to delete staff member. Please try again.');
              }
            },
          },
        ],
      );
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case 'present':
        return '#10B981';
      case 'absent':
        return '#EF4444';
      case 'late':
        return '#F59E0B';
      case 'active':
        return '#10B981';
      case 'inactive':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = status => {
    switch (status) {
      case 'present':
        return '✅';
      case 'absent':
        return '❌';
      case 'late':
        return '⏰';
      case 'active':
        return '✅';
      case 'inactive':
        return '❌';
      default:
        return '❓';
    }
  };

  const getSalaryDisplay = (staffData) => {
    const amount = staffData.salary_amount || 0;
    const type = staffData.salary_type || 'hourly';
    
    switch (type.toLowerCase()) {
      case 'monthly':
        return `₹${amount.toLocaleString()}/month`;
      case 'daily':
        return `₹${amount.toLocaleString()}/day`;
      case 'hourly':
        return `₹${amount.toLocaleString()}/hour`;
      case 'fixed':
        return `₹${amount.toLocaleString()} (Fixed)`;
      default:
        return `₹${amount.toLocaleString()}`;
    }
  };

  const calculateEarnings = (worker) => {
    // Legacy calculation for backward compatibility
    if (worker.role === 'Machine Operator' && worker.hoursToday && worker.hourlyRate) {
      return worker.hoursToday * worker.hourlyRate;
    } else if (worker.role === 'Meter Calculator' && worker.metersToday && worker.meterRate) {
      return worker.metersToday * worker.meterRate;
    }
    return 0;
  };

  return (
    <View style={styles.staffCard}>
      <View style={styles.staffHeader}>
        <View>
          <Text style={styles.staffName}>{staffData.name}</Text>
          <Text style={styles.staffId}>ID: STF-{staffData.id}</Text>
          <Text style={styles.staffRole}>
            <Icon name="work" size={16} color="#6B7280" />{' '}
            {staffData.designation}
          </Text>
          {staffData.phone !== 'N/A' && (
            <Text style={styles.staffContact}>
              <Icon name="phone" size={16} color="#6366F1" />{' '}
              {staffData.phone}
            </Text>
          )}
        </View>
        <View style={styles.staffRight}>
          <Text style={styles.staffSalary}>
            {getSalaryDisplay(staffData)}
          </Text>
          <Text style={styles.staffSalaryLabel}>Salary</Text>
        </View>
      </View>
      
      {/* Contact Information */}
      <View style={styles.staffDetails}>
        {staffData.email !== 'N/A' && (
          <Text style={styles.staffEmail}>
            <Icon name="email" size={16} color="#6B7280" />{' '}
            {staffData.email}
          </Text>
        )}
      </View>

      <View style={styles.staffFooter}>
        <Text style={styles.staffStatus}>
          Status: {getStatusIcon(staffData.status)} {staffData.status}
        </Text>
        <View style={styles.staffActions}>
          <TouchableOpacity
            style={styles.staffActionButton}
            onPress={handleEdit}
          >
            <Text style={styles.staffActionButtonText}>
              <Icon name="edit" size={16} color="#6366F1" /> Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.staffActionButton}
            onPress={handleDelete}
          >
            <Text style={styles.staffActionButtonText}>
              <Icon name="delete" size={16} color="#EF4444" /> Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Modal */}
      <EditStaffModal
        visible={showEditModal}
        staff={staffData}
        onClose={() => setShowEditModal(false)}
        onStaffUpdated={handleStaffUpdate}
      />
    </View>
  );
};

export default StaffCard;
