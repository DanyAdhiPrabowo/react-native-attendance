import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import axiosInstance from '../helpers/axiosConfig';
import {useFocusEffect} from '@react-navigation/native';
import ListHistoryComponent from '../components/ListHistoryComponent';
import style from '../helpers/style';

const HomeScreen = ({navigation}) => {
  moment.locale('id');

  const [refreshing, setRefreshing] = useState(false);
  const [time, setTime] = useState(moment().format('H:m'));
  const [date, setDate] = useState(moment().format('dddd, DD MMMM YYYY'));
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [alreadyCheckin, setAlreadyChekin] = useState(false);
  const [alreadyCheckout, setAlreadyChekout] = useState(true);
  const [historyAttendace, setHistoryAttendace] = useState([]);
  const [dataProfile, setDataProfile] = useState([]);

  const getProfile = async () => {
    await axiosInstance.get('/profile').then(res => {
      const data = res?.data?.data;
      setDataProfile(data);
    });
  };

  const attendaceToday = async () => {
    await axiosInstance.get('/attendance/today').then(res => {
      const data = res?.data?.data;
      setCheckin(data?.check_in);
      const dataCheckin = data?.check_in;
      const dataCheckout = data?.check_out;
      if (!dataCheckout) {
        setAlreadyChekout(false);
      }
      if (dataCheckin) {
        setAlreadyChekin(true);
      }
      setCheckout(dataCheckout);
    });
  };

  const attendaceHistory = async () => {
    await axiosInstance.get('/attendance').then(res => {
      const data = res?.data?.data;
      setHistoryAttendace(data);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('H:mm'));
      setDate(moment().format('dddd, DD MMMM YYYY'));
    });

    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
      attendaceToday();
      attendaceHistory();
    }, []),
  );

  const onRefresh = React.useCallback(() => {
    getProfile();
    attendaceToday();
    attendaceHistory();
    setRefreshing(false);
  }, []);

  const handleSanner = () => {
    navigation.navigate('Scanner'); // Navigate to HomeTabs on login
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.containerHeader]}>
        <ScrollView
          scrollEnabled={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={[style.bgLight, {height: 350}]}>
            <View style={[style.bgPrimary, styles.background]} />
            <View style={styles.center}>
              <Text
                style={[style.textLight, {marginVertical: 15, fontSize: 15}]}>
                Hallo, {dataProfile?.name ? dataProfile.name : '-'}
              </Text>
              <Text style={[style.textLight, styles.clock]}>{time}</Text>
              <Text style={style.textLight}>{date}</Text>
            </View>
            <View style={styles.center}>
              <View style={[style.bgLight, styles.card]}>
                <View style={styles.timeContainener}>
                  <View style={styles.timeView}>
                    <Text style={style.textDark}>Waktu Masuk</Text>
                    <Text style={[style.textDark, styles.time]}>
                      {checkin ? checkin.slice(0, -3) : '-'}
                    </Text>
                  </View>
                  <View style={styles.timeView}>
                    <Text style={style.textDark}>Waktu Pulang</Text>
                    <Text style={[style.textDark, styles.time]}>
                      {checkout ? checkout.slice(0, -3) : '-'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={
                    alreadyCheckout
                      ? styles.buttonDisable
                      : [style.bgPrimary, styles.button]
                  }
                  onPress={handleSanner}
                  disabled={alreadyCheckout ? true : false}>
                  {alreadyCheckout ? (
                    <Text style={style.textDark}>Masuk</Text>
                  ) : (
                    <Text style={style.textLight}>
                      {alreadyCheckin === true ? 'Pulang' : 'Masuk'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.containerFlat]}>
            <Text style={[style.textDark, {fontSize: 15, fontWeight: 'bold'}]}>
              Data absen terbaru
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={{flex: 1, flexGrow: 1, height: '100'}}>
        <ListHistoryComponent data={historyAttendace} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonDisable: {
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c9c9c9',
    borderColor: '#c9c9c9',
  },
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  clock: {
    fontSize: 50,
  },
  containerHeader: {
    height: 400,
  },
  background: {
    height: '60%',
    width: '100%',
    position: 'absolute',
  },
  card: {
    width: '90%',
    padding: 30,
    borderRadius: 7,
    elevation: 24,
    marginTop: 10,
  },
  timeContainener: {
    flexDirection: 'row',
    marginBottom: 0,
    height: 70,
  },
  timeView: {
    width: '50%',
    alignItems: 'center',
  },
  time: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    height: 45,
    borderColor: '#2196F3',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFlat: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
