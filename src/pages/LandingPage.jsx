import { View, StyleSheet, Image,Animated } from 'react-native';
import React,{useEffect, useRef} from 'react';

export default function LandingPage({navigation}) {
    setTimeout(()=>{
        navigation.replace('LoginPage');
    }, 2000);

    const fadeAnim = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
    
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000, 
        useNativeDriver: true, 
      }).start();
    }, [fadeAnim]);
  return (
    <Animated.View style={{  flex: 1,
      justifyContent: 'center',
      alignItems: 'center', opacity: fadeAnim }}>
     <Image source={require('../assets/app_logo2.png')}/>
    </Animated.View>
  );
}



