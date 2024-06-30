import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const AttendaceConfirmScreen = ({navigation}) => {
  const time = moment().format('H:m');
  const [location, setLocation] = useState(false);
  const [displayLocation, setDisplayLocation] = useState('');

  useEffect(() => {
    const getLocation = () => {
      const result = requestLocationPermission();
      result.then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              fetchCity(position.coords.latitude, position.coords.longitude);
            },
            error => {
              setLocation(false);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    };

    getLocation();
  }, []);

  const fetchCity = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );
      const data = await response.json();
      setDisplayLocation(data.display_name);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const confirm = () => {
    navigation.navigate('HomeTabs');
  };

  return (
    <View style={(styles.bgLight, styles.container)}>
      {!displayLocation && (
        <View style={styles.content}>
          <ActivityIndicator size={120} color="#2196F3" />
          <Text style={styles.textDark}>Loading....</Text>
        </View>
      )}
      {displayLocation && (
        <View style={[styles.content]}>
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
            <Text style={styles.textDark}>{time}</Text>
          </View>
          <View style={styles.infoView}>
            <Text style={[styles.textDark, styles.infoTitle]}>Lokasi</Text>
            <Text style={[styles.textDark]}>{displayLocation}.</Text>
          </View>
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={confirm}>
              <Text style={styles.buttonText}>Kirim</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    margin: 50,
    alignContent: 'center',
    alignItems: 'center',
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
    width: 200,
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
