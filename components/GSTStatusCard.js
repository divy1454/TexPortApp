import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GSTStatusCard = ({ 
  title, 
  period, 
  status, 
  statusColor, 
  details, 
  amount, 
  showButton, 
  buttonText, 
  onButtonPress 
}) => {
  return (
    <View style={styles.gstStatusCard}>
      <View style={styles.gstStatusHeader}>
        <View>
          <Text style={styles.gstStatusTitle}>{title}</Text>
          <Text style={styles.gstStatusPeriod}>{period}</Text>
        </View>
        <View style={styles.gstStatusRight}>
          {status && (
            <View style={[styles.gstStatusBadge, { backgroundColor: statusColor + '20' }]}>
              <Text style={[styles.gstStatusBadgeText, { color: statusColor }]}>
                {status}
              </Text>
            </View>
          )}
          {amount && (
            <Text style={[styles.gstStatusAmount, { color: statusColor || '#1F2937' }]}>
              {amount}
            </Text>
          )}
        </View>
      </View>
      <Text style={styles.gstStatusDetails}>{details}</Text>
      {showButton && (
        <TouchableOpacity 
          style={[styles.gstStatusButton, { backgroundColor: statusColor || '#6366F1' }]}
          onPress={onButtonPress}
        >
          <Text style={styles.gstStatusButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gstStatusCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gstStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  gstStatusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  gstStatusPeriod: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  gstStatusRight: {
    alignItems: 'flex-end',
  },
  gstStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 4,
  },
  gstStatusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  gstStatusAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gstStatusDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  gstStatusButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  gstStatusButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GSTStatusCard;