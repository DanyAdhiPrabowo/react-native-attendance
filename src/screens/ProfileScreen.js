import React, {useState} from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axiosInstance from '../helpers/axiosConfig';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import LoadingScreen from './LoadingScreen';

const ProfileScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataProfile, setDataProfile] = useState([]);
  const [menuOpened, setMenuOpened] = useState(false);
  let [loading, setLoading] = useState(false);

  const showToast = message => {
    Toast.show({
      type: 'error',
      text1: message,
    });
  };

  const getProfile = async () => {
    setLoading(true);
    await axiosInstance.get('/profile').then(res => {
      const data = res?.data?.data;
      setDataProfile(data);
    });
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, []),
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(false);
    getProfile();
  }, []);

  const handleUpdateProfile = () => {
    handleMenuOpened();
    navigation.navigate('UpdateProfile');
  };

  const handleChangePassword = () => {
    handleMenuOpened();
    navigation.navigate('ChangePassword');
  };

  const handleMenuOpened = () => {
    setMenuOpened(!menuOpened);
  };

  const handleLogout = () =>
    Alert.alert('Keluar', 'Apakah anda yakin ingin keluar?', [
      {text: 'Batal'},
      {
        text: 'Ya',
        onPress: () => {
          setModalVisible(!modalVisible);
          logout();
        },
      },
    ]);

  const logout = async () => {
    await axiosInstance
      .post('/logout')
      .then(async () => {
        await AsyncStorage.removeItem('userToken');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      })
      .catch(err => {
        if (err?.response?.data) {
          showToast(err.response.data.message);
        } else {
          showToast('Internet server error');
        }
      });
  };

  return (
    <MenuProvider>
      {loading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <>
              <View style={[styles.bgPrimary, styles.contentContainer]}>
                <Menu
                  style={[styles.cogButton]}
                  opened={menuOpened}
                  onBackdropPress={handleMenuOpened}
                  onSelect={handleMenuOpened}>
                  <MenuTrigger onPress={handleMenuOpened}>
                    <MaterialCommunityIcons
                      name="cog"
                      color="white"
                      size={25}
                      style={{}}
                    />
                  </MenuTrigger>
                  <MenuOptions
                    optionsContainerStyle={{marginTop: 30}}
                    style={{padding: 5}}>
                    <MenuOption>
                      <Text
                        style={[styles.textDark, styles.menuText]}
                        onPress={handleUpdateProfile}>
                        <MaterialCommunityIcons name="account-cog" size={15} />
                        &nbsp; Update Profile
                      </Text>
                    </MenuOption>
                    <MenuOption>
                      <Text
                        style={[styles.textDark, styles.menuText]}
                        onPress={handleChangePassword}>
                        <MaterialCommunityIcons name="account-lock" size={15} />
                        &nbsp; Ganti Password
                      </Text>
                    </MenuOption>
                    <MenuOption>
                      <Text
                        style={[styles.textDark, styles.menuText]}
                        onPress={handleLogout}>
                        <MaterialCommunityIcons name="logout" size={15} />
                        &nbsp; Logout
                      </Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>

                <View style={[styles.profilePicture]}>
                  <Text style={[styles.textPrimary, styles.profileText]}>
                    {dataProfile?.name
                      ? dataProfile?.name.charAt(0).toUpperCase()
                      : '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.viewProfileInfo}>
                  <Text style={[styles.textDark, styles.titleProfileInfo]}>
                    Nama
                  </Text>
                  <Text style={styles.textDark}>
                    {dataProfile?.name ?? '-'}
                  </Text>
                </View>
                <View style={styles.viewProfileInfo}>
                  <Text style={[styles.textDark, styles.titleProfileInfo]}>
                    Email
                  </Text>
                  <Text style={styles.textDark}>
                    {dataProfile?.email ?? '-'}
                  </Text>
                </View>
                <View style={styles.viewProfileInfo}>
                  <Text style={[styles.textDark, styles.titleProfileInfo]}>
                    Nomor Hp
                  </Text>
                  <Text style={styles.textDark}>
                    {dataProfile?.handphone ?? '-'}
                  </Text>
                </View>
                <View style={styles.viewProfileInfo}>
                  <Text style={[styles.textDark, styles.titleProfileInfo]}>
                    Alamat
                  </Text>
                  <Text style={styles.textDark}>
                    {dataProfile?.address ?? '-'}
                  </Text>
                </View>
              </View>
            </>
          </ScrollView>
          <Toast />
        </SafeAreaView>
      )}
    </MenuProvider>
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
  cogButton: {
    marginLeft: 'auto',
    marginTop: -15,
    marginRight: -10,
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
  menuText: {
    marginVertical: 10,
  },
});

export default ProfileScreen;
