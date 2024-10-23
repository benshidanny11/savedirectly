/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PhoneInputText from '../components/PhoneInputText';
import InputText from '../components/InputText';
import CustomButton from '../components/CustomButton';
import {sendHTTPRequest} from '../api/helper';
import STRING_CONSTANTS from '../constants/STRING_CONSTANTS';
import API_CONSTANTS from '../constants/API_CONSTANTS';
import Toast from 'react-native-toast-message';

export default function SignupPage({navigation}) {
  const [countryCallingCode, setCountryCallingCode] = useState();
  useEffect(() => {
    if (!countryCallingCode)
      {setCountryCallingCode({cca2: 'RW', callinCode: '250'});}
  }, []);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const handlePhoneInput = phone => {
    setPhoneNumber(phone);
  };

  const handleSignup = async () => {
    console.log('Sending request...');
    setisLoading(true);
    const body = {
      countryCode: countryCallingCode.cca2,
      msisdn:
        countryCallingCode.callingCode +
           phoneNumber,
    };
    const res = await sendHTTPRequest({
      body,
      method: STRING_CONSTANTS.POST_METHOD,
      url: API_CONSTANTS.VERIFY_PHONE_NUMBER,
    });
    setisLoading(false);
    if (res?.registrationToken && res?.otp) {
      navigation.replace('OtpVerification', {
        registrationToken: res.registrationToken,
        otp: res.otp,
        registrationTokenType: res.registrationTokenType,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error occured',
        text2: 'Something went wrong',
      });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#37517E'}}>
      <Image
        source={require('../assets/app_logo2.png')}
        style={{alignSelf: 'center'}}
      />
      <View style={styles.loginPage}>
        <Text style={styles.loginTItle}>Register</Text>
        <View>
          <PhoneInputText
            onChangeHandler={handlePhoneInput}
            value={phoneNumber}
            setCountryCallingCode={setCountryCallingCode}
          />
        </View>
        <Text style={{color: '#fff'}}>Or</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('Pressed');
            navigation.replace('LoginPage');
          }}>
          <View style={styles.registerOption}>
            <Text style={styles.didntRegisgter}>Already registered? </Text>
            <Text style={styles.registerHere}>Login here</Text>
          </View>
        </TouchableOpacity>
        <CustomButton
          label={isLoading ? 'Please wait' : 'Send verification'}
          onTap={handleSignup}
          disabled={isLoading || !phoneNumber}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
