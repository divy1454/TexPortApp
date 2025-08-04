import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PartyCard from '../../components/PartyCard';
import Header from '../../components/Header';
import DemoBanner from '../../components/DemoBanner';
import { useDemoMode } from '../context/DemoContext';
import { demoBuyers } from '../data/demoBuyers';

const PartiesScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const { demoMode, showDemoAlert } = useDemoMode();

  const parties = [
    {
      id: 'PTY-001',
      name: 'Rajesh Cotton Mills',
      location: 'Gujarat',
      gst: '24ABCDE1234F1Z5',
      outstanding: 245000,
      status: 'Active'
    },
    {
      id: 'PTY-002',
      name: 'Mumbai Silk House',
      location: 'Maharashtra',
      gst: '27FGHIJ5678K2L9',
      outstanding: 78500,
      status: 'Alert'
    },
    {
      id: 'PTY-003',
      name: 'Delhi Fashion Hub',
      location: 'Delhi',
      gst: '07MNOPQ9012R3S4',
      outstanding: 156000,
      status: 'Premium'
    }
  ];

  // Get current data based on demo mode
  const currentParties = demoMode ? demoBuyers : parties;

  const filteredParties = currentParties.filter(party =>
    party.name.toLowerCase().includes(searchText.toLowerCase()) ||
    party.gst.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddParty = () => {
    // if (demoMode) {
    //   showDemoAlert();
    //   return;
    // }
    navigation.navigate('AddParty');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <DemoBanner navigation={navigation} />
      <ScrollView style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Party Management</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddParty}
          >
            <Text style={styles.addButtonText}>+ Add Party</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search parties by name or GST..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Party List */}
        {filteredParties.map((party) => (
          <PartyCard key={party.id} party={party} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 0,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  screenHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
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
  addButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingLeft: 40,
    fontSize: 16,
    color: '#1F2937',
  },
});

export default PartiesScreen;