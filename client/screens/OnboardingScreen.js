import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OnboardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <LottieView
          source={require('../assets/lottie_onboarding.json')}
          autoPlay
          loop
          style={styles.lottie}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.btnText}>Get Started</Text>
          <MaterialIcons name='arrow-forward-ios' size={22} color='#0782F9' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  lottie: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#0782F9',
    borderWidth: 2,
    position:'absolute',
    bottom:50
  },
  btnText: {
    textAlign: 'center',
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default OnboardingScreen;
