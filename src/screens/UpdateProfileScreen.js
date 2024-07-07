import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import axiosInstance from '../helpers/axiosConfig';
import DangerAlertComponent from '../components/DangerAlertComponent';

const UpdateProfileScreen = ({navigation}) => {
  const [name, onChangeName] = useState(null);
  const [handphone, onChangeHandphone] = useState(null);
  const [address, onChangeAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      await axiosInstance.get('/profile').then(res => {
        const data = res?.data?.data;
        onChangeName(data.name);
        onChangeHandphone(data.handphone);
        onChangeAddress(data.address);
      });
    };

    getProfile();
  }, []);

  const handleUpdateProfile = async () => {
    setLoading(true);
    const payload = {
      name,
      handphone,
      address,
    };
    await axiosInstance
      .put('/profile', payload)
      .then(async res => {
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
            label="Nama"
            value={name}
            onChangeText={onChangeName}
            mode="outlined"
            outlineColor="#2196F3"
            style={[styles.input, styles.textDark]}
          />
          <TextInput
            label="Nomor HP"
            value={handphone}
            onChangeText={onChangeHandphone}
            mode="outlined"
            outlineColor="#2196F3"
            style={[styles.input, styles.textDark]}
          />
          <TextInput
            label="Alamat"
            value={address}
            onChangeText={onChangeAddress}
            multiline={true}
            mode="outlined"
            outlineColor="#2196F3"
            style={[styles.inputArea, styles.textDark]}
          />
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handleUpdateProfile}>
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
    marginBottom: 15,
  },
  inputArea: {
    height: 100,
    marginBottom: 15,
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

export default UpdateProfileScreen;
