import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DangerAlertComponent = props => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'pink',
    padding: 10,
  },
  text: {
    color: 'red',
    marginLeft: 10,
  },
});

export default DangerAlertComponent;
