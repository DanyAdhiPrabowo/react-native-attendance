import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import axiosInstance from '../helpers/axiosConfig';

const ProfileScreen = () => {
  const [dataProfile, setDataProfile] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      await axiosInstance.get('/profile').then(res => {
        const data = res?.data?.data;
        setDataProfile(data);
      });
    };

    getProfile();
  }, []);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
      <View style={[styles.bgPrimary, styles.contentContainer]}>
        <View style={[styles.profilePicture]}>
          <Text style={[styles.textPrimary, styles.profileText]}>
            {dataProfile.name ? dataProfile.name.charAt(0).toUpperCase() : '-'}
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.viewProfileInfo}>
          <Text style={[styles.textDark, styles.titleProfileInfo]}>Nama</Text>
          <Text style={styles.textDark}>{dataProfile.name ?? '-'}</Text>
        </View>
        <View style={styles.viewProfileInfo}>
          <Text style={[styles.textDark, styles.titleProfileInfo]}>Email</Text>
          <Text style={styles.textDark}>{dataProfile.email ?? '-'}</Text>
        </View>
        <View style={styles.viewProfileInfo}>
          <Text style={[styles.textDark, styles.titleProfileInfo]}>
            Nomor Hp
          </Text>
          <Text style={styles.textDark}>{dataProfile.handphone ?? '-'}</Text>
        </View>
        <View style={styles.viewProfileInfo}>
          <Text style={[styles.textDark, styles.titleProfileInfo]}>Alamat</Text>
          <Text style={styles.textDark}>{dataProfile.address ?? '-'}</Text>
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
