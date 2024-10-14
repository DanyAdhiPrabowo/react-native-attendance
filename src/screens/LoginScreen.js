import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import axiosInstance from '../helpers/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import DangerAlertComponent from '../components/DangerAlertComponent';
import {TextInput} from 'react-native-paper';

const LoginSceen = ({navigation}) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        await AsyncStorage.setItem('userToken', token);
        setErrorMessage('');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'HomeTabs'}],
          }),
        );
      })
      .catch(err => {
        if (err?.response?.data) {
          const message = err.response.data.message;
          if (typeof message === 'string') {
            setErrorMessage(message);
          } else if (typeof message === 'object') {
            const key = Object.keys(message)[0];
            const result = message[key];
            setErrorMessage(result);
          } else {
            setErrorMessage('Internet server error');
          }
        } else {
          setErrorMessage('Internet server error');
        }
      });
    setLoading(false);
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
            <DangerAlertComponent message={errorMessage} />
          ) : null}
          <TextInput
            label="Email"
            autoFocus={true}
            mode="outlined"
            outlineColor="#2196F3"
            onChangeText={onChangeEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            mode="outlined"
            outlineColor="#2196F3"
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={showPassword}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
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
