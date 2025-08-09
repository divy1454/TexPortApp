import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDemoMode } from '../src/context/DemoContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PartyCard = ({ party, navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();

  // Handle different data structures (API vs static data)
  const partyData = {
    id: party.id,
    name: party.name,
    location: party.location || party.business_location || 'N/A',
    gst: party.gst || party.gst_no || 'N/A',
    outstanding: party.outstanding || 0,
    status: party.status || 'Active', // Default to Active for API data
    email: party.email,
    phone: party.phone,
    address: party.address,
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Active':
        return '#10B981';
      case 'Alert':
        return '#F59E0B';
      case 'Premium':
        return '#8B5CF6';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = status => {
    switch (status) {
      case 'Active':
        return '✅';
      case 'Alert':
        return '⚠️';
      case 'Premium':
        return '⭐';
      default:
        return '📋';
    }
  };

  // handle button clicked
  const handleEdit = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      // Navigate to edit screen
      // navigation.navigate('EditParty', { party: partyData });
      console.log('Editing party:', partyData.id);
    }
  };

  const handleDelete = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      // Call delete API
      console.log('Deleting party:', partyData.id);
    }
  };

  return (
    <View style={styles.partyCard}>
      <View style={styles.partyHeader}>
        <View>
          <Text style={styles.partyName}>{partyData.name}</Text>
          <Text style={styles.partyId}>ID: PTY-{partyData.id}</Text>
          <Text style={styles.partyLocation}>
            <Icon name="location-on" size={16} color="#6B7280" />{' '}
            {partyData.location}
          </Text>
        </View>
        <View style={styles.partyRight}>
          {/* <View style={[styles.statusBadge, { backgroundColor: getStatusColor(partyData.status) + '20' }]}>
            <Text style={[styles.statusBadgeText, { color: getStatusColor(partyData.status) }]}>
              {getStatusIcon(partyData.status)} {partyData.status}
            </Text>
          </View> */}
          <Text style={styles.partyOutstanding}>₹{partyData.outstanding.toLocaleString()}</Text>
          <Text style={styles.partyOutstandingLabel}>Outstanding</Text>
        </View>
      </View>
      <View style={styles.partyFooter}>
        <Text style={styles.partyGst}>GST: {partyData.gst}</Text>
        <View style={styles.partyActions}>
          <TouchableOpacity
            style={styles.partyActionButton}
            onPress={handleEdit}
          >
            <Text style={styles.partyActionButtonText}>
              <Icon name="edit" size={16} color="#6366F1" /> Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.partyActionButton}
            onPress={handleDelete}
          >
            <Text style={styles.partyActionButtonText}>
              <Icon name="delete" size={16} color="#EF4444" /> Delete
            </Text>
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
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PartyCard;
