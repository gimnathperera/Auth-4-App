import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const FaceRecognizeScreen = ({ navigation }) => {
  const showConfirmDialog = () => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to vote for this profile?',
      [
        {
          text: 'Yes',
          onPress: () => {},
        },
        {
          text: 'No',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name='md-chevron-back-sharp' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtnContainer}
            onPress={() => refRBSheet.current.open()}
          >
            <Ionicons name='md-help-sharp' size={24} color='black' />
          </TouchableOpacity>
        </View>
        <View style={styles.profileCardContainer}>
          <View style={styles.profileCard}>
            <Image
              source={require('../assets/profile.png')}
              resizeMode='cover'
              style={styles.cardImage}
            />
          </View>
        </View>

        <View style={styles.deatilContainer}>
          <View style={styles.deatilSubContainer}>
            <Text style={styles.cardTitle}>Upload an image of your face</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ paddingBottom: 10 }}>Upload photo</Text>
            <TouchableOpacity style={styles.mainBtnContainer1}>
              <Ionicons name='md-checkmark-sharp' size={36} color='white' />
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ paddingBottom: 10 }}>Take a photo</Text>

            <TouchableOpacity style={styles.mainBtnContainer2}>
              <Ionicons name='md-camera-reverse' size={36} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  subContainer: {
    height: '100%',
    width: '100%',
    padding: 10,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
  },
  headerBox: {
    display: 'flex',
    paddingRight: 25,
  },
  avatarContainer: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,1)',
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnContainer: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBtnContainer1: {
    display: 'flex',
    backgroundColor: '#2AB867',
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBtnContainer2: {
    display: 'flex',
    backgroundColor: '#FD8C83',
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleCircle: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 100,
    backgroundColor: '#414143',
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  headerText: {
    fontSize: 20,
  },
  profileCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#414143',
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 0.53,
    shadowRadius: 2,
  },
  cardImage: {
    maxHeight: 400,
    width: '100%',
    borderRadius: 15,
  },
  deatilContainer: {
    paddingLeft: 40,
    display: 'flex',
    paddingTop: 10,
  },
  deatilSubContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardSubTitle: {
    fontSize: 18,
  },
  cardSubHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardRateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  cardRate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDescription: {
    paddingTop: 5,
  },
  cardSubDescription: {
    fontSize: 16,
    paddingTop: 2,
    textAlign: 'justify',
  },
  cardScrollView: {
    height: 180,
    paddingRight: 32,
  },
  floatinBtn: {
    position: 'absolute',
    zIndex: 99,
  },
});

export default FaceRecognizeScreen;
