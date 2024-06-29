import moment from 'moment';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AttendaceConfirmScreen = ({navigation}) => {
  const time = moment().format('H:m');

  const confirm = () => {
    navigation.navigate('HomeTabs');
  };

  return (
    <View style={[styles.bgLight, styles.container]}>
      <View style={[styles.center, {marginTop: 50, marginBottom: 20}]}>
        <MaterialCommunityIcons
          name="check-decagram"
          color="#2196F3"
          size={150}
        />
        <Text style={[styles.textDark, {fontSize: 30}]}>
          Anda Berhasil Absen.
        </Text>
      </View>
      <View style={styles.infoView}>
        <Text style={[styles.textDark, styles.infoTitle]}>Absen Pukul</Text>
        {/* <Text style={styles.textDark}>{hour + ':' + minutes}</Text> */}
        <Text style={styles.textDark}>{time}</Text>
      </View>
      <View style={styles.infoView}>
        <Text style={[styles.textDark, styles.infoTitle]}>Lokasi</Text>
        <Text style={styles.textDark}>Bengkulu.</Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={confirm}>
          <Text style={styles.buttonText}>Kirim</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoView: {
    marginTop: 10,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 20,
  },
  buttonView: {
    width: '90%',
    marginVertical: 20,
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
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default AttendaceConfirmScreen;
