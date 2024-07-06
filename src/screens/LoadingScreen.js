import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={120} color="#2196F3" />
      <Text style={styles.textDark}>Loading....</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cacaca',
  },
  textDark: {
    color: '#343a40',
  },
});

export default LoadingScreen;
