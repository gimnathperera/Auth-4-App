import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import {React, useState, useRef, useEffect} from 'react'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';


const OTPScreen = () => {
  let textInput = useRef(null)
  let clockCall =null

  const lengthInput=6;
  const defaultCountdown =5;
  const [internalVal, setInternalVal]=useState("");
  const [countdown, setCountDown]=useState(defaultCountdown)
  const [enableResend, setEnableResend] =useState(false)
  const navigation = useNavigation()

  useEffect(()=>{
    clockCall = setInterval(()=>{
      decrementClock();
    }, 1000)
    return () =>{
      clearInterval(clockCall)
    }
  })

  const decrementClock =() =>{
    if(countdown === 0 ){
      setEnableResend(true)
      setCountDown(0)
      clearInterval(clockCall)
    }else{
      setCountDown(countdown-1)
    }
    
  }

  const onChangeText =(val) =>{
    setInternalVal(val)
    if(val.length === lengthInput){
      navigation.navigate('Home3')
    }
  }

  useEffect(()=> {
    textInput.focus()
  },[])

  const onResendOTP = () =>{
    if(enableResend){
      setCountDown(defaultCountdown)
      setEnableResend(false)
      clearInterval(clockCall)
      clockCall = setInterval(()=>{
        decrementClock()
      }, 1000)
    }
  }

  return (
    <View style={styles.container}>
   <KeyboardAvoidingView
   keyboardVerticalOffset={50}
   behavior={'padding'}
   style={styles.containerAvoiddingView}>
     
     <Text style={styles.textTitle}>
       Input your OTP code sent via SMS
     </Text>
     <View>
       <TextInput
       ref={(input)=>textInput =input}
       onChangeText={onChangeText}
       style={{width:0, height: 0 }}
       value={internalVal}
       maxLength={lengthInput}
       returnKeyType="done"
       keyboardType="numeric"
       />
       <View style={styles.containerInput}>
         {
           Array(lengthInput).fill().map((data, index) => (

            <View style={[styles.cellView, {borderBottomColor: index === internalVal.length ? '#FB6C6A' : '#808080' }]}
            key={index}>
            <Text style={styles.cellText}
            onPress={()=>textInput.focus()}> {internalVal && internalVal.length > 0 ? internalVal[index] : ""}</Text>
           
            </View>

           ))
         }
        
       </View>
     </View>
     <View style={styles.bottomView}>
     <TouchableOpacity onPress={()=> {navigation.navigate('InputMobile')}}>
         <View style={styles.btnBack}>
          <Text style={[styles.txtBack, {color: '#244BD7'}]}>Back</Text>
         </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={onResendOTP}>
         <View style={styles.btnResend}>
          <Text style={[styles.txtResend,
          {
            color:enableResend ? '#244DB7' : 'gray'
          }]}>Resend OTP ({countdown})</Text>
         </View>
       </TouchableOpacity>

     </View>
     </KeyboardAvoidingView>
</View>
  )
}

export default OTPScreen

const styles = StyleSheet.create({
  container:{
    flex:1
},
containerAvoiddingView:{
    marginTop:50,
    flex:1,
    alignItems: 'center',
    padding:10
},
textTitle:{
  marginBottom: 50,
  marginTop: 50,
  fontSize: 16

},
containerInput:{
  flexDirection:'row',
  alignItems: 'center',
  justifyContent: 'center'
 
},
cellView:{
  paddingVertical: 11,
  width: 40,
  margin: 5,
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomWidth:1.5
},
cellText:{
  textAlign:'center',
  fontSize:16
},
bottomView:{
  flexDirection: 'row',
  flex:1,
  marginBottom:50,
  alignItems:'flex-end'

},
btnResend:{
  width:150,
  height: 50,
  borderRadius: 10,
  alignItems:'flex-end',
  justifyContent:'center'
},
txtResend:{
  alignItems:'center',
  fontSize:16
},
btnBack:{
  width:150,
  height: 50,
  borderRadius: 10,
  alignItems:'flex-start',
  justifyContent:'center'
},
txtBack:{
  alignItems:'center',
  fontSize:16

}
})