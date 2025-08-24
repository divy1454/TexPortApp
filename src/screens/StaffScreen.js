import React, { useState, useEffect, use } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import DemoBanner from '../../components/DemoBanner';
import { useDemoMode } from '../context/DemoContext';
import styles from '../../components/Css/StaffScreen.styles';
import StaffCard from '../../components/StaffCard';
import AddStaffModal from '../../components/AddStaffModal';
import API from '../../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StaffScreen = ({ navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();
  const [staff, setStaff] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState({
    total_staff: 0,
    present_count: 0,
    absent_count: 0,
    not_marked_count: 0,
    attendance_percentage: 0
  });
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [userId, setUserId] = useState(0);

  // Demo fallback data
  const staticStaff = [
    {
      id: 101,
      name: 'Demo Staff 1',
      designation: 'Machine Operator',
      phone: '+91 9876543210',
      email: 'demo1@company.com',
      salary_type: 'hourly',
      salary_amount: 120,
      status: 'active',
    },
    {
      id: 102,
      name: 'Demo Staff 2',
      designation: 'Meter Calculator',
      phone: '+91 9876543211',
      email: 'demo2@company.com',
      salary_type: 'monthly',
      salary_amount: 25000,
      status: 'active',
    },
  ];

  // Fetch staff data from API
  const fetchStaff = async () => {
    if (demoMode) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API}staff/${userId}`, {
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
      // Handle different response structures
      let staffArray = [];
      if (data.success && Array.isArray(data.data)) {
        staffArray = data.data;
      } else if (Array.isArray(data)) {
        staffArray = data;
      } else if (data.data && Array.isArray(data.data)) {
        staffArray = data.data;
      }

      setStaff(staffArray);
    } catch (error) {
      console.error('Error fetching staff:', error);
      setError('Failed to load staff data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch attendance summary from API
  const fetchAttendanceSummary = async () => {
    if (demoMode) {
      // Set demo data for attendance summary
      setAttendanceSummary({
        total_staff: staticStaff.length,
        present_count: staticStaff.filter(s => s.status === 'active').length,
        absent_count: staticStaff.filter(s => s.status === 'inactive').length,
        not_marked_count: 0,
        attendance_percentage: 100
      });
      return;
    }

    setSummaryLoading(true);

    try {
      const response = await fetch(`${API}staff/attendance-summary/${userId}`, {
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
      if (data.success && data.data) {
        setAttendanceSummary(data.data);
      }
    } catch (error) {
      console.error('Error fetching attendance summary:', error);
      // Set default values on error
      setAttendanceSummary({
        total_staff: staff.length,
        present_count: 0,
        absent_count: 0,
        not_marked_count: staff.length,
        attendance_percentage: 0
      });
    } finally {
      setSummaryLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    userIdGet();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchStaff();
      fetchAttendanceSummary();
    }
  }, [userId]);

  useEffect(() => {
    if (demoMode) {
      setStaff(staticStaff);
      fetchAttendanceSummary(); // This will set demo data
    }
  }, [demoMode]);

  const userIdGet = async () => {
    const userString = await AsyncStorage.getItem('user');
    const user = JSON.parse(userString);
    setUserId(user.id || 0);
  };

  // Handle staff deletion
  const handleStaffDeleted = deletedStaffId => {
    setStaff(prevStaff =>
      prevStaff.filter(staff => staff.id !== deletedStaffId),
    );
  };

  // Handle staff update
  const handleStaffUpdated = updatedStaff => {
    setStaff(prevStaff =>
      prevStaff.map(staff =>
        staff.id === updatedStaff.id ? { ...staff, ...updatedStaff } : staff,
      ),
    );
  };

  // Handle staff addition
  const handleStaffAdded = newStaff => {
    setStaff(prevStaff => [...prevStaff, newStaff]);
  };

  // Search filter
  const filteredStaff = (demoMode ? staticStaff : staff).filter(worker => {
    const searchLower = searchText.toLowerCase();
    return (
      (worker.name || '').toLowerCase().includes(searchLower) ||
      (worker.designation || worker.role || '')
        .toLowerCase()
        .includes(searchLower) ||
      (worker.phone || '').toLowerCase().includes(searchLower) ||
      (worker.email || '').toLowerCase().includes(searchLower)
    );
  });

  // Refresh handler
  const handleRefresh = async () => {
    if (demoMode) {
      showDemoAlert();
      return;
    }

    setRefreshing(true);
    await Promise.all([fetchStaff(), fetchAttendanceSummary()]);
    setRefreshing(false);
  };

  // Navigation for Add Staff
  const handleAddStaff = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      setShowAddModal(true);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <DemoBanner navigation={navigation} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading staff...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <DemoBanner navigation={navigation} />
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#6366F1']}
            tintColor="#6366F1"
          />
        }
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Staff Management</Text>
          <View style={styles.headerButtons}>
            {!demoMode && (
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={handleRefresh}
              >
                <Icon name="refresh" size={20} color="#6366F1" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.addButton} onPress={handleAddStaff}>
              <Text style={styles.addButtonText}>+ Add Staff</Text>
            </TouchableOpacity>
          </View>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search staff..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Attendance Summary Card */}
        <View style={styles.attendanceSummaryCard}>
          <View style={styles.attendanceSummaryHeader}>
            <View>
              <Text style={styles.attendanceSummaryTitle}>Today's Attendance</Text>
              <Text style={styles.attendanceSummaryDate}>
                {new Date().toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.markAttendanceButton}
              onPress={() => {
                if (demoMode) {
                  showDemoAlert();
                } else {
                  navigation.navigate('StaffAttendance');
                }
              }}
            >
              <Icon name="check-circle" size={16} color="#FFFFFF" />
              <Text style={styles.markAttendanceButtonText}>Mark Attendance</Text>
            </TouchableOpacity>
          </View>
          
          {summaryLoading ? (
            <View style={styles.summaryLoadingContainer}>
              <Text style={styles.summaryLoadingText}>Loading attendance data...</Text>
            </View>
          ) : (
            <View style={styles.attendanceStatsContainer}>
              <View style={styles.attendanceStatsRow}>
                <View style={styles.attendanceStatCard}>
                  <Text style={styles.attendanceStatNumber}>{attendanceSummary.total_staff}</Text>
                  <Text style={styles.attendanceStatLabel}>Total Staff</Text>
                </View>
                <View style={[styles.attendanceStatCard, styles.presentStatCard]}>
                  <Text style={[styles.attendanceStatNumber, styles.presentStatNumber]}>
                    {attendanceSummary.present_count}
                  </Text>
                  <Text style={styles.attendanceStatLabel}>Present</Text>
                </View>
                <View style={[styles.attendanceStatCard, styles.absentStatCard]}>
                  <Text style={[styles.attendanceStatNumber, styles.absentStatNumber]}>
                    {attendanceSummary.absent_count}
                  </Text>
                  <Text style={styles.attendanceStatLabel}>Absent</Text>
                </View>
              </View>
              
              {attendanceSummary.not_marked_count > 0 && (
                <View style={styles.pendingAttendanceContainer}>
                  <Icon name="pending" size={16} color="#F59E0B" />
                  <Text style={styles.pendingAttendanceText}>
                    {attendanceSummary.not_marked_count} staff attendance not marked
                  </Text>
                </View>
              )}
              
              {/* <View style={styles.attendanceProgressContainer}>
                <View style={styles.attendanceProgressBar}>
                  <View 
                    style={[
                      styles.attendanceProgressFill, 
                      { width: `${attendanceSummary.attendance_percentage}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.attendanceProgressText}>
                  {attendanceSummary.attendance_percentage}% attendance marked
                </Text>
              </View> */}
            </View>
          )}
        </View>

        {/* Staff List */}
        <View style={styles.staffList}>
          {filteredStaff.length === 0 ? (
            <View style={styles.emptyListContainer}>
              <Icon name="people-outline" size={64} color="#9CA3AF" />
              <Text style={styles.emptyListText}>
                {demoMode ? 'Demo staff data shown above' : 'No staff found.'}
              </Text>
              {searchText.length > 0 && (
                <Text style={styles.emptyListSubtext}>
                  Try adjusting your search terms
                </Text>
              )}
            </View>
          ) : (
            filteredStaff.map(worker => (
              <StaffCard
                key={worker.id}
                worker={worker}
                navigation={navigation}
                onStaffDeleted={handleStaffDeleted}
                onStaffUpdated={handleStaffUpdated}
              />
            ))
          )}
        </View>

        {/* Add Staff Modal */}
        <AddStaffModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onStaffAdded={handleStaffAdded}
          userId={userId}
        />

        {/* ...existing code... */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StaffScreen;
