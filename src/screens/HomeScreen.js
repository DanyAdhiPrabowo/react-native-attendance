import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import dummyData from '../data.json';

const HomeSceen = () => {
  // const [email, onChangeEmail] = React.useState();
  // const [password, onChangePassword] = React.useState();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.bgLight, styles.containerHeader]}>
        <View style={[styles.bgPrimary, styles.background]} />
        <View style={styles.center}>
          <Text style={[styles.textLight, {marginVertical: 15, fontSize: 15}]}>
            Hallo, Dany Adhi
          </Text>
          <Text style={[styles.textLight, styles.clock]}>10:24</Text>
          <Text style={styles.textLight}>Jumat, 28 Juni 2024</Text>
        </View>
        <View style={styles.containerCard}>
          <View style={[styles.bgLight, styles.card]}>
            <View style={styles.timeContainener}>
              <View style={styles.timeView}>
                <Text>Waktu Masuk</Text>
                <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 20}}>
                  -
                </Text>
              </View>
              <View style={styles.timeView}>
                <Text>Waktu Keluar</Text>
                <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 20}}>
                  -
                </Text>
              </View>
            </View>
            <Pressable style={[styles.bgPrimary, styles.button]}>
              <Text style={styles.textLight}>Check In</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={[styles.bgLight, styles.containerFlat]}>
        <Text style={{fontSize: 15, fontWeight: 'bold', paddingBottom: 10}}>
          Recent attendace
        </Text>
        <FlatList
          data={dummyData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text
                style={[styles.textPrimary, {fontSize: 14, fontWeight: '800'}]}>
                {item.date}
              </Text>
              <View style={styles.row}>
                <Text style={styles.title}>Check In</Text>
                <Text style={styles.value}>{item.checkin}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Check Out</Text>
                <Text style={styles.value}>{item.checkout}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default HomeSceen;
