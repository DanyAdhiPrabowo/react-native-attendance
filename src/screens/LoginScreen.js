import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axiosInstance from '../helpers/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator} from 'react-native-paper';

const LoginSceen = ({navigation}) => {
  const [email, onChangeEmail] = useState('adhiedit@gmail.com');
  const [password, onChangePassword] = useState('password');
  let [errorMessage, setErrorMessage] = useState('');
  let [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const payload = {
      email,
      password,
    };
    await axiosInstance
      .post('/login', payload)
      .then(async res => {
        const token = res?.data?.data?.token;
        await AsyncStorage.setItem('token', token);
        setErrorMessage('');
        setLoading(false);
        navigation.navigate('HomeTabs');
      })
      .catch(err => {
        setLoading(false);
        if (err?.response?.data) {
          console.log('here', err.response.data);
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage('Internet server error');
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerView}>
          <Text style={[styles.textDark, styles.headerText]}>
            Selamat Datang di APP Absensi
          </Text>
          <Text style={[styles.textDark, styles.headerText]}>
            Kantor PU Kota Bengkulu
          </Text>
        </View>
        <View style={styles.inputView}>
          {errorMessage ? (
            <Text style={{color: 'red'}}>{errorMessage}</Text>
          ) : null}
          <TextInput
            style={[styles.input, styles.textDark]}
            placeholder="Masukkan Email"
            placeholderTextColor="gray"
            onChangeText={onChangeEmail}
            value={email}
            keyboardType="email"
            autoFocus={true}
          />
          <TextInput
            style={[styles.input, styles.textDark]}
            placeholder="Masukkan Password"
            placeholderTextColor="gray"
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
            inlineImageLeft="search_icon"
          />
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handleLogin}>
              {loading ? (
                <Text>
                  <ActivityIndicator color="white" />
                </Text>
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    marginTop: -50,
    flex: 1,
  },
  textDark: {
    color: '#343a40',
  },
  card: {
    width: '95%',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 7,
    elevation: 50,
    shadowColor: 'red',
  },
  headerView: {
    marginBottom: 40,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 40,
    color: 'red',
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 7,
  },
  buttonView: {
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    height: 45,
    borderColor: '#2196F3',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default LoginSceen;
