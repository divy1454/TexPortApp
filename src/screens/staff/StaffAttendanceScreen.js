import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../../components/Css/StaffAttendanceScreen.styles';

// Dummy staff data for attendance marking
const demoStaff = [
  { id: 1, name: 'Ramesh Kumar', status: 'present' },
  { id: 2, name: 'Suresh Patel', status: 'present' },
  { id: 3, name: 'Vikash Singh', status: 'absent' },
  { id: 4, name: 'Rajesh Sharma', status: 'present' },
  { id: 5, name: 'Amit Gupta', status: 'present' },
];

const StaffAttendanceScreen = ({ navigation }) => {
  const [attendance, setAttendance] = useState(demoStaff);

  const toggleAttendance = (id) => {
    setAttendance(attendance.map(s =>
      s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color="#6366F1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Record Attendance</Text>
      </View>
      <ScrollView style={styles.list}>
        {attendance.map(staff => (
          <View key={staff.id} style={styles.staffRow}>
            <Text style={styles.staffName}>{staff.name}</Text>
            <TouchableOpacity
              style={staff.status === 'present' ? styles.presentBtn : styles.absentBtn}
              onPress={() => toggleAttendance(staff.id)}
            >
              <Icon name={staff.status === 'present' ? 'check-circle' : 'cancel'} size={20} color={staff.status === 'present' ? '#059669' : '#DC2626'} />
              <Text style={staff.status === 'present' ? styles.presentText : styles.absentText}>
                {staff.status === 'present' ? 'Present' : 'Absent'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default StaffAttendanceScreen;
