import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function CustomButton({label, onTap, disabled, style,textStyle}) {
  return (
    <TouchableOpacity onPress={onTap} disabled={disabled}>
      <View
        style={[
          styles.buttonContainer,
          {opacity: disabled ? 0.5 : 1},
          style ? style : {},
        ]}>
        <Text style={[styles.labelStyle,textStyle?textStyle:{}]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#f9f9f9',
    width: 200,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  labelStyle: {
    color: '#37517E',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
