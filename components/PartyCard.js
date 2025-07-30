import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PartyCard = ({ party, navigation }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#10B981';
      case 'Alert': return '#F59E0B';
      case 'Premium': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return '✅';
      case 'Alert': return '⚠️';
      case 'Premium': return '⭐';
      default: return '📋';
    }
  };

  return (
    <View style={styles.partyCard}>
      <View style={styles.partyHeader}>
        <View>
          <Text style={styles.partyName}>{party.name}</Text>
          <Text style={styles.partyId}>ID: {party.id}</Text>
          <Text style={styles.partyLocation}>📍 {party.location}</Text>
        </View>
        <View style={styles.partyRight}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(party.status) + '20' }]}>
            <Text style={[styles.statusBadgeText, { color: getStatusColor(party.status) }]}>
              {getStatusIcon(party.status)} {party.status}
            </Text>
          </View>
          <Text style={styles.partyOutstanding}>₹{party.outstanding.toLocaleString()}</Text>
          <Text style={styles.partyOutstandingLabel}>Outstanding</Text>
        </View>
      </View>
      <View style={styles.partyFooter}>
        <Text style={styles.partyGst}>GST: {party.gst}</Text>
        <View style={styles.partyActions}>
          <TouchableOpacity style={styles.partyActionButton}>
            <Text style={styles.partyActionButtonText}>📞 Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.partyActionButton}>
            <Text style={styles.partyActionButtonText}>💬 Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  partyCard: {
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
  partyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  partyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  partyId: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  partyLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  partyRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  partyOutstanding: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  partyOutstandingLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  partyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partyGst: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'monospace',
  },
  partyActions: {
    flexDirection: 'row',
    gap: 8,
  },
  partyActionButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  partyActionButtonText: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default PartyCard;