import React from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');
const boxSize = width * 0.7; // Ukuran kotak 70% dari lebar layar

// Define your bounding box dimensions (adjust as necessary)
const overlayBox = {
  x: 150, // Start from the left
  y: 440, // Start from the top
  width: 420, // Width of the overlay
  height: 420, // Height of the overlay
};

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
  const [isScanned, setIsScanned] = useState(false);

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

  const isCodeInBox = (codeFrame, overlay) => {
    if (!codeFrame || !overlayBox) {
      return false;
    }

    const codeLeft = codeFrame.x;
    const codeTop = codeFrame.y;
    const codeRight = codeFrame.x + codeFrame.width;
    const codeBottom = codeFrame.y + codeFrame.height;

    const overlayLeft = overlay.x;
    const overlayTop = overlay.y;
    const overlayRight = overlay.x + overlay.width;
    const overlayBottom = overlay.y + overlay.height;

    const isInBox =
      codeLeft >= overlayLeft &&
      codeTop >= overlayTop &&
      codeRight <= overlayRight &&
      codeBottom <= overlayBottom;

    return isInBox;
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async codes => {
      if (isScanned) {
        return;
      }

      const isInBox = isCodeInBox(codes[0]?.frame, overlayBox);

      if (isInBox) {
        setIsScanned(true);
        const code = await AsyncStorage.getItem('code');
        if (codes[0]?.value !== code) {
          Alert.alert(
            'Kesalahan',
            'QR Code tidak Valid',
            [
              {
                text: 'OK',
                onPress: () => {
                  setIsScanned(false); // Reset state setelah klik OK
                },
              },
            ],
            {cancelable: false},
          );
          return;
        }
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
      <View style={styles.overlay}>
        <View style={styles.scanBox} />
        <Text style={styles.scanText}>Arahkan QR Code ke dalam kotak</Text>
      </View>
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
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -boxSize / 2}, {translateY: -boxSize / 2}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanBox: {
    width: boxSize,
    height: boxSize,
    borderWidth: 2,
    borderColor: '#00FF00', // Warna hijau untuk kotak pemindaian
    borderRadius: 10,
  },
  scanText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
});

export default ScannerScreen;
