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
import Header from '../../../components/Header';
import DemoBanner from '../../../components/DemoBanner';
import { useDemoMode } from '../../context/DemoContext';
import { demoOrder } from '../../data/demoOrder';
import API from '../../../config/apiConfig';
import OrderCard from '../../../components/OrderCard';

const OrderScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { demoMode, showDemoAlert } = useDemoMode();

  // Static fallback data for when API fails or in demo mode
  const staticOrders = [
    {
      id: 'ORD-001',
      partyName: 'Party 1',
      items: [
        {
          id: 'PROD-001',
          name: 'Product 1',
          qty: 10,
          price: 100,
          total: 1000,
        },
        {
          id: 'PROD-002',
          name: 'Product 2',
          qty: 20,
          price: 200,
          total: 2000,
        },
        {
          id: 'PROD-003',
          name: 'Product 3',
          qty: 30,
          price: 300,
          total: 3000,
        },
      ],
    },
    {
      id: 'ORD-002',
      partyName: 'Party 2',
      items: [
        {
          id: 'PROD-001',
          name: 'Product 1',
          qty: 10,
          price: 100,
          total: 1000,
        },
        {
          id: 'PROD-002',
          name: 'Product 2',
          qty: 20,
          price: 200,
          total: 2000,
        },
        {
          id: 'PROD-003',
          name: 'Product 3',
          qty: 30,
          price: 300,
          total: 3000,
        },
      ],
    },
    {
      id: 'ORD-003',
      partyName: 'Party 3',
      items: [
        {
          id: 'PROD-001',
          name: 'Product 1',
          qty: 10,
          price: 100,
          total: 1000,
        },
        {
          id: 'PROD-002',
          name: 'Product 2',
          qty: 20,
          price: 200,
          total: 2000,
        },
        {
          id: 'PROD-003',
          name: 'Product 3',
          qty: 30,
          price: 300,
          total: 3000,
        },
      ],
    },
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

  // Function to fetch product by creator ID
  const fetchOrdersByCreator = async createdById => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `${API}orders/creator/${createdById}`;
      // console.log('Fetching orders from:', apiUrl);

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
        setOrders(data.orders);
      } else {
        setError(data.message || 'Failed to fetch orders');
        // Use static data as fallback
        setOrders(staticOrders);
        console.log('API failed, using static data');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Network error occurred');
      // Use static data as fallback
      setOrders(staticOrders);
      console.log('Network error, using static data');
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    const initializeScreen = async () => {
      console.log('Initializing ProductScreen, demoMode:', demoMode);

      if (!demoMode) {
        const user = await getCurrentUser();
        console.log('Current user:', user);

        if (user && user.id) {
          console.log('Fetching products for user ID:', user.id);
          fetchOrdersByCreator(user.id);
        } else {
          console.log('No user found, using static data');
          setError('User not found. Please login again.');
          setOrders(staticOrders);
        }
      } else {
        console.log('Demo mode, using static data');
        setOrders(staticOrders);
      }
    };

    initializeScreen();
  }, [demoMode]);

  // Get current data based on demo mode
  const currentOrders = demoMode ? demoOrder : orders;

  const filteredOrders = currentOrders.filter(order => {
    if (!order) return false;

    const searchLower = searchText.toLowerCase();

    // Safely get party name with fallbacks for different data structures
    const partyName = (order.party?.name || order.partyName || '').toLowerCase();
    // total amount
    const totalAmount = (order.total_amount || 0).toString();

    // Check if any of the fields match the search text
    const matchesSearch =
      partyName.includes(searchLower) ||
      totalAmount.includes(searchLower);
    return matchesSearch;
  });

  const handleAddOrder = () => {
    navigation.navigate('AddOrder');
  };

  const handleRefresh = async () => {
    if (!demoMode) {
      const user = currentUser || (await getCurrentUser());
      if (user && user.id) {
        fetchOrdersByCreator(user.id);
      } else {
        setError('User not found. Please login again.');
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Header navigation={navigation} /> */}
        <DemoBanner navigation={navigation} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header navigation={navigation} /> */}
      <DemoBanner navigation={navigation} />
      <ScrollView style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Order Management</Text>
          <View style={styles.headerButtons}>
            {!demoMode && (
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={handleRefresh}
              >
                <Icon name="refresh" size={20} color="#6366F1" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddOrder}
            >
              <Text style={styles.addButtonText}>+ Add Order</Text>
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
            placeholder="Search orders by name"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Product List */}
        <View style={styles.partyList}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                navigation={navigation}
              />
            ))
          ) : (
            <View style={styles.noProductContainer}>
              <Icon name="receipt" size={64} color="#9CA3AF" />
              <Text style={styles.noProductText}>No Order Available</Text>
              <Text style={styles.noProductSubText}>
                {searchText
                  ? 'No orders found matching your search'
                  : 'Start by adding your first order'}
              </Text>
            </View>
          )}
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
    paddingTop: 40,
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
  noProductContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noProductText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'center',
  },
  noProductSubText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default OrderScreen;
