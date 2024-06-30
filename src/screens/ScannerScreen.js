import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useEffect, useState} from 'react';

const PermissionStatus = ({status}) => {
  if (status === null) {
    return (
      <View style={styles.center}>
        <Text style={[styles.textDark]}>Checking camera permission...</Text>
      </View>
    );
  }

  if (status === false) {
    return (
      <View style={styles.center}>
        <Text style={[styles.textDark]}>Camera permission not granted</Text>
      </View>
    );
  }

  return null;
};

const ScannerScreen = ({navigation}) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const device = useCameraDevice('back');

  useEffect(() => {
    const checkCameraPermission = async () => {
      const status = await Camera.getCameraPermissionStatus();

      if (status === 'granted') {
        setCameraPermission(true);
      } else if (status === 'not-determined' || status === 'denied') {
        const permission = await Camera.requestCameraPermission();
        setCameraPermission(permission === 'granted');
      } else {
        setCameraPermission(false);
      }
    };

    checkCameraPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes[0]?.value === 'absenkantorpukotabengkulu') {
        navigation.navigate('AttendaceConfirm');
      }
    },
  });

  return (
    <View style={styles.camera}>
      <PermissionStatus status={cameraPermission} />
      {cameraPermission && device && (
        <Camera
          style={styles.camera}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDark: {
    color: '#343a40',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default ScannerScreen;
