import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import CustomButton from './assests/CustomButton';
import axios from 'axios'; 
import BASE_URL from '../ipconfig';
import { MaterialIcons } from '@expo/vector-icons'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/users/login/`, {
        username: username,
        password: password,
      });

      const data = response.data;

      if (response.status === 200) {
        Alert.alert('Login Successful', `Welcome`);
        await AsyncStorage.setItem('userToken', data.token);
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert('Login Failed', error.response.data.detail || 'Invalid username or password');
      } else {
        Alert.alert('Login Error', 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.appName}>Expensify</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person-outline" size={24} color="gray" />
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
          <MaterialIcons name="lock-outline" size={24} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            placeholderTextColor="gray"
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <MaterialIcons
              name={passwordVisible ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <CustomButton title="Login" onPress={handleLogin} />
        )}
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
    <Text style={styles.registerLink}>Don't have an account? Register here</Text>
  </TouchableOpacity>
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
  registerLink: {
    color: '#007BFF',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Login;
