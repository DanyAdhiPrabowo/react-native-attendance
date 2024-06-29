import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
      <View style={[styles.bgPrimary, styles.contentContainer]}>
        <View style={[styles.bgLight, styles.profilePicture]}>
          <Text style={[styles.textPrimary, styles.profileText]}>D</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.viewProfileInfo}>
          <Text style={styles.titleProfileInfo}>Nama</Text>
          <Text>Dany Adhi Prabowo</Text>
        </View>
        <View style={styles.viewProfileInfo}>
          <Text style={styles.titleProfileInfo}>Email</Text>
          <Text>danyadhi4149@gmail.com</Text>
        </View>
        <View style={styles.viewProfileInfo}>
          <Text style={styles.titleProfileInfo}>Nomor Hp</Text>
          <Text>083161793990</Text>
        </View>
        <View style={styles.viewProfileInfo}>
          <Text style={styles.titleProfileInfo}>Alamat</Text>
          <Text>Lubuk Linggau, Sumatera Selatan</Text>
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
    borderColor: '#EEEDEB',
    borderWidth: 10,
    elevation: 20,
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
