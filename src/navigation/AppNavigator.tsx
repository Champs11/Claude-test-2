import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import QRScanScreen from '../screens/QRScanScreen';
import FaultSelectionScreen from '../screens/FaultSelectionScreen';
import ClaimFormScreen from '../screens/ClaimFormScreen';
import InsurerSelectionScreen from '../screens/InsurerSelectionScreen';
import ClaimSummaryScreen from '../screens/ClaimSummaryScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1B4F9B',
        },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
        },
        contentStyle: {
          backgroundColor: '#F0F4F8',
        },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'ClaimSafe', headerBackVisible: false }}
      />
      <Stack.Screen
        name="QRScan"
        component={QRScanScreen}
        options={{ title: 'Scan Licence QR' }}
      />
      <Stack.Screen
        name="FaultSelection"
        component={FaultSelectionScreen}
        options={{ title: 'What Happened?' }}
      />
      <Stack.Screen
        name="ClaimForm"
        component={ClaimFormScreen}
        options={{ title: 'Claim Details' }}
      />
      <Stack.Screen
        name="InsurerSelection"
        component={InsurerSelectionScreen}
        options={{ title: 'Your Insurer' }}
      />
      <Stack.Screen
        name="ClaimSummary"
        component={ClaimSummaryScreen}
        options={{ title: 'Review Claim' }}
      />
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{ title: 'Submitted!', headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
