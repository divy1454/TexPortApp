import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import DemoBanner from '../../components/DemoBanner';
import ToolCard from '../../components/ToolCard';
import { useDemoMode } from '../context/DemoContext';
import styles from '../../components/Css/MoreScreen.styles';

const { width } = Dimensions.get('window');

// Local FeatureItem component (consolidated from MoreFeatureItem)
const FeatureItem = ({ title, subtitle, buttonText, buttonColor, onPress }) => (
  <View style={styles.moreFeatureItem}>
    <View style={styles.moreFeatureInfo}>
      <Text style={styles.moreFeatureTitle}>{title}</Text>
      <Text style={styles.moreFeatureSubtitle}>{subtitle}</Text>
    </View>
    <TouchableOpacity 
      style={[styles.moreFeatureButton, { backgroundColor: buttonColor }]}
      onPress={onPress}
    >
      <Text style={styles.moreFeatureButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

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
            <FeatureItem
              title="Purchase Reminders"
              subtitle="5 pending reminders"
              buttonText="View"
              buttonColor="#F59E0B"
            />
            <FeatureItem
              title="Book Transporter"
              subtitle="Truck booking plugin"
              buttonText="Book"
              buttonColor="#10B981"
              onPress={() => handleNavigateWithDemoCheck('TransporterBooking')}
            />
            <FeatureItem
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

export default MoreScreen;
