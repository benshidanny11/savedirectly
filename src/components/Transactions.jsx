import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import API_CONSTANTS from '../constants/API_CONSTANTS';
import STRING_CONSTANTS from '../constants/STRING_CONSTANTS';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sendHTTPRequest} from '../api/helper';
import Toast from 'react-native-toast-message';

const Transactions = ({navigation, noTitle, recent}) => {
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        getHistory(JSON.parse(user)).then(res => {
          const data = recent ? res?.slice(0, 5) : res;
          setTransactions(data);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'rgba(55, 81, 126, 0.8)',
        padding: 10,
      }}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" /> // Loading spinner
      ) : transactions && transactions.length > 0 ? (
        transactions.map((item, key) => {
          return (
            <View
              key={key}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: '#37517E',
                padding: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    paddingRight: 10,
                    alignSelf: 'center',
                  }}>
                  <Icon
                    name={item.type == 'Saving' ? 'login' : 'logout'}
                    size={15}
                    color={item.type == 'Saving' ? 'white' : '#37517E'}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'white',
                    }}>{`${item.productCategory}/${item.product}`}</Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#37517E',
                      fontWeight: '900',
                    }}>
                    {item.date}
                  </Text>
                </View>
              </View>
              <Text style={{fontSize: 20, color: 'white'}}>{` ${
                item.type == 'Saving' ? '+' : '-'
              } ${item.amount}`}</Text>
            </View>
          );
        })
      ) : (
        <Text style={{color: 'white'}}>No transactions found</Text>
      )}
    </View>
  );
};

export default Transactions;

const getHistory = async user => {
  const res = await sendHTTPRequest({
    url: API_CONSTANTS.TRANSACTION_HISTORY_API,
    token: user.accessToken,
    method: STRING_CONSTANTS.GET_METHOD,
    registrationTokenType: STRING_CONSTANTS.AUTH_TYPE_BEARER,
  });
  if (res?.status === 200) return res?.data;
  else {
    Toast.show({
      type: 'info',
      text2: 'No transaction history',
    });
    return [];
  }
};
