import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AIPredictionsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🤖 AI Market Predictions</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.predictionCard}>
          <View style={styles.predictionHeader}>
            <Text style={styles.predictionTitle}>Cotton Demand</Text>
            <View style={styles.predictionBadge}>
              <Text style={styles.predictionBadgeText}>↗ +15%</Text>
            </View>
          </View>
          <Text style={styles.predictionText}>Expected surge in Mumbai region this month</Text>
          <Text style={styles.predictionRecommendation}>💡 Recommendation: Stock up on premium cotton varieties</Text>
        </LinearGradient>
        
        <LinearGradient colors={['#3B82F6', '#6366F1']} style={styles.predictionCard}>
          <View style={styles.predictionHeader}>
            <Text style={styles.predictionTitle}>Silk Market</Text>
            <View style={styles.predictionBadge}>
              <Text style={styles.predictionBadgeText}>↗ Rising</Text>
            </View>
          </View>
          <Text style={styles.predictionText}>Wedding season driving premium silk demand</Text>
          <Text style={styles.predictionRecommendation}>💡 Recommendation: Focus on high-quality silk varieties</Text>
        </LinearGradient>
        
        <LinearGradient colors={['#F59E0B', '#F97316']} style={styles.predictionCard}>
          <View style={styles.predictionHeader}>
            <Text style={styles.predictionTitle}>Polyester Trends</Text>
            <View style={styles.predictionBadge}>
              <Text style={styles.predictionBadgeText}>→ Stable</Text>
            </View>
          </View>
          <Text style={styles.predictionText}>Consistent demand across all regions</Text>
          <Text style={styles.predictionRecommendation}>💡 Recommendation: Good time for bulk purchases</Text>
        </LinearGradient>

        <LinearGradient colors={['#8B5CF6', '#EC4899']} style={styles.predictionCard}>
          <View style={styles.predictionHeader}>
            <Text style={styles.predictionTitle}>Regional Insights</Text>
            <View style={styles.predictionBadge}>
              <Text style={styles.predictionBadgeText}>📍 Local</Text>
            </View>
          </View>
          <Text style={styles.predictionText}>Your area shows 23% higher demand for cotton blends</Text>
          <Text style={styles.predictionRecommendation}>💡 Recommendation: Expand cotton blend inventory</Text>
        </LinearGradient>
      </ScrollView>

      <TouchableOpacity style={styles.gotItButton} onPress={() => navigation.goBack()}>
        <Text style={styles.gotItButtonText}>Got It!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  predictionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  predictionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  predictionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  predictionBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  predictionText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginBottom: 8,
  },
  predictionRecommendation: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
  },
  gotItButton: {
    backgroundColor: '#8B5CF6',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  gotItButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AIPredictionsScreen;