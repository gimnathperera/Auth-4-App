import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { React, useState, useRef, useEffect } from 'react';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Countries } from '../src/Countries';
import { BASE_URL } from '../common/contants';

const OTPScreen = ({ route, navigation }) => {
  let textInput = useRef(null);
  const { id } = route.params;

  const defaultCodeCountry = '+60';
  const defaultMaskCountry = '016 777 877';
  const [phoneNumber, setPhoneNumber] = useState();
  const [focusInput, setFocusInput] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataCountries, setDataCountries] = useState(Countries);
  const [codeCountry, setCodeCountry] = useState(defaultCodeCountry);
  const [placeholder, setPlaceholder] = useState(defaultMaskCountry);
  const [isLoading, setIsLoading] = useState(false);
  const [textError, setTextError] = useState('');

  const onChangeNumber = (number) => {
    setTextError('');
    setPhoneNumber(number);
  };

  const onSenOTP = async () => {
    try {
      if (phoneNumber) {
        setIsLoading(true);
        const mobileNumber = codeCountry + phoneNumber;
        const result = await axios.post(`${BASE_URL}/api/auth/send-otp`, {
          mobileNumber,
        });
        if (!result?.data) return showErrorToast();

        setIsLoading(false);
        showSuccessToast();
        navigation.navigate('OTPScreen', {
          otpId: result?.data?.data?.otpId,
          id: id,
        });
      } else {
        setTextError('Required*');
      }
    } catch (err) {
      showErrorToast();
      setIsLoading(false);
    }
  };

  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'OTP has been  sent successfully',
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'OTP sending failed',
    });
  };

  const onChangeBlur = () => {
    setFocusInput(false);
  };
  const onChangeFocus = () => {
    setFocusInput(true);
  };
  const onShowHideModal = () => {
    setModalVisible(!modalVisible);
  };
  const filterCountries = (value) => {
    if (value) {
      const countryData = dataCountries.filter(
        (obj) => obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1
      );
      setDataCountries(countryData);
    } else {
      setDataCountries(Countries);
    }
  };

  const onCountryChange = (item) => {
    setCodeCountry(item.dialCode);
    setPlaceholder(item.mask);
    onShowHideModal();
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  let renderModal = () => {
    return (
      <Modal animationType='slide' transparent={false} visible={modalVisible}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View style={styles.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder={'Search'}
                focusable={true}
                style={styles.filterInputStyle}
              />
            </View>
            <FlatList
              style={{ flex: 1 }}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onCountryChange(item)}>
                  <View style={styles.countryModalStyle}>
                    <View style={styles.modalItemContainer}>
                      <Text style={styles.modalItemName}>{item.en}</Text>
                      <Text style={styles.modalItemDialCode}>
                        {item.dialCode}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            ></FlatList>
          </View>
          <TouchableOpacity
            onPress={onShowHideModal}
            style={styles.closeButtonStyle}
          >
            <Text style={styles.closeTextStyle}>CLOSE</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoiddingView}
      >
        <Text style={styles.textTitle}>Please Enter Your Phone Number</Text>
        <View
          style={[
            styles.containerInput,
            { borderWidth: 1, borderColor: focusInput ? '#244BD7' : 'white' },
            Boolean(textError.length) > 0 && styles.inputError,
          ]}
        >
          <TouchableOpacity onPress={onShowHideModal}>
            <View style={styles.openDialogView}>
              <Text>{codeCountry + ' |'}</Text>
            </View>
          </TouchableOpacity>
          {renderModal()}
          <TextInput
            ref={(input) => (textInput = input)}
            style={styles.phoneInputStyle}
            placeholder={placeholder}
            keyboardType='number-pad'
            onChangeText={onChangeNumber}
            secureTextEntry={false}
            onFocus={onChangeFocus}
            onBlur={onChangeBlur}
            autoFocus={focusInput}
          />
          {textError.length > 0 && (
            <Text style={styles.errorText}>{textError}</Text>
          )}
        </View>
        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={onSenOTP}>
            <View
              style={[
                styles.btnContinue,
                {
                  backgroundColor: phoneNumber ? '#244DB7' : 'gray',
                },
              ]}
            >
              {isLoading ? (
                <ActivityIndicator size='small' color='#fff' />
              ) : (
                <Text style={styles.textContinue}>Continue</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoiddingView: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  textTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 16,
  },
  containerInput: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  openDialogView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneInputStyle: {
    marginLeft: 5,
    flex: 1,
    height: 50,
  },

  viewBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContinue: {
    color: '#ffffff',
    alignItems: 'center',
  },
  modalContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: 'white',
  },
  filterInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    color: '#424242',
  },

  countryModalStyle: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row',
  },
  modalItemName: {
    flex: 1,
    fontSize: 16,
  },
  modalItemDialCode: {
    fontSize: 16,
  },
  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: 'center',
  },
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  errorText: {
    padding: 4,
    color: 'red',
    fontSize: 12,
  },
  inputError: { borderWidth: 1, borderColor: 'red' },
});
