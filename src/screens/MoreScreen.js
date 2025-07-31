import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import MoreFeatureItem from '../../components/MoreFeatureItem';
import ToolCard from '../../components/ToolCard';

const { width } = Dimensions.get('window');

const MoreScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>⚡ Additional Features</Text>
        
        {/* Yaan & Transportation */}
        <View style={styles.moreCard}>
          <Text style={styles.moreCardTitle}>🚛 Yaan & Transportation</Text>
          <View style={styles.moreCardContent}>
            <MoreFeatureItem
              title="Purchase Reminders"
              subtitle="5 pending reminders"
              buttonText="View"
              buttonColor="#F59E0B"
            />
            <MoreFeatureItem
              title="Book Transporter"
              subtitle="Truck booking plugin"
              buttonText="Book"
              buttonColor="#10B981"
              onPress={() => navigation.navigate('TransporterBooking')}
            />
            <MoreFeatureItem
              title="Other Costs"
              subtitle="Monthly expenses"
              buttonText="₹45,600"
              buttonColor="#3B82F6"
            />
          </View>
        </View>

        {/* Quick Tools Grid */}
        <View style={styles.toolsGrid}>
          <ToolCard 
            icon="📊" 
            title="Bill Sorting" 
            subtitle="Asc/Desc Order" 
            onPress={() => navigation.navigate('BillSorting')} 
          />
          <ToolCard icon="🧮" title="Calculator" subtitle="Quick Math" />
          <ToolCard icon="📈" title="Analytics" subtitle="Business Reports" />
          <ToolCard icon="⚙️" title="Settings" subtitle="App Config" />
        </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  moreCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moreCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  moreCardContent: {
    gap: 12,
  },
  aiCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  aiCardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  aiFeatureButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  aiFeatureTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  aiFeatureSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});

export default MoreScreen;
