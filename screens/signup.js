import React, { useState } from 'react';
// import api from '../axios';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { gradients } from './constants';
import { globalstyles } from './constants';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

export default function Signup(props) {
  const [Name, setName] = useState('');
  const [lName, setlName] = useState('');

  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [cPassword, setcPassword] = useState(false);
  const [signup, setsignup] = useState(false);
  const [error, setError] = useState(false);
  const [errorDes, setErrorDes] = useState('');

  url = process.env.API_URL;

  const handleSignup = () => {
    if (!Name || !lName || !phone || !email || !password || !confirmPassword) {
      // alert('Please fill all fields');
      setShowAlert(true);

      return;
    }

    if (
      !/^(?=.*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9]).{8,}$/.test(
        password,
      )
    ) {
      setshowPassword(true);

      return;
    }

    if (password !== confirmPassword) {
      setcPassword(true);
      return;
    }

    else {
     register();
    }

  };

  // calling api
  const register = async () => {
    console.log("in register")
    let res = await axios.post(`${url}/user/register`, {firstName:Name, lastName:lName, email:email, phone:phone,
                                              password:password, userType:"Employee", verified: false, 
                                              status: "unblock"})
    .then ((res) => {

      setError(false)
      setsignup(true);
      props.navigation.navigate('Login');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
      
    )
    .catch((error) => {
      setError(true);
      setErrorDes(error.response.data);
        console.log("error occured")
        console.log("error",error.response.data);
    })
  }

  
  const handleHideAlert = () => {
    setShowAlert(false);
  };
  const handlePassword = () => {
    setshowPassword(false);
  };
  const handlecPassword = () => {
    setcPassword(false);
  };
  const handleError = () => {
    setError(false);
  };
  const handlesignup = () => {
    setsignup(false);
    // props.navigation.navigate('Login');
  };


  return (
    <LinearGradient colors={gradients} style={{ height: '100%' }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <View style={styles.logocontainer}>
            <Image
              source={require('../assets/logo.png')}
              style={{ height: responsiveHeight(20), resizeMode: 'contain' }}
            />
            <Text style={globalstyles.text}>Sign up</Text>
            <TextInput
              style={globalstyles.input}
              placeholder="Enter Your First Name"
              placeholderTextColor="black"
              onChangeText={setName}
              value={Name}
              require={true}
            />
            <TextInput
              style={globalstyles.input}
              placeholder="Enter Your Last Name"
              placeholderTextColor="black"
              onChangeText={setlName}
              value={lName}
              require={true}
            />
            <TextInput
              style={globalstyles.input}
              placeholder="Enter Your Email"
              placeholderTextColor="black"
              onChangeText={setEmail}
              value={email}
              inputMode="email"
              require={true}
            />
            <TextInput
              style={globalstyles.input}
              placeholder="Enter Your Phone number"
              placeholderTextColor="black"
              onChangeText={setphone}
              value={phone}
              // inputMode="email"
              keyboardType="numeric"
              require={true}
            />

            <TextInput
              placeholder="Enter Your Password"
              style={globalstyles.input}
              placeholderTextColor="black"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              require={true}
            />
            <TextInput
              placeholder="Confirm Your Password"
              style={globalstyles.input}
              placeholderTextColor="black"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={true}
              require={true}
            />
            <TouchableOpacity
              style={globalstyles.button}
              onPress={handleSignup}>
              <Text style={globalstyles.buttontext}>Signup</Text>
            </TouchableOpacity>

            <View style={globalstyles.linecontainer}>
              <View style={globalstyles.line} />
              <Text style={{ color: 'black', marginHorizontal: 5 }}>Or</Text>
              <View style={globalstyles.line} />
            </View>

            <View style={styles.logincont}>
              <Text style={{ color: 'black' }}>Already have an account</Text>
              <Text
                style={{
                  color: '#338B47',
                  fontWeight: 'bold',
                  marginLeft: 5,
                  fontSize: responsiveFontSize(1.8),
                }}
                onPress={() => {
                  props.navigation.navigate('Login');
                }}>
                Login
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <PopupDialog
        visible={showAlert}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        onTouchOutside={handleHideAlert}>
        <View style={globalstyles.alert}>
          <Text style={globalstyles.alertTitle}>Warning</Text>
          <Text style={globalstyles.alertMessage}>
            Please fill out all fields.
          </Text>
          <TouchableOpacity
            style={globalstyles.alertButton}
            onPress={handleHideAlert}>
            <Text style={globalstyles.alertButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </PopupDialog>
      <PopupDialog
        visible={showPassword}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        onTouchOutside={handlePassword}>
        <View style={globalstyles.alert}>
          <Text style={globalstyles.alertTitle}>Warning</Text>
          <Text style={globalstyles.alertMessage}>
            Password must contain 8 alphabets.
          </Text>
          <TouchableOpacity
            style={globalstyles.alertButton}
            onPress={handlePassword}>
            <Text style={globalstyles.alertButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </PopupDialog>
      <PopupDialog
        visible={cPassword}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        onTouchOutside={handlecPassword}>
        <View style={globalstyles.alert}>
          <Text style={globalstyles.alertTitle}>Warning</Text>
          <Text style={globalstyles.alertMessage}>
            Password and confirm Password must be same.
          </Text>
          <TouchableOpacity
            style={globalstyles.alertButton}
            onPress={handlecPassword}>
            <Text style={globalstyles.alertButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </PopupDialog>
      <PopupDialog
        visible={error}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        onTouchOutside={handleError}>
        <View style={globalstyles.alert}>
          <Text style={globalstyles.alertTitle}>Warning</Text>
          <Text style={globalstyles.alertMessage}>
            {errorDes}
          </Text>
          <TouchableOpacity
            style={globalstyles.alertButton}
            onPress={handleError}>
            <Text style={globalstyles.alertButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </PopupDialog>
      <PopupDialog
        visible={signup}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        onTouchOutside={handlesignup}>
        <View style={globalstyles.alert}>
          <Text style={globalstyles.successalertTitle}>Congartulations</Text>
          <Text style={globalstyles.alertMessage}>Now please login.</Text>
          <TouchableOpacity
            style={globalstyles.alertButton}
            onPress={handlesignup}>
            <Text style={globalstyles.alertButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </PopupDialog>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  logocontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: responsiveHeight(8),
    // height: responsiveHeight(25),
    // width: responsiveWidth(10),
  },
  logincont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
