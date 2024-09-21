/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import OtpVerification from './pages/OtpVerification';
import RegisterDetailsPage from './pages/RegisterDetailsPage';
import DashboardPage from './pages/DashboardPage';

const Stack = createNativeStackNavigator();

function App() {


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="RegisterDetailsPage" component={RegisterDetailsPage} />
        <Stack.Screen name="DashboardPage" component={DashboardPage}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
