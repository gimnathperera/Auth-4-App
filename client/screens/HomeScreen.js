import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { fullName } = route.params;

  const handleLogout = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text>Welcome, {fullName || '-'}</Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonOutlineText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
