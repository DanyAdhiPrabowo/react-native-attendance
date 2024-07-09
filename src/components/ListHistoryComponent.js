import moment from 'moment';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const ListHistoryComponent = props => {
  const renderHeader = () => (
    <View
      style={[styles.bgLight, styles.containerFlat, {backgroundColor: 'red'}]}>
      <Text style={[styles.textDark, {fontSize: 15, fontWeight: 'bold'}]}>
        Data absen terbaru
      </Text>
    </View>
  );

  return (
    <FlatList
      data={props.data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={[styles.textPrimary, {fontSize: 14, fontWeight: '800'}]}>
            {moment(item.created_at).format('DD MMMM YYYY')}
          </Text>
          <View style={styles.row}>
            <Text style={styles.title}>Masuk</Text>
            <Text style={styles.value}>
              {item.check_in ? item.check_in.slice(0, -3) : '-'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Pulang</Text>
            <Text style={styles.value}>
              {item.check_out ? item.check_out.slice(0, -3) : '-'}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  textPrimary: {
    color: '#2196F3',
  },
  bgLight: {
    backgroundColor: '#f8f9fa',
  },
  containerFlat: {
    flex: 1,
    padding: 16,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 16,
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

export default ListHistoryComponent;
