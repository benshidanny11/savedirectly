import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import PhoneInputText from '../components/PhoneInputText';
import InputText from '../components/InputText';
import CustomButton from '../components/CustomButton';

export default function LoginPage({ navigation }) {
  return (
    <View style={styles.loginPage}>
      <Text style={styles.loginTItle}>Login</Text>
      <View>
        <PhoneInputText />
        <InputText label="Password" placeholder="Enter password" isPassword={true} isNumeric={true} />
      </View>
      <Text style={{ color: '#fff' }}>Or</Text>
      <TouchableOpacity onPress={() => {
        navigation.replace('SignupPage');
      }}>
        <View style={styles.registerOption}><Text style={styles.didntRegisgter}>Not registered? </Text><Text style={styles.registerHere}>Register here</Text></View>
      </TouchableOpacity>
      <CustomButton label="Login" onTap={()=>{
        navigation.replace('DashboardPage');
      }} />
    </View>
  );
};

const styles = StyleSheet.create(
  {
    loginPage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#37517E',
    },
    loginTItle: {
      color: '#ccc',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    registerOption: {
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 10,
    },
    didntRegisgter: {
      color: '#fff',

    },
    registerHere: {
      marginRight: 10,
      color: '#F49B21',
      fontWeight: '600',
    },
  }
);
