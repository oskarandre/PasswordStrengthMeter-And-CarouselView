import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface PasswordStrengthMeterProps {
    length?: number;
    capitalLetter?: boolean;
    numeric?: boolean;
    specialCharacter?: boolean;
}
const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = (
    {   length = 8, 
        capitalLetter = true, 
        numeric = false, 
        specialCharacter = true,

    }) => {

    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isStrong, setIsStrong] = useState(true);

    const handleChange = (text: string) => {
        setPassword(text);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const checkLength = () => password.length >= length;
    const checkCapitalLetter = () => /[A-Z]/.test(password);
    const checkNumeric = () => /[0-9]/.test(password);
    const checkSpecialCharacter = () => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    const calculateStrength = () => {
        let criteriaMet = 0;
        let numberOfCriteria = 1;

        //check what criteria are enabled
        if (capitalLetter) numberOfCriteria++;
        if (numeric) numberOfCriteria++;
        if (specialCharacter) numberOfCriteria++;

        //check if the password meets the criteria
        if (checkLength()) criteriaMet++;
        else criteriaMet += (password.length/length); //give partial credit for length

        if (capitalLetter && checkCapitalLetter()) criteriaMet++;
        if (numeric && checkNumeric()) criteriaMet++;
        if (specialCharacter && checkSpecialCharacter()) criteriaMet++;
        return (criteriaMet / numberOfCriteria) * 100;
    };



    return (
        <View style={styles.container}>
            <TextInput
                secureTextEntry
                value={password}
                onChangeText={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Enter your password"
                style={styles.input}
            />
            {isFocused && (
                <View style={styles.strengthContainer}>
                    <View style={styles.meter}>
                        <View style={[styles.meterFill, { width: `${calculateStrength()}%` }]} />
                    </View>
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
    meter: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 5,
    },
    meterFill: {
        height: '100%',
        backgroundColor: 'green',
    },
});

export default PasswordStrengthMeter;