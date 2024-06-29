import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const LoginSceen = ({navigation}) => {
  const [email, onChangeEmail] = React.useState();
  const [password, onChangePassword] = React.useState();

  const handleLogin = () => {
    // Simulate successful login (replace with your logic)
    navigation.navigate('HomeTabs'); // Navigate to HomeTabs on login
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerView}>
          <Text style={[styles.textDark, styles.headerText]}>
            Selamat Datang di APP Absensi
          </Text>
          <Text style={[styles.textDark, styles.headerText]}>
            Kantor PU Kota Bengkulu
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={[styles.input]}
            placeholder="Masukkan Email"
            placeholderTextColor="gray"
            onChangeText={onChangeEmail}
            value={email}
            keyboardType="email"
          />
          <TextInput
            style={[styles.input]}
            placeholder="Masukkan Password"
            placeholderTextColor="gray"
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
          />
          <View style={styles.buttonView}>
            {/* <Button onPress={() => Alert.alert('Login success')} title="Login" /> */}
            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    marginTop: -50,
    flex: 1,
  },
  textDark: {
    color: '#343a40',
  },
  card: {
    width: '95%',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 7,
    elevation: 50,
    shadowColor: 'red',
  },
  headerView: {
    marginBottom: 40,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 40,
    color: 'red',
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 7,
  },
  buttonView: {
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    height: 45,
    borderColor: '#2196F3',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default LoginSceen;
