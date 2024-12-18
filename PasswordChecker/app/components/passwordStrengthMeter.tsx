import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordStrengthMeterProps {
    length?: number;
    capitalLetter?: boolean;
    numeric?: boolean;
    specialCharacter?: boolean;
    showRequirements?: string;
    showRequirementsAlways?: boolean;
}
const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = (
    { length = 8,
        capitalLetter = true,
        numeric = false,
        specialCharacter = true,
        showRequirements = 'onFocus',

    }) => {

    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleChange = (text: string) => {
        setPassword(text);
        checkStrength();
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleShowRequirements = () => {
        if (showRequirements === 'always') return true;
        if (showRequirements === 'never') return !isFocused;
        if (showRequirements === 'onFocus') return isFocused;
        return false;
    }

    const checkLength = () => password.length >= length;
    const checkCapitalLetter = () => /[A-Z]/.test(password);
    const checkNumeric = () => /[0-9]/.test(password);
    const checkSpecialCharacter = () => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const checkStrength = () => calculateStrength() >= 100;

    const calculateStrength = () => {
        let criteriaMet = 0;
        let numberOfCriteria = 1;

        //check what criteria are enabled
        if (capitalLetter) numberOfCriteria++;
        if (numeric) numberOfCriteria++;
        if (specialCharacter) numberOfCriteria++;

        //check if the password meets the criteria
        if (checkLength()) criteriaMet++;
        else criteriaMet += (password.length / length); //give partial credit for length

        if (capitalLetter && checkCapitalLetter()) criteriaMet++;
        if (numeric && checkNumeric()) criteriaMet++;
        if (specialCharacter && checkSpecialCharacter()) criteriaMet++;
        return (criteriaMet / numberOfCriteria) * 100;
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry={secureTextEntry}
                    value={password}
                    onChangeText={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter a password"
                    style={styles.input}
                />
                <TouchableOpacity
                    onPressIn={() => setSecureTextEntry(false)}
                    onPressOut={() => setSecureTextEntry(true)}
                    style={styles.icon}
                >
                    <Ionicons name={secureTextEntry ? 'eye' : 'eye-off'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.meterContainer}>
                <View style={styles.meter}>
                    <View style={[styles.meterFill, { width: `${calculateStrength()}%` }]} />
                </View>
                <Text style={styles.strengthText}>{checkStrength() ? "Strong" : "Weak"}</Text>
            </View>

            {isFocused && showRequirements && (
                <View style={styles.strengthContainer}>
                    <Text>Requirements:</Text>
                    <View>
                        <Text style={{ color: checkLength() ? 'green' : 'red' }}>
                            At least {length} characters long
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: capitalLetter && checkCapitalLetter() ? 'green' : 'red' }}>
                            {capitalLetter ? "At least one capital letter" : ""}
                        </Text>

                        <Text style={{ color: numeric && checkNumeric() ? 'green' : 'red' }}>
                            {numeric ? "At least one numeric character" : ""}
                        </Text>
                        <Text style={{ color: specialCharacter && checkSpecialCharacter() ? 'green' : 'red' }}>
                            {specialCharacter ? "At least one special character" : ""}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        top: 100, // Adjust this value as needed
        left: 0,
        right: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        margin: 10,
        width: 200,
        borderRadius: 15,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    strengthContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    meterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 200, // Match the width of the input field
        alignSelf: 'center', // Center the meter container
        paddingLeft: 5,
        paddingRight: 5,
    },
    meter: {
        flex: 1,
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden'
    },
    meterFill: {
        height: '100%',
        backgroundColor: 'green',
    },
    strengthText: {
        marginLeft: 10,
    },
    icon: {
        position: 'absolute',
        right: 15,
    },
});

export default PasswordStrengthMeter;