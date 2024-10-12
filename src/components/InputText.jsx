import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function InputText({ label, placeholder, isPassword, editable, isNumeric, onChangeText, value }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.phoneInput}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={placeholder}
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    secureTextEntry={isPassword && !showPassword}
                    editable={editable}
                    keyboardType={isNumeric ? 'numeric' : 'default'}
                    onChangeText={onChangeText}
                    value={value}
                />
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                            name={showPassword ? "eye-off" : "eye"}
                            size={24}
                            color="#ccc"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    phoneInput: {
        width: 350,
        marginBottom: 10,
    },
    label: {
        color: '#ccc',
        marginBottom: 5,
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: '#ccc',
        paddingHorizontal: 10,
    },
    icon: {
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});
