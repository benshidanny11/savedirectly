import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useState} from 'react';
import PhoneInputText from '../components/PhoneInputText';
import InputText from '../components/InputText';
import CustomButton from '../components/CustomButton';
import {sendHTTPRequest} from '../api/helper';
import {generateBase64} from '../utils/appUtils';
import API_CONSTANTS from '../constants/API_CONSTANTS';
import STRING_CONSTANTS from '../constants/STRING_CONSTANTS';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LoginPage({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [countryCallingCode, setCountryCallingCode] = useState('250');
  const handlePhoneNumber = text => {
    setPhoneNumber(text);
  };

  const handlePin = text => {
    setPassword(text);
  };
  const handleLogin = async () => {
    const encodedToken = generateBase64(
      `${countryCallingCode}${phoneNumber}`,
      password,
    );
    const res = await sendHTTPRequest({
      url: API_CONSTANTS.USER_LOGIN,
      token: encodedToken,
      method: STRING_CONSTANTS.GET_METHOD,
      registrationTokenType: STRING_CONSTANTS.AUTH_TYPE_BASIC,
    });
    if (res?.status === 200) {
      AsyncStorage.setItem("user",JSON.stringify(res))
      navigation.replace('DashboardPage');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Incorect credentials',
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
        <Text style={styles.loginTItle}>Login</Text>
        <View>
          <PhoneInputText
            onChangeHandler={handlePhoneNumber}
            setCountryCallingCode={setCountryCallingCode}
          />
          <View style={{flexDirection: 'row'}}>
            <InputText
              label="Password"
              placeholder="Enter password"
              isPassword={true}
              isNumeric={true}
              onChangeText={handlePin}
            />
          </View>
        </View>
        <Text style={{color: '#fff'}}>Or</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('SignupPage');
          }}>
          <View style={styles.registerOption}>
            <Text style={styles.didntRegisgter}>Not registered? </Text>
            <Text style={styles.registerHere}>Register here</Text>
          </View>
        </TouchableOpacity>
        <CustomButton
          label="Login"
          onTap={handleLogin}
          disabled={!password || !phoneNumber}
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
