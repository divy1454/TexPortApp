import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../../components/Css/StaffAttendanceScreen.styles';
import API from '../../../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Demo staff data for fallback
const demoStaff = [
  { id: 1, name: 'Ramesh Kumar', status: null },
  { id: 2, name: 'Suresh Patel', status: null },
  { id: 3, name: 'Vikash Singh', status: null },
  { id: 4, name: 'Rajesh Sharma', status: null },
  { id: 5, name: 'Amit Gupta', status: null },
  { id: 6, name: 'Priya Sharma', status: null },
  { id: 7, name: 'Ravi Kumar', status: null },
  { id: 8, name: 'Anjali Patel', status: null },
];

const StaffAttendanceScreen = ({ navigation }) => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [userId, setUserId] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    userIdGet();
  }, []);

  useEffect(() => {
    if (userId > 0) {
      fetchStaffData();
    }
  }, [userId]);

  const userIdGet = async () => {
    const userString = await AsyncStorage.getItem('user');
    const user = JSON.parse(userString);
    setUserId(user.id || 0);
  };

  const fetchStaffData = async () => {
    try {
      setLoading(true);
      setError(false);

      console.log('Fetching staff with attendance for userId:', userId);

      // Use the new endpoint that includes attendance data
      const response = await fetch(`${API}staff/attendance/${userId}?date=${currentDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Staff Attendance API Response:', data);

      // Check if the response has the expected structure
      if (data.success && data.data && Array.isArray(data.data)) {
        const staffList = data.data.map(staff => ({
          id: staff.id,
          name: staff.name,
          status: staff.status, // This will be the pre-existing attendance status
          attendance_id: staff.attendance_id
        }));

        setAttendance(staffList);
        setError(false);
        setLoading(false);
        setHasUnsavedChanges(false); // Reset unsaved changes since we just loaded data
      } else {
        // If no data or unexpected structure, throw error to use fallback
        throw new Error('No staff data found or invalid response structure');
      }
    } catch (err) {
      console.error('Error fetching staff data:', err);
      setAttendance(demoStaff);
      setError(true);
      setLoading(false);
    }
  };

  const setAttendanceStatus = (id, status) => {
    setAttendance(prevAttendance =>
      prevAttendance.map(staff =>
        staff.id === id ? { ...staff, status } : staff,
      ),
    );
    setHasUnsavedChanges(true);
  };

  const handleSaveAttendance = () => {
    const attendanceData = attendance.map(staff => ({
      staffId: staff.id,
      staffName: staff.name,
      status: staff.status || 'absent',
      date: new Date().toISOString().split('T')[0],
      created_by: userId,
    }));

    // Check if all attendance is marked
    const unmarkedStaff = attendance.filter(staff => !staff.status);

    if (unmarkedStaff.length > 0) {
      Alert.alert(
        'Incomplete Attendance',
        `Please mark attendance for all staff members. ${unmarkedStaff.length} staff member(s) not marked.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Save Anyway',
            onPress: () => saveAttendance(attendanceData),
            style: 'destructive',
          },
        ],
      );
    } else {
      saveAttendance(attendanceData);
    }
  };

  const saveAttendance = async (attendanceData) => {
    try {
      setSaving(true);
      
      // Prepare data for API
      const requestData = {
        attendance_data: attendanceData.map(item => ({
          staff_id: item.staffId,
          status: item.status === 'not_marked' ? 'absent' : item.status
        })),
        created_by: userId,
        date: currentDate
      };

      console.log('Sending attendance data to API:', requestData);

      const response = await fetch(`${API}staff/attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Save attendance response:', result);

      if (result.success) {
        setSaving(false);
        Alert.alert('Success', 'Attendance has been saved successfully!', [
          {
            text: 'OK',
            onPress: () => {
              setHasUnsavedChanges(false);
              // Refresh data to show updated attendance
              fetchStaffData();
            },
          },
        ]);
      } else {
        throw new Error(result.message || 'Failed to save attendance');
      }
    } catch (error) {
      setSaving(false);
      console.error('Error saving attendance:', error);
      Alert.alert(
        'Error',
        `Failed to save attendance: ${error.message}`,
        [
          { text: 'OK' },
          { 
            text: 'Retry', 
            onPress: () => saveAttendance(attendanceData) 
          }
        ]
      );
    }
  };

  const handleBackPress = () => {
    if (hasUnsavedChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to go back?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Discard',
            onPress: () => navigation.goBack(),
            style: 'destructive',
          },
        ],
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#6366F1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Record Attendance</Text>
        <Text style={styles.dateText}>{new Date(currentDate).toLocaleDateString('en-IN', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        })}</Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Icon name="warning" size={20} color="#EF4444" />
          <Text style={styles.errorText}>
            Staff not fetch from the back-end. please try again later.
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading staff data...</Text>
            </View>
          ) : attendance.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="people-outline" size={64} color="#9CA3AF" />
              <Text style={styles.emptyText}>No staff members found</Text>
            </View>
          ) : (
            attendance.map(staff => (
              <View key={staff.id} style={styles.staffRow}>
                <View style={styles.staffInfo}>
                  <Text style={styles.staffName}>{staff.name}</Text>
                  <Text style={styles.staffId}>ID: {staff.id}</Text>
                </View>
                <View style={styles.attendanceButtons}>
                  <TouchableOpacity
                    style={[
                      styles.attendanceButton,
                      styles.presentButton,
                      staff.status === 'present' &&
                        styles.selectedPresentButton,
                    ]}
                    onPress={() => setAttendanceStatus(staff.id, 'present')}
                    activeOpacity={0.7}
                  >
                    <Icon
                      name="check-circle"
                      size={18}
                      color={staff.status === 'present' ? '#FFFFFF' : '#059669'}
                    />
                    <Text
                      style={[
                        styles.presentText,
                        staff.status === 'present' &&
                          styles.selectedPresentText,
                      ]}
                    >
                      Present
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.attendanceButton,
                      styles.absentButton,
                      staff.status === 'absent' && styles.selectedAbsentButton,
                    ]}
                    onPress={() => setAttendanceStatus(staff.id, 'absent')}
                    activeOpacity={0.7}
                  >
                    <Icon
                      name="cancel"
                      size={18}
                      color={staff.status === 'absent' ? '#FFFFFF' : '#DC2626'}
                    />
                    <Text
                      style={[
                        styles.absentText,
                        staff.status === 'absent' && styles.selectedAbsentText,
                      ]}
                    >
                      Absent
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {!loading && attendance.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.savingButton]}
            onPress={handleSaveAttendance}
            activeOpacity={0.8}
            disabled={saving}
          >
            <Icon 
              name={saving ? "hourglass-empty" : "save"} 
              size={20} 
              color="#FFFFFF" 
            />
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving...' : 'Save Attendance'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default StaffAttendanceScreen;
