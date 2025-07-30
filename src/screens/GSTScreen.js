import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import GSTStatusCard from '../../components/GSTStatusCard';

const GSTScreen = ({ navigation }) => {
  const [gstNumber, setGstNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      <ScrollView style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>GST Management</Text>
          <TouchableOpacity style={styles.gstButton}>
            <Text style={styles.gstButtonText}>📄 Yearly File</Text>
          </TouchableOpacity>
        </View>

        {/* GST Search */}
        <View style={styles.gstSearchContainer}>
          <TextInput
            style={styles.gstSearchInput}
            placeholder="Enter GST Number (e.g., 24ABCDE1234F1Z5)"
            placeholderTextColor="#9CA3AF"
            value={gstNumber}
            onChangeText={setGstNumber}
          />
          <TouchableOpacity style={styles.gstSearchButton}>
            <Text style={styles.gstSearchButtonText}>🔍 Search</Text>
          </TouchableOpacity>
        </View>

        {/* GST Quick Actions */}
        <View style={styles.gstActionsContainer}>
          <TouchableOpacity style={styles.gstActionCard}>
            <LinearGradient
              colors={['#3B82F6', '#6366F1']}
              style={styles.gstActionGradient}
            >
              <Text style={styles.gstActionEmoji}>📤</Text>
              <Text style={styles.gstActionTitle}>E-Invoice Upload</Text>
              <Text style={styles.gstActionSubtitle}>Upload to GST Portal</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gstActionCard}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.gstActionGradient}
            >
              <Text style={styles.gstActionEmoji}>📊</Text>
              <Text style={styles.gstActionTitle}>GST Reports</Text>
              <Text style={styles.gstActionSubtitle}>View Analytics</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* GST Status Cards */}
        <GSTStatusCard
          title="GSTR-1 Filing"
          period="December 2023"
          status="Filed"
          statusColor="#10B981"
          details="Filed on: Jan 10, 2024 • 1,247 invoices"
        />
        <GSTStatusCard
          title="GSTR-3B Return"
          period="January 2024"
          status="Due Soon"
          statusColor="#F59E0B"
          details="Due: Jan 20, 2024 • Tax liability: ₹45,600"
          showButton={true}
          buttonText="File Now"
        />
        <GSTStatusCard
          title="Input Tax Credit"
          period="Available ITC"
          amount="₹1,23,450"
          details="This Month"
          showButton={true}
          buttonText="View Details"
        />
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
    padding: 16,
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
  gstButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  gstButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  gstSearchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  gstSearchInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  gstSearchButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: 'center',
  },
  gstSearchButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  gstActionsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  gstActionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gstActionGradient: {
    padding: 24,
    alignItems: 'center',
  },
  gstActionEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  gstActionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gstActionSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default GSTScreen;