import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginSceen from './src/screens/LoginScreen';
import TabNavigator from './src/screens/TabNavigator';
import ScannerScreen from './src/screens/ScannerScreen';
import AttendaceConfirmScreen from './src/screens/AttendaceConfirm';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen
          name="Login"
          component={LoginSceen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen
          name="AttendaceConfirm"
          component={AttendaceConfirmScreen}
          options={{headerTitle: 'Konfirmasi Absen'}}
        />
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
