// App.js - Main Navigation Setup
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import all screens
import HomeScreen from './src/screens/HomeScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import PartiesScreen from './src/screens/PartiesScreen';
import StaffScreen from './src/screens/StaffScreen';
import MoreScreen from './src/screens/MoreScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Modal screens
// import VoiceCommandScreen from './src/screens/modals/VoiceCommandScreen';
import AIPredictionsScreen from './src/screens/modals/AIPredictionsScreen';
import DuePaymentsScreen from './src/screens/modals/DuePaymentsScreen';
import AddPartyScreen from './src/screens/modals/AddPartyScreen';
import BillSortingScreen from './src/screens/modals/BillSortingScreen';
import TransporterBookingScreen from './src/screens/modals/TransporterBookingScreen';
import AttendanceScreen from './src/screens/modals/AttendanceScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Payments':
            iconName = 'payment';
            break;
          case 'Parties':
            iconName = 'people';
            break;
          case 'Staff':
            iconName = 'person';
            break;
          case 'More':
            iconName = 'more-horiz';
            break;
          default:
            iconName = 'home';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6366F1',
      tabBarInactiveTintColor: '#6B7280',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Payments" component={PaymentsScreen} />
    <Tab.Screen name="Parties" component={PartiesScreen} />
    <Tab.Screen name="Staff" component={StaffScreen} />
    <Tab.Screen name="More" component={MoreScreen} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      {/* <Stack.Screen 
        name="VoiceCommand" 
        component={VoiceCommandScreen}
        options={{ presentation: 'modal' }}
      /> */}
      <Stack.Screen 
        name="AIPredictions" 
        component={AIPredictionsScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="DuePayments" 
        component={DuePaymentsScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="AddParty" 
        component={AddPartyScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="BillSorting" 
        component={BillSortingScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="TransporterBooking" 
        component={TransporterBookingScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="Attendance" 
        component={AttendanceScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;