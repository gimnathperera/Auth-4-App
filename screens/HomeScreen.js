import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import firebase from 'firebase/app';



const HomeScreen = () => {

  const [loggedInUser, setLoggedInUser]= useState({
    fullname:''
  })

  useEffect (() =>{
    var userUID = firebase.auth().currentUser.uid;
    firebase.app()
    .database('https://fypdemo-389f2-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('users/')
    .child(userUID).on('value',(user)=>{
    setLoggedInUser({
        fullname:user.val().fullname
    })
    })
}, [])

  return (
    <View style={styles.container}>
      {/* <Text>Welcome, {auth.currentUser?.email}</Text>  */}
      <Text>Welcome, {loggedInUser.fullname}</Text> 
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
})