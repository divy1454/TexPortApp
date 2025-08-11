import React from 'react';
import { View, Text } from 'react-native';
import styles from './Css/StaffCard.styles';

const StaffCard = ({ worker }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#10B981';
      case 'absent': return '#EF4444';
      case 'late': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return '✅';
      case 'absent': return '❌';
      case 'late': return '⏰';
      default: return '❓';
    }
  };

  const calculateEarnings = (worker) => {
    if (worker.role === 'Machine Operator') {
      return worker.hoursToday * worker.hourlyRate;
    } else if (worker.role === 'Meter Calculator') {
      return worker.metersToday * worker.meterRate;
    }
    return 0;
  };

  return (
    <View style={styles.staffCard}>
      <View style={styles.staffHeader}>
        <View>
          <Text style={styles.staffName}>{worker.name}</Text>
          <Text style={styles.staffRole}>{worker.role}</Text>
          {worker.machine && (
            <Text style={styles.staffMachine}>Machine: {worker.machine}</Text>
          )}
        </View>
        <View style={styles.staffRight}>
          <View style={[styles.staffStatusBadge, { backgroundColor: getStatusColor(worker.status) + '20' }]}>
            <Text style={[styles.staffStatusText, { color: getStatusColor(worker.status) }]}>
              {getStatusIcon(worker.status)} {worker.status}
            </Text>
          </View>
          <Text style={styles.staffEarnings}>₹{calculateEarnings(worker).toLocaleString()}</Text>
          <Text style={styles.staffEarningsLabel}>Today's Earnings</Text>
        </View>
      </View>
      <View style={styles.staffStats}>
        {worker.role === 'Machine Operator' ? (
          <>
            <View style={styles.staffStat}>
              <Text style={styles.staffStatValue}>{worker.hoursToday}h</Text>
              <Text style={styles.staffStatLabel}>Hours Today</Text>
            </View>
            <View style={styles.staffStat}>
              <Text style={styles.staffStatValue}>₹{worker.hourlyRate}</Text>
              <Text style={styles.staffStatLabel}>Per Hour</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.staffStat}>
              <Text style={styles.staffStatValue}>{worker.metersToday}m</Text>
              <Text style={styles.staffStatLabel}>Meters Today</Text>
            </View>
            <View style={styles.staffStat}>
              <Text style={styles.staffStatValue}>₹{worker.meterRate}</Text>
              <Text style={styles.staffStatLabel}>Per Meter</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default StaffCard;