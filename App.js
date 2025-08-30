// import AddStaffScreen from './src/screens/staff/AddStaffScreen';
import EditStaffScreen from './src/screens/staff/EditStaffScreen';
// App.js - Main Navigation Setup
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DemoProvider } from './src/context/DemoContext';

// Import all screens
import HomeScreen from './src/screens/HomeScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import PartiesScreen from './src/screens/PartiesScreen';
import StaffScreen from './src/screens/StaffScreen';
import MoreScreen from './src/screens/MoreScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Modal screens
// import VoiceCommandScreen from './src/screens/modals/VoiceCommandScreen';
// import AIPredictionsScreen from './src/screens/modals/AIPredictionsScreen';
import DuePaymentsScreen from './src/screens/payments/due-payments-screen';
import AddPartyScreen from './src/screens/parties/add-party-screen';
import EditPartyScreen from './src/screens/parties/edit-party-screen';
import BillSortingScreen from './src/screens/yarn/bill-sorting-screen';
import ProductManageScreen from './src/screens/product/product-manage-screen';
import AddProductScreen from './src/screens/product/add-product-screen';
import EditProductScreen from './src/screens/product/edit-product-screen';
// import AttendanceScreen from './src/screens/staff/attendance-screen';
import StaffAttendanceScreen from './src/screens/staff/StaffAttendanceScreen';

//Auth Screens - Temporarily disabled
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';

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
          case 'Demo':
            iconName = 'star';
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
  <DemoProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
        {/* Auth Screens - Temporarily disabled */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Main App Tabs */}
        <Stack.Screen name="Main" component={TabNavigator} />

        {/* Modals */}
        {/* <Stack.Screen 
          name="AIPredictions" 
          component={AIPredictionsScreen}
          options={{ presentation: 'modal' }}
        /> */}
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
          name="EditParty" 
          component={EditPartyScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="BillSorting" 
          component={BillSortingScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="ProductManage" 
          component={ProductManageScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="AddProduct" 
          component={AddProductScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="EditProduct" 
          component={EditProductScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="StaffAttendance" 
          component={StaffAttendanceScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="EditStaff" 
          component={EditStaffScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </DemoProvider>
);

export default App;