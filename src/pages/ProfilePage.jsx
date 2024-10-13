import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfilePage = ({navigation}) => {
  const [user, setUser] = useState();
  useEffect(() => {
    AsyncStorage.getItem('user').then(res => {
      if (res) setUser(JSON.parse(res));
    });
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#37517E', padding: 10}}>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontWeight: '900',
          }}>
          Profile
        </Text>
      </View>
      <View
        style={{
          padding: 30,
          alignContent: 'center',
          top: 100,
          flex: 1,
        }}>
        <View
          style={{justifyContent: 'center', flexDirection: 'row', bottom: 20}}>
          <View
            backgroundColor="#37517E"
            style={{padding: 20, borderRadius: 50}}>
            <Icon name="user" size={50} color="#F49B21" />
          </View>
          <View style={{alignSelf: 'center', marginHorizontal: 10}}>
            <Text style={{fontSize: 20}}>
              {user?.customerNames?.trim().replace(/\s+/g, ' ')}
            </Text>
            <Text style={{fontSize: 17}}>{user?.customerMsisdn}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('LoginPage');
            AsyncStorage.clear();
          }}
          style={style.borderRow}>
          <Text style={{fontSize: 20}}>Logout</Text>
          <Icon name="logout" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
style = StyleSheet.create({
  borderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});
export default ProfilePage;
