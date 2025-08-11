  
import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import DemoBanner from '../../components/DemoBanner';
import { useDemoMode } from '../context/DemoContext';
import styles from '../../components/Css/StaffScreen.styles';

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

  // Demo fallback data
  const staticStaff = [
    {
      id: 101,
      name: 'Demo Staff 1',
      role: 'Machine Operator',
      machine: 'M-010',
      hoursToday: 6.5,
      hourlyRate: 120,
      status: 'present'
    },
    {
      id: 102,
      name: 'Demo Staff 2',
      role: 'Meter Calculator',
      metersToday: 2000,
      meterRate: 0.6,
      status: 'present'
    }
  ];

  // ...existing code...
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search filter
  const filteredStaff = (demoMode ? staticStaff : staff).filter(worker => {
    const searchLower = searchText.toLowerCase();
    return (
      (worker.name || '').toLowerCase().includes(searchLower) ||
      (worker.role || '').toLowerCase().includes(searchLower)
    );
  });

  // Refresh handler
  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      if (!demoMode) {
        setStaff([...staff]); // In real app, fetch from API
      }
      setLoading(false);
    }, 1000);
  };

  // Navigation for Add/Edit
  const handleAddStaff = () => {
    navigation.navigate('AddStaff');
  };

  const handleEditStaff = (staffObj) => {
    navigation.navigate('EditStaff', { staff: staffObj });
  };

  // Delete Staff
  const handleDeleteStaff = (id) => {
    setStaff(staff.filter(s => s.id !== id));
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
      <ScrollView style={styles.content}>
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
            placeholder="Search staff by name or role..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Attendance Card */}
        <View style={styles.attendanceCard}>
          <View style={styles.attendanceCardHeader}>
            <Text style={styles.attendanceTitle}>Attendance Summary</Text>
            <TouchableOpacity style={styles.attendanceButton} onPress={() => navigation.navigate('StaffAttendance')}>
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
              <Text style={[styles.attendanceStatValue, { color: '#059669' }]}>{filteredStaff.filter(s => s.status === 'present').length}</Text>
              <Text style={styles.attendanceStatLabel}>Present</Text>
            </View>
            <View style={styles.attendanceStatItem}>
              <Text style={[styles.attendanceStatValue, { color: '#DC2626' }]}>{filteredStaff.filter(s => s.status === 'absent').length}</Text>
              <Text style={styles.attendanceStatLabel}>Absent</Text>
            </View>
          </View>
        </View>
  
        {/* Staff List */}
        <View style={styles.staffList}>
          {filteredStaff.length === 0 ? (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No staff found.</Text>
            </View>
          ) : (
            filteredStaff.map(worker => (
              <View key={worker.id} style={styles.staffCardWrapper}>
                {/* PartyCard-style layout */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E40AF' }}>{worker.name}</Text>
                    <Text style={{ fontSize: 15, color: '#6366F1', fontWeight: '600', marginTop: 2 }}>{worker.role}</Text>
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{
                      backgroundColor: worker.status === 'present' ? '#D1FAE5' : '#FECACA',
                      color: worker.status === 'present' ? '#059669' : '#DC2626',
                      fontWeight: 'bold',
                      fontSize: 13,
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      overflow: 'hidden',
                      textAlign: 'center',
                    }}>
                      {worker.status === 'present' ? 'Active' : 'Absent'}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 4 }}>
                  {worker.machine && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                      <Icon name="build" size={16} color="#6366F1" style={{ marginRight: 4 }} />
                      <Text style={{ color: '#374151', fontSize: 14 }}>Machine: <Text style={{ fontWeight: 'bold' }}>{worker.machine}</Text></Text>
                    </View>
                  )}
                  {worker.hoursToday !== undefined && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                      <Icon name="timer" size={16} color="#6366F1" style={{ marginRight: 4 }} />
                      <Text style={{ color: '#374151', fontSize: 14 }}>Hours: <Text style={{ fontWeight: 'bold' }}>{worker.hoursToday}</Text></Text>
                    </View>
                  )}
                  {worker.hourlyRate !== undefined && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                      <Icon name="attach-money" size={16} color="#6366F1" style={{ marginRight: 4 }} />
                      <Text style={{ color: '#374151', fontSize: 14 }}>Rate: <Text style={{ fontWeight: 'bold' }}>{worker.hourlyRate}</Text></Text>
                    </View>
                  )}
                  {worker.metersToday !== undefined && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                      <Icon name="straighten" size={16} color="#6366F1" style={{ marginRight: 4 }} />
                      <Text style={{ color: '#374151', fontSize: 14 }}>Meters: <Text style={{ fontWeight: 'bold' }}>{worker.metersToday}</Text></Text>
                    </View>
                  )}
                  {worker.meterRate !== undefined && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                      <Icon name="speed" size={16} color="#6366F1" style={{ marginRight: 4 }} />
                      <Text style={{ color: '#374151', fontSize: 14 }}>Meter Rate: <Text style={{ fontWeight: 'bold' }}>{worker.meterRate}</Text></Text>
                    </View>
                  )}
                </View>
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity style={styles.partyEditBtn} onPress={() => handleEditStaff(worker)}>
                    <Icon name="edit" size={18} color="#6366F1" style={{ marginRight: 6 }} />
                    <Text style={styles.partyEditBtnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.partyDeleteBtn} onPress={() => handleDeleteStaff(worker.id)}>
                    <Icon name="delete" size={18} color="#EF4444" style={{ marginRight: 6 }} />
                    <Text style={styles.partyDeleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
  

  {/* ...existing code... */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StaffScreen;