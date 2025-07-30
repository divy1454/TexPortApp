import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';

const HomeScreen = ({ navigation }) => {
  const quickStats = [
    { label: 'Today\'s Sales', value: '₹2,45,000', color: '#10B981', icon: '💰' },
    { label: 'Pending Bills', value: '12', color: '#F59E0B', icon: '📋' },
    { label: 'Active Parties', value: '28', color: '#6366F1', icon: '🏢' },
    { label: 'Staff Present', value: '15/18', color: '#8B5CF6', icon: '👥' }
  ];

  const quickActions = [
    { 
      title: 'Voice Commands', 
      subtitle: 'Speak to manage your business', 
      icon: '🎤', 
      colors: ['#EF4444', '#F97316'],
      onPress: () => navigation.navigate('VoiceModal')
    },
    { 
      title: 'AI Predictions', 
      subtitle: 'Market insights & trends', 
      icon: '🤖', 
      colors: ['#10B981', '#059669'],
      onPress: () => navigation.navigate('AIPredictionsModal')
    },
    { 
      title: 'Due Payments', 
      subtitle: 'Manage overdue bills', 
      icon: '⚠️', 
      colors: ['#F59E0B', '#EF4444'],
      onPress: () => navigation.navigate('DuePaymentsModal')
    },
    { 
      title: 'Add New Party', 
      subtitle: 'Register new customer', 
      icon: '➕', 
      colors: ['#6366F1', '#8B5CF6'],
      onPress: () => navigation.navigate('AddPartyModal')
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'payment',
      title: 'Payment Received',
      subtitle: 'Mumbai Silk House - ₹78,500',
      time: '2 hours ago',
      icon: '💰',
      color: '#10B981'
    },
    {
      id: 2,
      type: 'order',
      title: 'New Order',
      subtitle: 'Delhi Fashion Hub - 500m Cotton',
      time: '4 hours ago',
      icon: '📦',
      color: '#6366F1'
    },
    {
      id: 3,
      type: 'gst',
      title: 'GST Filing Due',
      subtitle: 'Monthly return due in 3 days',
      time: '6 hours ago',
      icon: '📄',
      color: '#F59E0B'
    },
    {
      id: 4,
      type: 'staff',
      title: 'Staff Attendance',
      subtitle: '15 out of 18 staff present today',
      time: '8 hours ago',
      icon: '👥',
      color: '#8B5CF6'
    }
  ];

  const handleQuickStatPress = (stat) => {
    switch (stat.label) {
      case 'Today\'s Sales':
        navigation.navigate('Payments');
        break;
      case 'Pending Bills':
        navigation.navigate('DuePaymentsModal');
        break;
      case 'Active Parties':
        navigation.navigate('Parties');
        break;
      case 'Staff Present':
        navigation.navigate('Staff');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="🏠 Business Dashboard" 
        showNotification={true}
        onNotificationPress={() => Alert.alert('Notifications', 'You have 3 new notifications')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>Welcome back! 👋</Text>
            <Text style={styles.welcomeSubtitle}>Here's what's happening with your textile business today</Text>
          </View>
          <Text style={styles.welcomeIcon}>🏭</Text>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📊 Quick Overview</Text>
        </View>
        <View style={styles.statsGrid}>
          {quickStats.map((stat, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.statCard}
              onPress={() => handleQuickStatPress(stat)}
            >
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
        </View>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.actionCard}
              onPress={action.onPress}
            >
              <LinearGradient colors={action.colors} style={styles.actionGradient}>
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activities */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🕐 Recent Activities</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activitiesList}>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                <Text style={styles.activityIconText}>{activity.icon}</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <TouchableOpacity style={styles.activityArrow}>
                <Icon name="arrow-forward-ios" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcomeCard: {
    borderRadius: 20,
    padding: 24,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    lineHeight: 22,
  },
  welcomeIcon: {
    fontSize: 48,
    marginLeft: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  activitiesList: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityIconText: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activityArrow: {
    padding: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});

export default HomeScreen;