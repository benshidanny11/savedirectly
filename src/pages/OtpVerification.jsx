import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function OtpVerification({navigation}) {
    return (

        <View style={styles.loginPage}>
                <View><Text style={styles.loginTItle}>Verification code</Text></View>
                <View style={styles.otpContainer}><OTPInputView pinCount={6}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code => {
                        navigation.replace('RegisterDetailsPage');
                    })}
                /></View>
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
            padding:10,
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
        otpContainer:{ 
            height:60,
        },
        borderStyleBase: {
            width: 30,
            height: 45,
        },
        borderStyleHighLighted: {
            borderColor: "#03DAC6",
           
        },
        underlineStyleBase: {
            width: 50,
            height: 45,
            borderWidth: 1,
        },
        underlineStyleHighLighted: {
            borderColor: "#03DAC6",
        },
    }
);