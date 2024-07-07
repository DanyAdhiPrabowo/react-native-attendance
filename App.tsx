import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginSceen from './src/screens/LoginScreen';
import TabNavigator from './src/screens/TabNavigator';
import ScannerScreen from './src/screens/ScannerScreen';
import AttendaceConfirmScreen from './src/screens/AttendaceConfirm';
import LoadingScreen from './src/screens/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  let [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (error) {
        setUserToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  if (isLoading) {
    return null; // Optionally, you can show a loading spinner here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userToken ? 'HomeTabs' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={LoginSceen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen
          name="AttendaceConfirm"
          component={AttendaceConfirmScreen}
          options={{headerTitle: 'Konfirmasi Absen'}}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfileScreen}
          options={{headerTitle: 'Update Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
