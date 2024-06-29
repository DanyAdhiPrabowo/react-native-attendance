import {StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import HomeScreen from './HomeScreen';
import {useEffect, useRef, useState} from 'react';

const ScannerScreen = ({navigation}) => {
  // const [cameraPermission, setCameraPermission] = useState(null);
  const device = useCameraDevice('back'); // Set the initial camera device
  // const camera = useRef < Camera > null;
  // const [capturedPhoto, setCapturedPhoto] = useState(null);
  // const [showPreview, setShowPreview] = useState(false);

  // const checkCameraPermission = async () => {
  //   const status = await Camera.getCameraPermissionStatus();
  //   console.log('status', status);

  //   if (status === 'granted') {
  //     setCameraPermission(true);
  //   } else if (status === 'notDetermined') {
  //     const permission = await Camera.requestCameraPermission();
  //     setCameraPermission(permission === 'authorized');
  //   } else {
  //     setCameraPermission(false);
  //   }
  // };

  // useEffect(() => {
  //   checkCameraPermission();
  // }, []);

  // if (cameraPermission === null) {
  //   return <Text>Checking camera permission...</Text>;
  // } else if (!cameraPermission) {
  //   return <Text>Camera permission not granted</Text>;
  // }

  // if (!device) {
  //   return <Text>No camera device available</Text>;
  // }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes[0]?.value === 'absenkantorpukotabengkulu') {
        navigation.navigate('AttendaceConfirm');
      }
    },
  });

  return (
    <View style={{flex: 1}}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
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
