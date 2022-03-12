import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Formik } from 'formik';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import { userLoginSchema } from '../common/validation.schema';
import { BASE_URL } from '../common/contants';

const LoginScreen = () => {
  const navigation = useNavigation();
  const formikRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${BASE_URL}/api/auth/login`, values);
      setIsLoading(false);
      showSuccessToast();
      formikRef.current?.resetForm();
    } catch (err) {
      showErrorToast();
      setIsLoading(false);
    }
  };

  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'User credential vaidated successfully',
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Invalid credentials',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LottieView
        source={require('../assets/logo.json')}
        autoPlay
        loop
        style={styles.logo}
      />

      <Text style={styles.text}>FYP Demo App</Text>
      <Formik
        initialValues={initialFormValues}
        validationSchema={userLoginSchema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
        innerRef={formikRef}
      >
        {({ errors, handleChange, touched, values, handleSubmit }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Email'
                value={values.email}
                onChangeText={handleChange('email')}
                style={[
                  styles.input,
                  touched.email && errors.email && styles.inputError,
                ]}
                keyboardType='email-address'
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                placeholder='Password'
                value={values.password}
                onChangeText={handleChange('password')}
                style={[
                  styles.input,
                  touched.password && errors.password && styles.inputError,
                ]}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={handleSubmit}
              >
                {isLoading ? (
                  <ActivityIndicator size='small' color='#0782F9' />
                ) : (
                  <Text style={styles.buttonOutlineText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('InputMobile')}>
          <Text style={{ paddingTop: 20 }}> Go to OTP Screen</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          Don't have an acount? &nbsp;
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.color_textPrivate, { color: '#FF0000' }]}>
            Create Here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const initialFormValues = {
  email: '',
  password: '',
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  inputError: { borderWidth: 1, borderColor: 'red' },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
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
  logo: {
    paddingTop: 5,
    height: 200,
    width: 200,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    color: '#051d5f',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 30,
    justifyContent: 'center',
    paddingTop: 20,
  },
  color_textPrivate: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'black',
  },
  errorText: {
    padding: 4,
    color: 'red',
    fontSize: 12,
  },
});
