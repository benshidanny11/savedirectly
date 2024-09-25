/* eslint-disable space-infix-ops */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import PhoneInputText from '../components/PhoneInputText';
import InputText from '../components/InputText';
import CustomButton from '../components/CustomButton';
import { sendHTTPRequest } from '../api/helper';
import API_CONSTANTS from '../constants/API_CONSTANTS';
import STRING_CONSTANTS from '../constants/STRING_CONSTANTS';
import Toast from 'react-native-toast-message';

const RegisterDetailsPage = ({route,navigation}) => {
  const [nId, setNId]=useState('');

  const [names, setNames]=useState('');
  const [pin, setPin]=useState('');
  const { registrationToken, registrationTokenType }=route.params;
  const nIdInputHandler = async (text)=>{
    setNId(text);
    if(text.length===16){
     const res=await sendHTTPRequest({url:`${API_CONSTANTS.VERYFY_ID_NUMBER}/${text}`, token: registrationToken, method: STRING_CONSTANTS.GET_METHOD, registrationTokenType});
     console.log(res);
     if(res.status===200){
      setNId(text);
      setNames(`${res.firstname} ${res.lastname}`);
     }
    }
  };



  const handleRegister=async()=>{
    if(nId.length>0 && names.length>0 && pin.length> 0){
      //Proceed with registration
      const body={
        pin,
        isTermsAccepted: true,
      };
     const res = await sendHTTPRequest({url:API_CONSTANTS.USER_REGISTRATION, body, token:registrationToken, method: STRING_CONSTANTS.POST_METHOD, registrationTokenType});
     console.log(res);
     if(res.status===200){
      Toast.show({type: 'success',
        text1: 'Success',
        text2: 'You have successfully registered'})
      navigation.replace('LoginPage');
     }
    }else{

    }
  };

  const pinInputHandler=(text)=>{
    setPin(text);
  };

  return (
    <View style={styles.loginPage}>
      <Text style={styles.loginTItle}>Register</Text>
      <View>
        <InputText label="ID number" placeholder="Enter ID number"  onChangeText={nIdInputHandler} value={nId}/>
        <InputText label="Names" placeholder="Enter names"  editable={false} value={names}/>
        <InputText label="Pin" placeholder="Enter pin" isNumeric={true} isPassword={true} value={pin} onChangeText={pinInputHandler}/>
      </View>
      <Text style={{ color: '#fff' }}>Or</Text>
      <TouchableOpacity onPress={() => {
        console.log('Pressed');
        navigation.replace('LoginPage');
      }}>
        <View style={styles.registerOption}><Text style={styles.didntRegisgter}>Alread registered? </Text><Text style={styles.registerHere}>Login here</Text></View>
      </TouchableOpacity>
      <CustomButton label="Register" onTap={handleRegister} />
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
