import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BillSortingScreen = ({ navigation }) => {
  const sortingOptions = [
    {
      id: 'amount-asc',
      title: '💰 Amount - Ascending',
      subtitle: 'Sort from lowest to highest amount',
      colors: ['#3B82F6', '#6366F1']
    },
    {
      id: 'amount-desc',
      title: '💰 Amount - Descending',
      subtitle: 'Sort from highest to lowest amount',
      colors: ['#6366F1', '#8B5CF6']
    },
    {
      id: 'date-asc',
      title: '📅 Date - Ascending',
      subtitle: 'Sort from oldest to newest bills',
      colors: ['#10B981', '#059669']
    },
    {
      id: 'date-desc',
      title: '📅 Date - Descending',
      subtitle: 'Sort from newest to oldest bills',
      colors: ['#059669', '#0D9488']
    },
    {
      id: 'status',
      title: '⚠️ Status Priority',
      subtitle: 'Overdue → Pending → Paid',
      colors: ['#EF4444', '#F97316']
    },
    {
      id: 'company',
      title: '🏢 Company Name',
      subtitle: 'Sort alphabetically by company',
      colors: ['#8B5CF6', '#EC4899']
    }
  ];

  const handleSortSelection = (option) => {
    Alert.alert(
      'Sorting Applied!',
      `Bills have been sorted by: ${option.title}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📊 Bill Sorting Options</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Choose how you want to sort your bills:</Text>
        
        <View style={styles.sortingOptions}>
          {sortingOptions.map((option) => (
            <TouchableOpacity 
              key={option.id}
              style={styles.sortingOption} 
              onPress={() => handleSortSelection(option)}
            >
              <LinearGradient colors={option.colors} style={styles.sortingOptionGradient}>
                <View style={styles.sortingOptionContent}>
                  <Text style={styles.sortingOptionTitle}>{option.title}</Text>
                  <Text style={styles.sortingOptionSubtitle}>{option.subtitle}</Text>
                </View>
                <Icon name="arrow-forward-ios" size={20} color="rgba(255, 255, 255, 0.8)" />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.currentSortInfo}>
          <Text style={styles.currentSortLabel}>Current Sort:</Text>
          <Text style={styles.currentSortValue}>📅 Date - Descending (Default)</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cancelSortButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelSortButtonText}>Cancel</Text>
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
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  sortingOptions: {
    gap: 12,
    marginBottom: 24,
  },
  sortingOption: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sortingOptionGradient: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortingOptionContent: {
    flex: 1,
  },
  sortingOptionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sortingOptionSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  currentSortInfo: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentSortLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  currentSortValue: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  cancelSortButton: {
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelSortButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BillSortingScreen;