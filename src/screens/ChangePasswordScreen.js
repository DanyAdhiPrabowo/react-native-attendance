import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DangerAlertComponent from '../components/DangerAlertComponent';
import {TextInput} from 'react-native-paper';
import axiosInstance from '../helpers/axiosConfig';

const ChangePasswordScreen = ({navigation}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    setLoading(true);
    const payload = {
      current_password: password,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    await axiosInstance
      .put('/change-password', payload)
      .then(() => {
        navigation.navigate('Profile');
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
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.contentContainer]}>
        <View style={styles.inputView}>
          {errorMessage ? (
            <DangerAlertComponent message={errorMessage} />
          ) : null}
          <TextInput
            type
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            outlineColor="#2196F3"
            style={[styles.input, styles.textDark]}
          />
          <TextInput
            label="Password Baru"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            mode="outlined"
            outlineColor="#2196F3"
            style={[styles.input, styles.textDark]}
          />
          <TextInput
            label="Konfirmasi Password Baru"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            mode="outlined"
            outlineColor="#2196F3"
            style={[styles.input, styles.textDark]}
          />
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handleChangePassword}>
              {loading ? (
                <Text>
                  <ActivityIndicator color="white" />
                </Text>
              ) : (
                <Text style={styles.textLight}>Simpan</Text>
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
    flex: 1,
  },
  contentContainer: {
    padding: 30,
  },
  textPrimary: {
    color: '#2196F3',
  },
  textLight: {
    color: '#f8f9fa',
  },
  textDark: {
    color: '#343a40',
  },
  bgPrimary: {
    backgroundColor: '#2196F3',
  },
  bgLight: {
    backgroundColor: '#f8f9fa',
  },
  input: {
    height: 50,
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
  inputView: {
    gap: 20,
  },
});

export default ChangePasswordScreen;
