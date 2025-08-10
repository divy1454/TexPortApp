import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PartyCard from '../../../components/PartyCard';
import Header from '../../../components/Header';
import DemoBanner from '../../../components/DemoBanner';
import { useDemoMode } from '../../context/DemoContext';
import { demoBuyers } from '../../data/demoBuyers';
import API from '../../../config/apiConfig';

const PartiesScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { demoMode, showDemoAlert } = useDemoMode();

  // Static fallback data for when API fails or in demo mode
  const staticParties = [
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

  // Function to get current user from AsyncStorage
  const getCurrentUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  };

  // Function to fetch parties by creator ID
  const fetchPartiesByCreator = async (createdById) => {
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = `${API}parties/creator/${createdById}`;
      // console.log('Fetching parties from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log('Response status:', response.status);
      const data = await response.json();
      // console.log('Response data:', data);

      if (data.success) {
        setParties(data.parties);
        console.log('Parties loaded successfully:', data.parties.length, 'parties');
      } else {
        setError(data.message || 'Failed to fetch parties');
        // Use static data as fallback
        setParties(staticParties);
        console.log('API failed, using static data');
      }
    } catch (err) {
      console.error('Error fetching parties:', err);
      setError('Network error occurred');
      // Use static data as fallback
      setParties(staticParties);
      console.log('Network error, using static data');
    } finally {
      setLoading(false);
    }
  };

  // Load parties on component mount
  useEffect(() => {
    const initializeScreen = async () => {
      console.log('Initializing PartiesScreen, demoMode:', demoMode);
      
      if (!demoMode) {
        const user = await getCurrentUser();
        console.log('Current user:', user);
        
        if (user && user.id) {
          console.log('Fetching parties for user ID:', user.id);
          fetchPartiesByCreator(user.id);
        } else {
          console.log('No user found, using static data');
          setError('User not found. Please login again.');
          setParties(staticParties);
        }
      } else {
        console.log('Demo mode, using static data');
        setParties(staticParties);
      }
    };

    initializeScreen();
  }, [demoMode]);

  // Get current data based on demo mode
  const currentParties = demoMode ? demoBuyers : parties;

  const filteredParties = currentParties.filter(party => {
    if (!party) return false;
    
    const searchLower = searchText.toLowerCase();
    
    // Safely get name and gst fields with fallbacks
    const partyName = (party.name || '').toLowerCase();
    const partyGst = (party.gst || party.gst_no || '').toLowerCase();
    
    return partyName.includes(searchLower) || partyGst.includes(searchLower);
  });

  const handleAddParty = () => {
    navigation.navigate('AddParty');
  };

  const handleRefresh = async () => {
    if (!demoMode) {
      const user = currentUser || await getCurrentUser();
      if (user && user.id) {
        fetchPartiesByCreator(user.id);
      } else {
        setError('User not found. Please login again.');
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <DemoBanner navigation={navigation} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading parties...</Text>
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
          <Text style={styles.sectionTitle}>Party Management</Text>
          <View style={styles.headerButtons}>
            {!demoMode && (
              <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                <Icon name="refresh" size={20} color="#6366F1" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.addButton} onPress={handleAddParty}>
              <Text style={styles.addButtonText}>+ Add Party</Text>
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
          <Icon
            name="search"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search parties by name or GST..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Party List */}
        <View style={styles.partyList}>
          {filteredParties.map(party => (
            <PartyCard key={party.id} party={party} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  partyList: {
    marginBottom: 16,
  },
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  refreshButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#6366F1',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 15,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingLeft: 40,
    fontSize: 16,
    color: '#1F2937',
  },
});

export default PartiesScreen;
