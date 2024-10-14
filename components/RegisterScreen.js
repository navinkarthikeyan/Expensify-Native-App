import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import BASE_URL from '../ipconfig';
import CustomButton from './assests/CustomButton';  // Assuming you have a custom button component
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing vector icons

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleRegister = async () => {
    if (password !== password2) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/users/register/`, {
        username,
        password,
        password2,
        email,
      });

      if (response.status === 201) {
        Alert.alert('Registration Successful', 'You can now log in');
        navigation.navigate('HomeScreen');  
      }
    } catch (error) {
      Alert.alert('Registration Failed', error.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.appName}>Register</Text>

        <View style={styles.inputContainer}>
          <Icon name="account" size={24} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="email" size={24} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="gray"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={password2}
            onChangeText={setPassword2}
            secureTextEntry={!showPassword2}
            placeholderTextColor="gray"
          />
          <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
            <Icon name={showPassword2 ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <CustomButton title="Register" onPress={handleRegister} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  box: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: '#333',
  },
});

export default RegisterScreen;
