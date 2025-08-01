import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Mr. Rajesh Kumar',
    email: 'rajesh.kumar@texport.com',
    phone: '+91 98765 43210',
    business: 'TexPort Digital Textile',
    gst: '24ABCDE1234F1Z5',
    address: '123 Textile Market, Ahmedabad, Gujarat 380001',
    joinDate: 'January 2024',
  });

  const handleSave = () => {
    Alert.alert(
      'Profile Updated',
      'Your profile has been updated successfully!',
      [{ text: 'OK', onPress: () => setIsEditing(false) }],
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          // Clear user data from AsyncStorage
          await AsyncStorage.removeItem('user');
          // Navigate to Welcome screen and reset stack
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          });
        },
      },
    ]);
  };

  const renderField = (label, value, key, icon) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <Icon name={icon} size={20} color="#6366F1" />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      {isEditing ? (
        <TextInput
          style={styles.fieldInput}
          value={profileData[key]}
          onChangeText={text =>
            setProfileData(prev => ({ ...prev, [key]: text }))
          }
          multiline={key === 'address'}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          style={styles.editButton}
        >
          <Icon name={isEditing ? 'save' : 'edit'} size={20} color="#6366F1" />
          <Text style={styles.editButtonText}>
            {isEditing ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Avatar Section */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.avatarSection}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>T</Text>
            </View>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileSubtitle}>{profileData.business}</Text>
            <View style={styles.joinDateContainer}>
              <Icon
                name="calendar-today"
                size={16}
                color="rgba(255, 255, 255, 0.8)"
              />
              <Text style={styles.joinDate}>
                Member since {profileData.joinDate}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Profile Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          {renderField('Full Name', profileData.name, 'name', 'person')}
          {renderField('Email Address', profileData.email, 'email', 'email')}
          {renderField('Phone Number', profileData.phone, 'phone', 'phone')}
          {renderField(
            'Business Name',
            profileData.business,
            'business',
            'business',
          )}
          {renderField('GST Number', profileData.gst, 'gst', 'description')}
          {renderField(
            'Address',
            profileData.address,
            'address',
            'location-on',
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity style={styles.actionItem}>
            <Icon name="notifications" size={24} color="#6366F1" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Notification Settings</Text>
              <Text style={styles.actionSubtitle}>
                Manage your alerts and notifications
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Icon name="security" size={24} color="#6366F1" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Security Settings</Text>
              <Text style={styles.actionSubtitle}>
                Change password and security options
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Icon name="help" size={24} color="#6366F1" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Help & Support</Text>
              <Text style={styles.actionSubtitle}>
                Get help and contact support
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Icon name="info" size={24} color="#6366F1" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>About TexPort</Text>
              <Text style={styles.actionSubtitle}>
                App version and information
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color="#EF4444" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 0,
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
    marginTop: 25,
    padding: 8,
  },
  headerTitle: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  editButton: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    gap: 4,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    padding: 32,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  joinDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  joinDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  infoSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  fieldValue: {
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  fieldInput: {
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  actionsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default ProfileScreen;
