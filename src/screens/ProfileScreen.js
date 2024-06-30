import React, {useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const ProfileScreen = () => {
  const [location, setLocation] = useState(false);
  const [latitude, setLatitude] = useState(false);
  const [longitude, setLogitude] = useState(false);
  const [displayLocation, setDisplayLocation] = useState('');

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        console.log(res);
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
            setLatitude(position.coords.latitude);
            setLogitude(position.coords.longitude);
            fetchCity(position.coords.latitude, position.coords.longitude);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const fetchCity = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );
      const data = await response.json();
      console.log(data.display_name);
      setDisplayLocation(data.display_name);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
      <View style={[styles.bgPrimary, styles.contentContainer]}>
        <View style={[styles.profilePicture]}>
          <Text style={[styles.textPrimary, styles.profileText]}>D</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.viewProfileInfo}>
          <Text style={[styles.textDark, styles.titleProfileInfo]}>Nama</Text>
          <Text style={styles.textDark}>Dany Adhi Prabowo</Text>
        </View>
        <View style={styles.viewProfileInfo}>
          <Text style={[styles.textDark, styles.titleProfileInfo]}>Email</Text>
          <Text style={styles.textDark}>danyadhi4149@gmail.com</Text>
        </View>
        <View style={styles.viewProfileInfo}>
          <Text style={[styles.textDark, styles.titleProfileInfo]}>
            Nomor Hp
          </Text>
          <Text style={styles.textDark}>083161793990</Text>
        </View>
        <View style={styles.viewProfileInfo}>
          <Text style={[styles.textDark, styles.titleProfileInfo]}>Alamat</Text>
          <Text style={styles.textDark}>Lubuk Linggau, Sumatera Selatan</Text>
        </View>

        <View>
          <View
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
              width: '40%',
            }}>
            <Button title="Get Location" onPress={getLocation} />
          </View>
          <Text style={styles.textDark}>Latitude: {latitude}</Text>
          <Text style={styles.textDark}>Longitude: {longitude}</Text>
          <Text style={styles.textDark}>Location: {displayLocation}</Text>
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
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderColor: '#e6e4e3',
    borderWidth: 10,
    elevation: 20,
    backgroundColor: '#f8f9fa',
  },
  profileText: {
    fontSize: 80,
    fontWeight: 'bold',
  },
  viewProfileInfo: {
    marginBottom: 10,
  },
  titleProfileInfo: {
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
