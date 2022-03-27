import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './OnboardingScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import InputMobile from './InputMobileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPScreen from './OTPScreen';
import FaceImageUploadScreen from './FaceImageUploadScreen';
import FaceImageRecognitionScreen from './FaceImageRecognitionScreen';
import FaceGrestureScreen from './FaceGrestureScreen';
import HomeScreen from './HomeScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routeName}
    >
      <RootStack.Screen name='Onboarding' component={OnboardingScreen} />
      <RootStack.Screen name='Login' component={LoginScreen} />
      <RootStack.Screen name='Register' component={SignupScreen} />
      <RootStack.Screen name='InputMobile' component={InputMobile} />
      <RootStack.Screen name='OTPScreen' component={OTPScreen} />
      <RootStack.Screen
        name='FaceImageUploadScreen'
        component={FaceImageUploadScreen}
      />
      <RootStack.Screen
        name='FaceImageRecognitionScreen'
        component={FaceImageRecognitionScreen}
      />
      <RootStack.Screen
        name='FaceGrestureScreen'
        component={FaceGrestureScreen}
      />
      <RootStack.Screen name='HomeScreen' component={HomeScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
