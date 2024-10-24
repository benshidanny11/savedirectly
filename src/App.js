import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import OtpVerification from './pages/OtpVerification';
import RegisterDetailsPage from './pages/RegisterDetailsPage';
import DashboardPage from './pages/DashboardPage';
import Toast, { ErrorToast } from 'react-native-toast-message';
import SavePage from './pages/SavePage';
import store from './store/store';
import Merchant from './pages/Merchant';
import Products from './pages/Products';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar barStyle={'light-content'} backgroundColor={'#37517E'} />
          <Stack.Navigator
            initialRouteName="LandingPage"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="SignupPage" component={SignupPage} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} />
            <Stack.Screen name="Merchant" component={Merchant} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen
              name="RegisterDetailsPage"
              component={RegisterDetailsPage}
            />
            <Stack.Screen name="DashboardPage" component={DashboardPage} />
            <Stack.Screen name="SavePage" component={SavePage} />
          </Stack.Navigator>
          <Toast
            config={toastConfig}
          />
        </NavigationContainer>
      </Provider>
    </KeyboardAvoidingView>
  );
}
const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 13,
        color:"#000",
        
        
      }}
    />
  ),
};
export default App;
