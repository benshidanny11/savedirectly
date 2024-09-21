import { View, TextInput, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function InputText({ label, placeholder, isPassword, editable, isNumeric }) {
    return (
        <View style={styles.phoneInput}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder={placeholder} style={styles.input} placeholderTextColor="#ccc" secureTextEntry={isPassword} editable={editable} keyboardType={isNumeric ? 'numeric' : 'default'} />
            </View>
        </View>
    );
};



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

