import { View, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function LandingPage({navigation}) {
    setTimeout(()=>{
        navigation.replace('LoginPage');
    }, 2000);
  return (
    <View style={styles.landingPage}>
     <Image source={require('../assets/app_logo.png')}/>
    </View>
  );
}


const styles = StyleSheet.create(
    {
      landingPage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#37517E',
      },
    }
  );
