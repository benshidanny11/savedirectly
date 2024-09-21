import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import PhoneInputText from '../components/PhoneInputText';
import InputText from '../components/InputText';
import CustomButton from '../components/CustomButton';

const RegisterDetailsPage = ({navigation}) => {
  return (
    <View style={styles.loginPage}>
      <Text style={styles.loginTItle}>Register</Text>
      <View>
        <InputText label="ID number" placeholder="Enter ID number"  />
        <InputText label="Names" placeholder="Enter names"  editable={false}/>
        <InputText label="Pin" placeholder="Enter pin" isNumeric={true} isPassword={true}/>
      </View>
      <Text style={{ color: '#fff' }}>Or</Text>
      <TouchableOpacity onPress={() => {
        console.log("Pressed")
        navigation.replace('LoginPage');
      }}>
        <View style={styles.registerOption}><Text style={styles.didntRegisgter}>Alread registered? </Text><Text style={styles.registerHere}>Login here</Text></View>
      </TouchableOpacity>
      <CustomButton label="Register" />
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

export default RegisterDetailsPage;
