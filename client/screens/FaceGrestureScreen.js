import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

const FaceGrestureScreen = () => {
  const [hasPermission, setHasPermission] = useState();
  const [faceData, setFaceData] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function getFaceDataView() {
    if (faceData.length === 0) {
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>No faces :(</Text>
        </View>
      );
    } else {
      const _face = faceData[0];

      const eyesShut =
        _face?.rightEyeOpenProbability < 0.4 &&
        _face?.leftEyeOpenProbability < 0.4;
      const winking =
        !eyesShut &&
        (_face?.rightEyeOpenProbability < 0.4 ||
          _face?.leftEyeOpenProbability < 0.4);
      const smiling = _face?.smilingProbability > 0.7;
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>Eyes Shut: {eyesShut.toString()}</Text>
          <Text style={styles.faceDesc}>Winking: {winking.toString()}</Text>
          <Text style={styles.faceDesc}>Smiling: {smiling.toString()}</Text>
        </View>
      );
    }
  }

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
  };

  return (
    <Camera
      type={Camera.Constants.Type.front}
      style={styles.camera}
      onFacesDetected={handleFacesDetected}
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionInterval: 100,
        tracking: true,
      }}
    >
      {getFaceDataView()}
    </Camera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faces: {
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  faceDesc: {
    fontSize: 20,
  },
});

export default FaceGrestureScreen;
