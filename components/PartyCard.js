import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDemoMode } from '../src/context/DemoContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API from '../config/apiConfig';
import styles from './Css/PartyCard.styles';

const PartyCard = ({ party, navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();

  // Handle different data structures (API vs static data)
  const partyData = {
    id: party.id,
    name: party.name,
    gst: party.gst || party.gst_no || 'N/A',
    outstanding: party.outstanding || 0,
    status: party.status || 'Active', // Default to Active for API data
    email: party.email,
    phone: party.phone,
    address: party.address,
    business_name: party.business_name || 'N/A',
    business_location: party.business_location || 'N/A',
  };

  // handle button clicked
  const handleEdit = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      // Navigate to edit screen with party data
      navigation.navigate('EditParty', { party: partyData });
    }
  };

  const handleDelete = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this party?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                const response = await fetch(`${API}parties/${partyData.id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                Alert.alert('Success', 'Party deleted successfully');
              } catch (error) {
                console.error('Error deleting party:', error);
                Alert.alert('Error', 'Failed to delete party');
              }
            },
          },
        ]
      );
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
            {partyData.business_location}
          </Text>
        </View>
        <View style={styles.partyRight}>
          {/* <View style={[styles.statusBadge, { backgroundColor: getStatusColor(partyData.status) + '20' }]}>
            <Text style={[styles.statusBadgeText, { color: getStatusColor(partyData.status) }]}>
              {getStatusIcon(partyData.status)} {partyData.status}
            </Text>
          </View> */}
          <Text style={styles.partyOutstanding}>
            ₹{partyData.outstanding.toLocaleString()}
          </Text>
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

export default PartyCard;
