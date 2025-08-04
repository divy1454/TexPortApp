import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import DemoBanner from '../../components/DemoBanner';
import MoreFeatureItem from '../../components/MoreFeatureItem';
import ToolCard from '../../components/ToolCard';
import { useDemoMode } from '../context/DemoContext';

const { width } = Dimensions.get('window');

const MoreScreen = ({ navigation }) => {
  const { demoMode, showDemoAlert, disableDemoMode } = useDemoMode();

  const handleExitDemo = () => {
    disableDemoMode();
    navigation.navigate('Welcome');
  };

  const handleNavigateWithDemoCheck = (screenName) => {
    if (demoMode) {
      showDemoAlert();
      return;
    }
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <DemoBanner navigation={navigation} />
      
      <ScrollView style={styles.content}>
        {demoMode && (
          <View style={styles.demoCard}>
            <Text style={styles.demoCardTitle}>🎯 Demo Mode Active</Text>
            <Text style={styles.demoCardText}>
              You're exploring the app with sample data. Features are limited in demo mode.
            </Text>
            <TouchableOpacity style={styles.exitDemoButton} onPress={handleExitDemo}>
              <Text style={styles.exitDemoButtonText}>Exit Demo Mode</Text>
            </TouchableOpacity>
          </View>
        )}
        
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
              onPress={() => handleNavigateWithDemoCheck('TransporterBooking')}
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
            onPress={() => handleNavigateWithDemoCheck('BillSorting')} 
          />
          <ToolCard 
            icon="🧮" 
            title="Calculator" 
            subtitle="Quick Math" 
            onPress={() => demoMode && showDemoAlert()}
          />
          <ToolCard 
            icon="📈" 
            title="Analytics" 
            subtitle="Business Reports" 
            onPress={() => demoMode && showDemoAlert()}
          />
          <ToolCard 
            icon="⚙️" 
            title="Settings" 
            subtitle="App Config" 
            onPress={() => demoMode && showDemoAlert()}
          />
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
  demoCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  demoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 8,
  },
  demoCardText: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 12,
    lineHeight: 20,
  },
  exitDemoButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  exitDemoButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
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
