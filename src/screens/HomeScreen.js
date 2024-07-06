import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dummyData from '../data.json';
import moment from 'moment';
import axiosInstance from '../helpers/axiosConfig';

const HomeScreen = ({navigation}) => {
  moment.locale('id');

  const [time, setTime] = useState(moment().format('H:m'));
  const [date, setDate] = useState(moment().format('dddd, DD MMMM YYYY'));
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [alreadyAttendace, setAlreadyAttendace] = useState(true);
  const [historyAttendace, setHistoryAttendace] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('H:mm'));
      setDate(moment().format('dddd, DD MMMM YYYY'));
    });

    const attendaceToday = async () => {
      await axiosInstance.get('/attendance/today').then(res => {
        const data = res?.data?.data;
        setCheckin(data?.check_in);
        const dataCheckout = data?.check_out;
        if (!dataCheckout) {
          setAlreadyAttendace(false);
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

    attendaceToday();
    attendaceHistory();
    return () => clearInterval(interval);
  }, []);

  const handleSanner = () => {
    navigation.navigate('Scanner'); // Navigate to HomeTabs on login
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.bgLight, styles.containerHeader]}>
        <View style={[styles.bgPrimary, styles.background]} />
        <View style={styles.center}>
          <Text style={[styles.textLight, {marginVertical: 15, fontSize: 15}]}>
            Hallo, Dany Adhi
          </Text>
          <Text style={[styles.textLight, styles.clock]}>{time}</Text>
          <Text style={styles.textLight}>{date}</Text>
        </View>
        <View style={styles.containerCard}>
          <View style={[styles.bgLight, styles.card]}>
            <View style={styles.timeContainener}>
              <View style={styles.timeView}>
                <Text style={styles.textDark}>Waktu Masuk</Text>
                <Text style={[styles.textDark, styles.time]}>
                  {checkin ? checkin.slice(0, -3) : '-'}
                </Text>
              </View>
              <View style={styles.timeView}>
                <Text style={styles.textDark}>Waktu Pulang</Text>
                <Text style={[styles.textDark, styles.time]}>
                  {checkout ? checkout.slice(0, -3) : '-'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={
                alreadyAttendace
                  ? styles.buttonDisable
                  : [styles.bgPrimary, styles.button]
              }
              onPress={handleSanner}
              disabled={alreadyAttendace ? true : false}>
              {alreadyAttendace ? (
                <Text style={styles.textDark}>Masuk</Text>
              ) : (
                <Text style={styles.textLight}>Masuk</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.bgLight, styles.containerFlat]}>
        <Text
          style={[
            styles.textDark,
            {fontSize: 15, fontWeight: 'bold', paddingBottom: 10},
          ]}>
          Data absen terbaru
        </Text>
        <FlatList
          data={historyAttendace}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text
                style={[styles.textPrimary, {fontSize: 14, fontWeight: '800'}]}>
                {moment(item.created_at).format('DD MMMM YYYY')}
              </Text>
              <View style={styles.row}>
                <Text style={styles.title}>Check In</Text>
                <Text style={styles.value}>
                  {item.check_in ? item.check_in.slice(0, -3) : '-'}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Check Out</Text>
                <Text style={styles.value}>
                  {item.check_out ? item.check_out.slice(0, -3) : '-'}
                </Text>
              </View>
            </View>
          )}
        />
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
  clock: {
    fontSize: 50,
  },
  containerHeader: {
    height: 350,
  },
  background: {
    height: '60%',
    width: '100%',
    position: 'absolute',
  },
  containerCard: {
    alignItems: 'center',
    justifyContent: 'center',
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
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#333',
  },
  value: {
    marginVertical: 2,
    color: '#555',
  },
});

export default HomeScreen;
