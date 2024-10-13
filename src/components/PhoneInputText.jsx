import {View, TextInput, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';
export default function PhoneInputText({onChangeHandler, value,setCountryCallingCode}) {
  const [countryCode, setCountryCode] = useState('RW');
  return (
    <View style={styles.phoneInput}>
      <Text style={styles.label}>Phone number</Text>
      <View style={styles.inputContainer}>
        <CountryPicker
          {...{
            countryCode,
            withFilter: true,
            withFlag: true,
            withCallingCode: true,
            withCallingCodeButton: true,

            onSelect: country => {
              setCountryCode(country.cca2);
              setCountryCallingCode(country)
            },
          }}
         
          containerButtonStyle={{backgroundColor: '#fff', padding: 12}}
        />
        <TextInput
          placeholder="Enter phone number"
          style={styles.input}
          placeholderTextColor="#ccc"
          onChangeText={onChangeHandler}
          value={value}
          keyboardType="phone-pad"
          maxLength={9}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  phoneInput: {
    //  height:50,
    //  flex:1,

    //backgroundColor:'red',
    width: 350,
    marginBottom: 10,
  },
  label: {
    color: '#ccc',
    marginBottom: 5,
    fontSize: 16,
  },
  inputContainer: {
    //  height:50,
    //  flex:1,

    borderColor: '#ccc',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  input: {
    // flex:1,
    height: 50,
    color: '#ccc',
    paddingHorizontal: 10,
    // width:'80%',
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});
