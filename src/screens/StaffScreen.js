import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import StaffCard from '../../components/StaffCard';

const StaffScreen = ({ navigation }) => {
  const staff = [
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
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      <ScrollView style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Staff Management</Text>
          <TouchableOpacity 
            style={styles.attendanceButton} 
            onPress={() => navigation.navigate('Attendance', { staff })}
          >
            <Text style={styles.attendanceButtonText}>✓ Attendance</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Summary */}
        <LinearGradient
          colors={['#3B82F6', '#6366F1']}
          style={styles.summaryCard}
        >
          <Text style={styles.summaryTitle}>📅 Today's Summary</Text>
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

        {/* Machine Operators */}
        <Text style={styles.subsectionTitle}>🏭 Machine Operators (14 Machines)</Text>
        {staff.filter(s => s.role === 'Machine Operator').map((worker) => (
          <StaffCard key={worker.id} worker={worker} />
        ))}
        
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View All 14 Machine Operators</Text>
        </TouchableOpacity>

        {/* Meter Calculation Staff */}
        <Text style={styles.subsectionTitle}>📏 Meter Calculation Staff</Text>
        {staff.filter(s => s.role === 'Meter Calculator').map((worker) => (
          <StaffCard key={worker.id} worker={worker} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    padding: 16,
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
});

export default StaffScreen;