import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import DemoBanner from '../../components/DemoBanner';
import { useDemoMode } from '../context/DemoContext';
import { demoDashboard } from '../data/demoDashboard';
import styles from '../../components/Css/HomeScreen.styles';

const HomeScreen = ({ navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();

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

  // Calculate totals
  const totalReceivable = demoMode ? demoDashboard.totalReceivablePayment : partiesReceivablePayments.reduce((sum, party) => {
    const amount = parseInt(party.amount.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  const totalGivable = demoMode ? demoDashboard.totalGivablePayment : partiesGivablePayments.reduce((sum, party) => {
    const amount = parseInt(party.amount.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  const totalParties = demoMode ? demoDashboard.totalParties : [...partiesReceivablePayments, ...partiesGivablePayments].length;

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

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <DemoBanner navigation={navigation} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>Welcome to TexPort! 🏠</Text>
            <Text style={styles.welcomeSubtitle}>Your complete textile business dashboard</Text>
          </View>
          <Text style={styles.welcomeIcon}>🏭</Text>
        </LinearGradient>

        {/* Summary Stats */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{totalParties}</Text>
            <Text style={styles.summaryLabel}>Total Parties</Text>
            <Icon name="people" size={24} color="#6366F1" />
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>₹{(totalReceivable / 100000).toFixed(1)}L</Text>
            <Text style={styles.summaryLabel}>Receivable</Text>
            <Icon name="trending-up" size={24} color="#10B981" />
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>₹{(totalGivable / 100000).toFixed(1)}L</Text>
            <Text style={styles.summaryLabel}>Payable</Text>
            <Icon name="trending-down" size={24} color="#EF4444" />
          </View>
        </View>

        {/* Payment Tables */}
        {renderPartyTable('Parties to Receive Payment From', currentReceivablePayments, '💰')}
        {renderPartyTable('Parties to Give Payment To', currentGivablePayments, '💸')}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Parties')}
            >
              <LinearGradient colors={['#10B981', '#059669']} style={styles.actionGradient}>
                <Icon name="people" size={32} color="white" />
                <Text style={styles.actionTitle}>All Parties</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Payments')}
            >
              <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.actionGradient}>
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