import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AttendanceScreen = ({ navigation, route }) => {
  const { staff } = route.params || { staff: [] };
  
  const [attendance, setAttendance] = useState(
    staff.reduce((acc, worker) => {
      acc[worker.id] = worker.status; // Initialize with current status
      return acc;
    }, {})
  );

  const [attendanceTime] = useState(new Date().toLocaleTimeString());
  const [attendanceDate] = useState(new Date().toLocaleDateString());

  const markAttendance = (workerId, status) => {
    setAttendance(prev => ({
      ...prev,
      [workerId]: status
    }));
  };

  const saveAllAttendance = () => {
    const presentCount = Object.values(attendance).filter(status => status === 'present').length;
    const absentCount = Object.values(attendance).filter(status => status === 'absent').length;
    
    Alert.alert(
      'Attendance Saved!',
      `Today's attendance has been recorded successfully.\n\nPresent: ${presentCount}\nAbsent: ${absentCount}\nTime: ${attendanceTime}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const getAttendanceStats = () => {
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    return { present, absent };
  };

  const stats = getAttendanceStats();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>✓ Mark Today's Attendance</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimeCard}>
          <Text style={styles.dateTimeLabel}>📅 Date</Text>
          <Text style={styles.dateTimeValue}>{attendanceDate}</Text>
        </View>
        <View style={styles.dateTimeCard}>
          <Text style={styles.dateTimeLabel}>🕐 Time</Text>
          <Text style={styles.dateTimeValue}>{attendanceTime}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.present}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.absent}</Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{staff.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Staff List</Text>
        
        {staff.map((worker) => (
          <View key={worker.id} style={styles.attendanceItem}>
            <View style={styles.workerInfo}>
              <Text style={styles.attendanceWorkerName}>{worker.name}</Text>
              <Text style={styles.attendanceWorkerRole}>
                {worker.role} {worker.machine ? `- ${worker.machine}` : ''}
              </Text>
              <Text style={styles.attendanceWorkerDetails}>
                ID: EMP-{worker.id.toString().padStart(3, '0')}
              </Text>
            </View>
            <View style={styles.attendanceButtons}>
              <TouchableOpacity 
                style={[
                  styles.presentButton,
                  attendance[worker.id] === 'present' && styles.presentButtonActive
                ]}
                onPress={() => markAttendance(worker.id, 'present')}
              >
                <Icon 
                  name="check" 
                  size={16} 
                  color={attendance[worker.id] === 'present' ? 'white' : '#10B981'} 
                />
                <Text style={[
                  styles.presentButtonText,
                  attendance[worker.id] === 'present' && styles.presentButtonTextActive
                ]}>
                  Present
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.absentButton,
                  attendance[worker.id] === 'absent' && styles.absentButtonActive
                ]}
                onPress={() => markAttendance(worker.id, 'absent')}
              >
                <Icon 
                  name="close" 
                  size={16} 
                  color={attendance[worker.id] === 'absent' ? 'white' : '#EF4444'} 
                />
                <Text style={[
                  styles.absentButtonText,
                  attendance[worker.id] === 'absent' && styles.absentButtonTextActive
                ]}>
                  Absent
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveAttendanceButton} onPress={saveAllAttendance}>
          <Icon name="save" size={20} color="white" style={styles.saveIcon} />
          <Text style={styles.saveAttendanceButtonText}>💾 Save All Attendance</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  dateTimeCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateTimeLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  dateTimeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workerInfo: {
    flex: 1,
  },
  attendanceWorkerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  attendanceWorkerRole: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  attendanceWorkerDetails: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  attendanceButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  presentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  presentButtonActive: {
    backgroundColor: '#10B981',
  },
  presentButtonText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: 'bold',
  },
  presentButtonTextActive: {
    color: 'white',
  },
  absentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  absentButtonActive: {
    backgroundColor: '#EF4444',
  },
  absentButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  absentButtonTextActive: {
    color: 'white',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveAttendanceButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  saveIcon: {
    marginRight: 4,
  },
  saveAttendanceButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AttendanceScreen;