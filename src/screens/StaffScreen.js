  
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, TextInput, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import DemoBanner from '../../components/DemoBanner';
import { useDemoMode } from '../context/DemoContext';
import styles from '../../components/Css/StaffScreen.styles';
import StaffCard from '../../components/StaffCard';
import AddStaffModal from '../../components/AddStaffModal';
import API from '../../config/apiConfig';

const StaffScreen = ({ navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();
  const [staff, setStaff] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

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
      status: 'active'
    },
    {
      id: 102,
      name: 'Demo Staff 2',
      designation: 'Meter Calculator',
      phone: '+91 9876543211',
      email: 'demo2@company.com',
      salary_type: 'monthly',
      salary_amount: 25000,
      status: 'active'
    }
  ];

  // Fetch staff data from API
  const fetchStaff = async () => {
    if (demoMode) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API}staff`, {
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

  // Load data on component mount
  useEffect(() => {
    fetchStaff();
  }, [demoMode]);

  // Handle staff deletion
  const handleStaffDeleted = (deletedStaffId) => {
    setStaff(prevStaff => prevStaff.filter(staff => staff.id !== deletedStaffId));
  };

  // Handle staff update
  const handleStaffUpdated = (updatedStaff) => {
    setStaff(prevStaff => 
      prevStaff.map(staff => 
        staff.id === updatedStaff.id ? { ...staff, ...updatedStaff } : staff
      )
    );
  };

  // Handle staff addition
  const handleStaffAdded = (newStaff) => {
    setStaff(prevStaff => [...prevStaff, newStaff]);
  };

  // Search filter
  const filteredStaff = (demoMode ? staticStaff : staff).filter(worker => {
    const searchLower = searchText.toLowerCase();
    return (
      (worker.name || '').toLowerCase().includes(searchLower) ||
      (worker.designation || worker.role || '').toLowerCase().includes(searchLower) ||
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
    await fetchStaff();
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
              <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
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
          <Icon name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search staff by name, designation, phone, or email..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Attendance Card */}
        <View style={styles.attendanceCard}>
          <View style={styles.attendanceCardHeader}>
            <Text style={styles.attendanceTitle}>Staff Summary</Text>
            <TouchableOpacity 
              style={styles.attendanceButton} 
              onPress={() => {
                if (demoMode) {
                  showDemoAlert();
                } else {
                  navigation.navigate('StaffAttendance');
                }
              }}
            >
              <Icon name="check-circle" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.attendanceButtonText}>Attendance</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.attendanceStatsRow}>
            <View style={styles.attendanceStatItem}>
              <Text style={styles.attendanceStatValue}>{filteredStaff.length}</Text>
              <Text style={styles.attendanceStatLabel}>Total</Text>
            </View>
            <View style={styles.attendanceStatItem}>
              <Text style={[styles.attendanceStatValue, { color: '#059669' }]}>
                {filteredStaff.filter(s => s.status === 'present' || s.status === 'active').length}
              </Text>
              <Text style={styles.attendanceStatLabel}>Active</Text>
            </View>
            <View style={styles.attendanceStatItem}>
              <Text style={[styles.attendanceStatValue, { color: '#DC2626' }]}>
                {filteredStaff.filter(s => s.status === 'absent' || s.status === 'inactive').length}
              </Text>
              <Text style={styles.attendanceStatLabel}>Inactive</Text>
            </View>
          </View>
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
        />
  

  {/* ...existing code... */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StaffScreen;