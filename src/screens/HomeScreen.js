import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import DemoBanner from '../../components/DemoBanner';
import { useDemoMode } from '../context/DemoContext';
import { demoDashboard } from '../data/demoDashboard';
import { API } from '../../config/apiConfig';
import styles from '../../components/Css/HomeScreen.styles';

const HomeScreen = ({ navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();

  // Dashboard state
  const [dashboardData, setDashboardData] = useState({
    totalParties: 0,
    totalUnpaidAmount: 0,
    latestUnpaidParties: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch dashboard data from API
  const fetchDashboardData = async (isRefreshing = false) => {
    if (demoMode) {
      setIsLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      if (!isRefreshing) {
        setIsLoading(true);
      }
      setError(null);

      // Get user ID from AsyncStorage
      const userString = await AsyncStorage.getItem('user');
      if (!userString) {
        throw new Error('User not found');
      }

      const user = JSON.parse(userString);
      const userId = user.id;

      // Fetch dashboard data
      const response = await fetch(`${API}app-dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          created_by: userId
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDashboardData({
        totalParties: data.total_parties,
        totalUnpaidAmount: data.total_unpaid_amount,
        latestUnpaidParties: data.latest_unpaid_parties
      });

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Error fetching dashboard data');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Handle pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData(true);
  };

  // Fetch dashboard data from API
  useEffect(() => {
    fetchDashboardData();
  }, [demoMode]);

  // Sample data for parties with payment details (production data)
  const partiesReceivablePayments = [
    { 
      id: 1, 
      name: 'Rajesh Cotton Mills', 
      amount: '₹2,45,000', 
      dueDate: '2 days', 
      status: 'overdue' 
    },
    { 
      id: 2, 
      name: 'Mumbai Silk House', 
      amount: '₹78,500', 
      dueDate: '5 days', 
      status: 'due' 
    },
    { 
      id: 3, 
      name: 'Delhi Fashion Hub', 
      amount: '₹1,56,000', 
      dueDate: '1 week', 
      status: 'upcoming' 
    },
    { 
      id: 4, 
      name: 'Chennai Textiles', 
      amount: '₹89,200', 
      dueDate: '3 days', 
      status: 'overdue' 
    },
    { 
      id: 5, 
      name: 'Bangalore Weavers', 
      amount: '₹67,800', 
      dueDate: '1 day', 
      status: 'urgent' 
    }
  ];

  const partiesGivablePayments = [
    { 
      id: 1, 
      name: 'Gujarat Yarn Suppliers', 
      amount: '₹1,23,000', 
      dueDate: '4 days', 
      status: 'upcoming' 
    },
    { 
      id: 2, 
      name: 'Ahmedabad Cotton Co.', 
      amount: '₹95,600', 
      dueDate: '2 days', 
      status: 'due' 
    },
    { 
      id: 3, 
      name: 'Punjab Thread Mills', 
      amount: '₹2,15,400', 
      dueDate: '6 days', 
      status: 'upcoming' 
    },
    { 
      id: 4, 
      name: 'Haryana Dye Works', 
      amount: '₹76,300', 
      dueDate: '1 day', 
      status: 'urgent' 
    },
    { 
      id: 5, 
      name: 'Rajasthan Fabrics', 
      amount: '₹1,45,900', 
      dueDate: '5 days', 
      status: 'upcoming' 
    }
  ];

  // Get data based on demo mode
  const currentReceivablePayments = demoMode ? demoDashboard.receivablePayments : partiesReceivablePayments;
  const currentGivablePayments = demoMode ? demoDashboard.givablePayments : partiesGivablePayments;

  // Calculate totals - use dashboard data for production or demo data
  const totalReceivable = demoMode ? demoDashboard.totalReceivablePayment : partiesReceivablePayments.reduce((sum, party) => {
    const amount = parseInt(party.amount.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  const totalGivable = demoMode ? demoDashboard.totalGivablePayment : partiesGivablePayments.reduce((sum, party) => {
    const amount = parseInt(party.amount.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  // Use dashboard data for production mode
  const displayTotalParties = demoMode ? demoDashboard.totalParties : dashboardData.totalParties;
  const displayTotalUnpaid = demoMode ? demoDashboard.totalReceivablePayment : dashboardData.totalUnpaidAmount;

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': 
      case 'urgent': 
        return '#EF4444';
      case 'due': 
        return '#F59E0B';
      default: 
        return '#10B981';
    }
  };

  const handlePartyPress = (party) => {
    if (demoMode) {
      showDemoAlert();
      return;
    }
    Alert.alert(
      party.name,
      `Amount: ${party.amount}\nDue: ${party.dueDate}\nStatus: ${party.status}`,
      [{ text: 'OK' }]
    );
  };

  const renderPartyTable = (title, parties, icon) => (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableTitle}>{icon} {title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Parties')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeaderText}>Party Name</Text>
          <Text style={styles.tableHeaderText}>Amount</Text>
          <Text style={styles.tableHeaderText}>Due</Text>
          <Text style={styles.tableHeaderText}>Action</Text>
        </View>
        {parties.slice(0, 5).map((party, index) => (
          <View key={party.id} style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}>
            <Text style={styles.partyName} numberOfLines={1}>{party.name}</Text>
            <Text style={[styles.amount, { color: getStatusColor(party.status) }]}>
              {party.amount}
            </Text>
            <Text style={styles.dueDate}>{party.dueDate}</Text>
            <TouchableOpacity 
              style={styles.showButton}
              onPress={() => handlePartyPress(party)}
            >
              <Icon name="visibility" size={18} color="#6366F1" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const renderUnpaidPartiesTable = () => (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableTitle}>💸 Latest Unpaid Parties</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeaderText}>Party Name</Text>
          <Text style={styles.tableHeaderText}>Unpaid Amount</Text>
        </View>
        {dashboardData.latestUnpaidParties.length > 0 ? (
          dashboardData.latestUnpaidParties.map((party, index) => (
            <View key={party.id} style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}>
              <Text style={styles.partyName} numberOfLines={1}>{party.name}</Text>
              <Text style={[styles.amount, { color: '#EF4444' }]}>
                ₹{party.unpaid_amount}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.tableRow}>
            <Text style={[styles.partyName, { textAlign: 'center', color: '#6B7280' }]}>
              No unpaid parties
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <DemoBanner navigation={navigation} />

      {/* Loading State */}
      {isLoading && !demoMode && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      )}

      {/* Error State */}
      {error && !demoMode && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              fetchDashboardData();
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6366F1']} // Android
            tintColor="#6366F1" // iOS
          />
        }
      >
        {/* Welcome Section */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.welcomeCard}
        >
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>Welcome to TexPort! 🏠</Text>
            <Text style={styles.welcomeSubtitle}>
              Your complete textile business dashboard
            </Text>
          </View>
          <Text style={styles.welcomeIcon}>🏭</Text>
        </LinearGradient>

        {/* Dashboard Summary Stats */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{displayTotalParties}</Text>
            <Text style={styles.summaryLabel}>Total Parties</Text>
            <Icon name="people" size={24} color="#6366F1" />
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>₹{displayTotalUnpaid}</Text>
            <Text style={styles.summaryLabel}>Total Unpaid</Text>
            <Icon name="paid" size={24} color="#EF4444" />
          </View>
          {/* <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>₹{(totalGivable / 100000).toFixed(1)}L</Text>
            <Text style={styles.summaryLabel}>Payable</Text>
            <Icon name="trending-down" size={24} color="#EF4444" />
          </View> */}
        </View>

        {/* Dashboard Tables - Show API data for production, demo data for demo mode */}
        {!demoMode && !isLoading && !error && renderUnpaidPartiesTable()}

        {/* Demo Mode Tables */}
        {demoMode && (
          <>
            {renderPartyTable(
              'Parties to Receive Payment From',
              currentReceivablePayments,
              '💰',
            )}
            {renderPartyTable(
              'Parties to Give Payment To',
              currentGivablePayments,
              '💸',
            )}
          </>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Parties')}
            >
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.actionGradient}
              >
                <Icon name="people" size={32} color="white" />
                <Text style={styles.actionTitle}>All Parties</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Payments')}
            >
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.actionGradient}
              >
                <Icon name="payment" size={32} color="white" />
                <Text style={styles.actionTitle}>Payments</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;