import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {sendHTTPRequest} from '../api/helper';
import API_CONSTANTS from '../constants/API_CONSTANTS';
import STRING_CONSTANTS from '../constants/STRING_CONSTANTS';
import InputText from '../components/InputText';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavePage({navigation, route}) {
  const merchant = route.params?.merchant;
  const [productId, setProductId] = useState('');
  const [merchantId, setMerchantId] = useState(merchant || {});
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const amountHandler = async text => {
    setAmount(text);
  };
  useEffect(() => {
    if (merchantId.merchantId) {
      setProductId(merchantId.products ? merchantId.products[0] : {});
    }
  }, [merchantId]);

  const handleSave = async () => {
    if (
      merchantId?.merchantId?.length > 0 &&
      productId?.merchantProductId?.length > 0 &&
      amount >= 0 &&
      pin.length > 0
    ) {
      Alert.alert(
        'Confirm Save',
        `merchant: ${merchantId.merchantName} ,product: ${productId.merchantProductName} amount : ${amount}, Are you sure you want to save? `,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: async () => {
              setIsLoading(true);
              const body = {
                merchantId: merchantId.merchantId,
                productId: productId.merchantProductId,
                amount: amount,
                pin: pin,
                source: 'APP',
              };
              const user = await AsyncStorage.getItem('user');
              const res = await sendHTTPRequest({
                url: API_CONSTANTS.SAVING_PROCESS_API,
                body,
                token: JSON.parse(user).accessToken,
                method: STRING_CONSTANTS.POST_METHOD,
                registrationTokenType: STRING_CONSTANTS.AUTH_TYPE_BEARER,
              });
              setIsLoading(false);

              if (res?.status === 201) {
                Alert.alert(
                  ' Success',
                  'Thank you for saving with us, please check your phone for confirming transaction or dial *182*7*1#',
                  [
                    {
                      text: 'Close',
                      onPress: async () => {
                        navigation.replace('DashboardPage');
                      },
                    },
                  ],
                );
              }
            },
          },
        ],
      );
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill out all fields',
      });
    }
  };

  const pinInputHandler = text => {
    setPin(text);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#37517E',
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Icon
          name={'arrow-back'}
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontWeight: '900',
          }}>
          Saving
        </Text>
      </View>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <ScrollView style={{flex: 1}}>
        <View style={{top: 50}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'rgba(55, 81, 126, 0.9)',
              padding: 10,
              maxHeight: 500,
              borderRadius: 10,
            }}>
            <View>
              <Text style={styles.label}>{`Merchant`}</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  navigation.navigate('Merchant', {setMerchant: setMerchantId})
                }>
                <Text style={styles.label}>
                  {merchantId?.merchantName || `select Merchant`}
                </Text>
              </TouchableOpacity>
              <Text style={styles.label}>{`Product`}</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  navigation.navigate('Products', {
                    setProduct: setProductId,
                    selectedMerchant: merchantId.merchantId,
                  })
                }>
                <Text style={styles.label}>
                  {productId?.merchantProductName || `select Product`}
                </Text>
              </TouchableOpacity>
              <InputText
                label="Amount"
                placeholder="Amount"
                isNumeric={true}
                value={amount}
                onChangeText={amountHandler}
              />
              <InputText
                label="Pin"
                placeholder="Pin"
                isNumeric={true}
                isPassword={true}
                value={pin}
                onChangeText={pinInputHandler}
              />
            </View>
            <View style={{alignSelf: 'center'}}>
              <CustomButton
                label="Save"
                onTap={handleSave}
                disabled={!pin.length || !amount}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 15,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 16,
  },
});
