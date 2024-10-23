import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { sendHTTPRequest } from '../api/helper';
import API_CONSTANTS from '../constants/API_CONSTANTS';
import STRING_CONSTANTS from '../constants/STRING_CONSTANTS';
import InputText from '../components/InputText';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';

export default function SavePage({ navigation }) {
    const [productId, setProductId] = useState('');

    const [merchantId, setMerchantId] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    //const { registrationToken, registrationTokenType } = routes.params;
    const producIdHandler = async (text) => {
        setProductId(text);
    };

    const merchantIdHandler = async (text) => {
        setMerchantId(text);
    };

    const amountHandler = async (text) => {
        setAmount(text);
    };



    const handleSave = async () => {
        if (merchantId.length > 0 && productId.length > 0 && amount.length > 0 && pin.length > 0) {
            //Proceed with registration
            const body = {
                merchantId: merchantId,
                productId: productId,
                amount: amount,
                pin:pin,
                source: 'APP',
            };

            const res = await sendHTTPRequest({ url: API_CONSTANTS.SAVING_PROCESS_API, body, token: null, method: STRING_CONSTANTS.POST_METHOD });
            if (res?.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'You have successfully registered'
                });
                navigation.replace('LoginPage');
            }
        } else {

        }
    };

    const pinInputHandler = (text) => {
        setPin(text);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#37517E' }}>
            <Image
                source={require('../assets/app_logo2.png')}
                style={{ alignSelf: 'center' }}
            />
            <View style={styles.loginPage}>
                <Text style={styles.loginTItle}>Save money</Text>
                <View>
                    <InputText label="Product id" placeholder="Product id" onChangeText={producIdHandler} value={productId} />
                    <InputText label="Merchant id" placeholder="Merchant id" value={merchantId} onChangeText={merchantIdHandler} />
                    <InputText label="Amount" placeholder="Amount" isNumeric={true} value={amount} onChangeText={amountHandler} />
                    <InputText label="Pin" placeholder="Pin" isNumeric={true} isPassword={true} value={pin} onChangeText={pinInputHandler} />
                </View>
                <CustomButton label="Save" onTap={handleSave} />
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
