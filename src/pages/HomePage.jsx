import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONSTANTS from '../constants/API_CONSTANTS';
import {sendHTTPRequest} from '../api/helper';
import STRING_CONSTANTS from '../constants/STRING_CONSTANTS';
import Toast from 'react-native-toast-message';

const HomePage = ({navigation}) => {
  const [user, setUser] = useState();
  const [balance, setBalance] = useState();
  const [currency, setCurrency] = useState();
  const [merchant, setMerchant] = useState();
  useEffect(() => {
    AsyncStorage.getItem('user').then(res => {
      if (res) {
        setUser(JSON.parse(res));
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      getBalance(user).then(res => {
        setCurrency(res.currency);
        setBalance(res.data);
      });
      getMerchant(user).then(res => {
        setMerchant(res.data);
      });
    }
  }, [user]);
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{backgroundColor: '#37517E', padding: 10}}>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontWeight: '900',
          }}>
          {`Hi ${user?.customerNames?.trim().replace(/\s+/g, ' ')}`}
        </Text>
      </View>
      <View>
        {!balance && (
          <View
            style={{
              backgroundColor: 'rgba(55, 81, 126, 0.8)"',
              padding: 20,
              borderRadius: 10,
              margin: 20,
            }}>
            <Text
              style={{
                color: 'white',
              }}>{`Balance`}</Text>
            <View
              style={{
                backgroundColor: 'rgba(55, 81, 126, 0.5)',
                padding: 10,
                borderRadius: 10,
                top: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '900',
                }}>
                OOOO
              </Text>
            </View>
          </View>
        )}
        <ScrollView
          horizontal={true}
          style={{alignSelf: 'center', top: 20}}
          contentContainerStyle={{flexGrow: 1}}>
          {balance?.map((item, key) => {
            return (
              <View
                key={key}
                style={{
                  backgroundColor: 'rgba(55, 81, 126, 0.8)"',
                  padding: 20,
                  borderRadius: 10,
                  width: 250,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                  }}>{`${item.productCategoryName}/${item.merchantName}/${item.productName}`}</Text>

                <View
                  style={{
                    backgroundColor: 'rgba(55, 81, 126, 0.5)',
                    padding: 10,
                    borderRadius: 10,
                    top: 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '900',
                    }}>
                    {formatCurrency(item.balance, currency)}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            top: 50,
            marginHorizontal: 20,
            borderWidth: 1,
            padding: 5,
            borderColor: '#ccc',
            borderRadius: 10,
          }}>
          <Text style={{paddingBottom: 5}}>Quick save</Text>

          {chunkArray(merchant, 3).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item, key) => (
                <TouchableOpacity key={key} style={styles.item}>
                  <Text
                    style={{color: '#37517E', fontSize: 15, fontWeight: '900'}}>
                    {item.merchantName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
const getBalance = async user => {
  const res = await sendHTTPRequest({
    url: API_CONSTANTS.BALANCE_API,
    token: user.accessToken,
    method: STRING_CONSTANTS.GET_METHOD,
    registrationTokenType: STRING_CONSTANTS.AUTH_TYPE_BEARER,
  });
  if (res?.status === 200) return res;
  else {
    Toast.show({
      type: 'info',
      text2: '0 balance',
    });
  }
};
const getMerchant = async user => {
  const res = await sendHTTPRequest({
    url: API_CONSTANTS.MERCHANT_API,
    token: user.accessToken,
    method: STRING_CONSTANTS.GET_METHOD,
    registrationTokenType: STRING_CONSTANTS.AUTH_TYPE_BEARER,
  });
  if (res?.status === 200) return res;
  else {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'failed to get merchant',
    });
  }
};
const formatCurrency = (value, currency) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
  const formattedValue = formatter.format(value);
  const parts = formattedValue.match(/([^0-9,.-]+)(.*)/);
  if (parts && parts.length === 3) {
    return `${parts[1].trim()} ${parts[2].trim()}`;
  }
  return formattedValue;
};
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array?.length; i += chunkSize) {
    chunks.push(array?.slice(i, i + chunkSize));
  }
  return chunks;
};
export default HomePage;
const screenWidth = Dimensions.get('window').width;

const itemWidth = screenWidth / 3 - 20;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    backgroundColor: 'rgba(244, 155, 33, 0.7)',
    borderRadius: 10,
    padding: 10,
    width: itemWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
