import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordStrengthMeterProps {
    length?: number;    // Minimum length of the password
    capitalLetter?: boolean;    // Require at least one capital letter
    numeric?: boolean;      // Require at least one numeric character
    specialCharacter?: boolean;    // Require at least one special character
    displayStrength?: boolean;  // Display the strength of the password in text
    displayBar?: boolean;   // Display the strength of the password in a bar
    showRequirements?: string;    // When to show the requirements, 'always', 'never', or 'onFocus'
    ownStrengthAlgorithm?: boolean;  // Use the custom strength meter depending on the criterias selected
    onValidPassword?: (password: string) => void;  // Callback function to return a valid password

}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
    //Default values
    length = 8,
    capitalLetter = true,
    numeric = false,
    specialCharacter = true,
    displayStrength = true,
    displayBar = true,
    showRequirements = 'onFocus',
    ownStrengthAlgorithm = false,
    onValidPassword
}) => {
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [strength, setStrength] = useState('Weak');
    const animatedWidth = useRef(new Animated.Value(0)).current;


    const handleChange = (text: string) => {
        setPassword(text);
        const newStrength = checkStrength(text);
        setStrength(newStrength);
        animateBar(calculateStrength(text));

        // If the criterias is met, return the password
        if (checkCriteria(text) && onValidPassword) {
            onValidPassword(text);
        }
    };

    // Check if the password meets the criteria, only returns true if all criterias are met
    const checkCriteria = (password: string) => {
        if (capitalLetter && !checkCapitalLetter(password)) return false;
        if (numeric && !checkNumeric(password)) return false;
        if (specialCharacter && !checkSpecialCharacter(password)) return false;
        if (!checkLength(password)) return false;
        return true;
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    // Handles when to show the requirements
    const handleShowRequirements = () => {
        if (showRequirements === 'always') return true;
        if (showRequirements === 'never') return false;
        if (showRequirements === 'onFocus') return isFocused;
        return false;
    };

    // Check if the password meets the criteria
    const checkLength = (password: string) => password.length >= length;
    const checkCapitalLetter = (password: string) => /[A-Z]/.test(password);
    const checkNumeric = (password: string) => /[0-9]/.test(password);
    const checkSpecialCharacter = (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const checkStrength = (password: string) => {
        const strengthValue = calculateStrength(password);
        if (strengthValue >= 80) {
            return 'Strong';
        } else if (strengthValue >= 50) {
            return 'Good';
        } else {
            return 'Weak';
        }
    };

    // Calculate the strength of the password
    const calculateStrength = (password: string) => {
        let strength = 0;
        let numberOfCriteria = 1;

        // Use the custom strength meter
        if (ownStrengthAlgorithm) {
            // check what criteria are enabled
            if (capitalLetter) numberOfCriteria++;
            if (numeric) numberOfCriteria++;
            if (specialCharacter) numberOfCriteria++;

            // check criterias
            if (checkLength(password)) strength++;
            else strength += (password.length / length); // give partial credit for length

            if (capitalLetter && checkCapitalLetter(password)) strength++;
            if (numeric && checkNumeric(password)) strength++;
            if (specialCharacter && checkSpecialCharacter(password)) strength++;
            return (strength / numberOfCriteria) * 100;
        }

        // Use the default strength meter

        // baseline score based on length (10) + 5 for each character
        if (password.length >= 6) {
            strength += (10 + ((password.length - 6) * 5));
        }

        // Adjust score based on character variety
        let multiplier = 1;
        if (checkCapitalLetter(password)) multiplier += 0.5;
        if (checkNumeric(password)) multiplier += 0.5;
        if (checkSpecialCharacter(password)) multiplier += 0.5;

        strength = Math.round(strength * multiplier);

        // cap the score at 100
        return Math.min(strength, 100);
    };

    // Animate the strength bar using calculateStrength
    const animateBar = (width: number) => {
        Animated.timing(animatedWidth, {
            toValue: width,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                {/* Password input field */}
                <TextInput
                    secureTextEntry={secureTextEntry}
                    value={password}
                    onChangeText={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter a password"
                    style={styles.input}
                />
                {/* Show/hide password */}
                <TouchableOpacity
                    onPressIn={() => setSecureTextEntry(false)}
                    onPressOut={() => setSecureTextEntry(true)}
                    style={styles.icon}
                >
                    <Ionicons name={secureTextEntry ? 'eye' : 'eye-off'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {/* Strength meter and text */}
            <View style={styles.meterContainer}>

               {displayBar && <View style={styles.meter}>
                    <Animated.View
                        style={[
                            styles.meterFill,
                            { width: animatedWidth.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                                backgroundColor:
                                    strength === 'Strong' ? 'green' :
                                        strength === 'Good' ? 'orange' :
                                            'red'
                            }
                        ]}
                    />
                </View>
                }
                {displayStrength && <View style={styles.strengthTextContainer}>
                    <Text style={styles.strengthText}>{strength}</Text>
                </View>}
            </View>

            {/* Show requirements */}
            {handleShowRequirements() && (
                <View style={styles.strengthContainer}>
                    <Text>Requirements:</Text>
                    <View>
                        <Text style={{ color: checkLength(password) ? 'green' : 'red' }}>
                            At least {length} characters long
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: capitalLetter && checkCapitalLetter(password) ? 'green' : 'red' }}>
                            {capitalLetter ? "At least one capital letter" : ""}
                        </Text>

                        <Text style={{ color: numeric && checkNumeric(password) ? 'green' : 'red' }}>
                            {numeric ? "At least one numeric character" : ""}
                        </Text>
                        <Text style={{ color: specialCharacter && checkSpecialCharacter(password) ? 'green' : 'red' }}>
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
        justifyContent: 'center', 
        width: 200,
        alignSelf: 'center',
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
    },
    strengthTextContainer: {
        width: 60, 
        alignItems: 'center',
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