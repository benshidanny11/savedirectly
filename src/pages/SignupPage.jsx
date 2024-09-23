import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import PhoneInputText from '../components/PhoneInputText';
import InputText from '../components/InputText';
import CustomButton from '../components/CustomButton';
import { sendHTTPRequest } from '../api/helper';
import STRING_CONSTANTS from '../constants/STRING_CONSTANTS';
import API_CONSTANTS from '../constants/API_CONSTANTS';

export default function SignupPage({ navigation }) {

    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneInput = (phone) => {
        setPhoneNumber(phone);
    };

    const handleSignup = async () => {
        console.log('Sending request...');
        const body = { 'countryCode': '+250', 'msisdn': phoneNumber.startsWith('0') ? phoneNumber.substring(1, phoneNumber.length - 1) : phoneNumber };
        const res = await sendHTTPRequest({body, method: STRING_CONSTANTS.POST_METHOD, url: API_CONSTANTS.VERIFY_PHONE_NUMBER});
      //  console.log(res);
        //navigation.replace('OtpVerification');
    };

    return (
        <View style={styles.loginPage}>
            <Text style={styles.loginTItle}>Register</Text>
            <View>
                <PhoneInputText onChangeHandler={handlePhoneInput} value={phoneNumber} />
            </View>
            <Text style={{ color: '#fff' }}>Or</Text>
            <TouchableOpacity onPress={() => {
                console.log('Pressed');
                navigation.replace('LoginPage');
            }}>
                <View style={styles.registerOption}><Text style={styles.didntRegisgter}>Already registered? </Text><Text style={styles.registerHere}>Login here</Text></View>
            </TouchableOpacity>
            <CustomButton label="Send verification" onTap={handleSignup} />
        </View>
    );
}

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
