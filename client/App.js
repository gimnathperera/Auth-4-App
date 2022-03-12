import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { DrawerContent } from './screens/DrawerContent';
import MainTabScreen from './screens/MainTabScreen';
import LoginScreen from './screens/LoginScreen';
import SupportScreen from './screens/SupportScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import RootStackScreen from './screens/RootStackScreen';
import FaceRecognizeScreen from './screens/FaceRecognizeScreen';

import firebase from 'firebase/app';

export default function App() {
  const Drawer = createDrawerNavigator();
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        {
          /* Set a user if someone is logged in */
        }
        setUser(user);
      } else {
        {
          /* Set user to null, we do this to handle log outs */
        }
        setUser(null);
      }
    });
  }, []);

  let [fontsLoaded] = useFonts({
    'Kufam-SemiBoldItalic': require('./assets/fonts/Kufam-SemiBoldItalic.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      {user && (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen
            name='HomeDrawer'
            component={MainTabScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen name='SupportScreen' component={SupportScreen} />
          <Drawer.Screen name='BookmarkScreen' component={BookmarkScreen} />
          <Drawer.Screen
            name='FaceRecognizeScreen'
            component={FaceRecognizeScreen}
          />
          <Drawer.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      )}
      {!user && <RootStackScreen />}
      <Toast position='bottom' />
    </NavigationContainer>
  );
}
