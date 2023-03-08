import React, {useState, useContext, useEffect} from 'react';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { AuthContext } from '../App';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {gradients} from './constants';
import {globalstyles} from './constants';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

// const ImagePicker = require('react-native-image-picker');

export default function Editprofile(props) {
  const [imageUri, setImageUri] = useState(null);
  const {id, setActiveId } = useContext(AuthContext);
  const [Name, setName] = useState('');
  const [address, setaddress] = useState('chak number 463');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState("");
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [transfered, setTransfered] = useState(0)

  url = process.env.API_URL;

  const handleError = () => {
    setError(false);
  }

  let userData = async () => {
    console.log('..........................in get user----------------------')
    let res = await axios.get(`${url}/user/getOneUser/`+id)
    .then ((res) => {
      // const fName  = res.data[0]
      // setName(fName)
     setName(res.data.data[0].firstName+" "+res.data.data[0].lastName);
     setEmail(res.data.data[0].email);
     setphone(res.data.data[0].phone.toString());
     setImageUri(res.data.data[0].image);
     setaddress(res.data.data[0].address)
    }
      
    )
    .catch((error) => {
      // setErrorMsg(error.response.data);
        console.log("error occured")
        console.log("error",error);
    })
  }

  let updateUser = async () => {
    console.log('..........................in get user----------------------')
    let res = await axios.put(`${url}/user/updateUser/`+id, {name:Name, email:email, phone: phone, password:password,address:address,  image:imageUri})
    .then ((res) => {
      // const fName  = res.data[0]
      // setName(fName)
      setError(false);
    
    }
      
    )
    .catch((error) => {
      // setErrorMsg(error.response.data);
        console.log("error occured")
        console.log("error",error.response.data);
        setError(error.response.data)
    })
  }

  useEffect(() => {
    console.log("in use effect", id)
    userData();
  }, []);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    // getUser();


    launchImageLibrary(options, response => {
      console.log(response.assets[0].uri);
      if (response.assets[0].uri) {
        setImageUri(response.assets[0].uri);
        console.log('response:  ', response.assets[0].uri);
        updateProfileImage()
      }
    });
  };

  // console.log('1st imageUri:', imageUri, id);
  

  const handlsave = () => {
    console.log('name:', Name);
    updateUser()
  };

  const updateProfileImage = async () => {


    let filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    setUploading(true);
    try{
      await storage().ref(filename).putFile(imageUri);
      setUploading(false)
      console.log("your image has been uploaded to firebase")

    }catch(e){
      console.log(e);
    }
    // setImageUri('')
  }
  // const handleTakePhoto = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     quality: 1,
  //   };
  //   ImagePicker.launchCamera(options, response => {
  //     if (response.uri) {
  //       setImageUri(response.uri);
  //       console.log('takeimageUri:', imageUri);
  //     }
  //   });
  // };

  return (
    <LinearGradient colors={gradients} style={{height: '100%'}}>
      <ScrollView>
        <View style={globalstyles.upercontainer}>
          <Image
            source={require('../assets/rect.png')}
            style={globalstyles.upbckimg}
          />
          <View style={globalstyles.imageContainer}>
            {imageUri && (
              <Image
                source={{uri: imageUri}}
                style={globalstyles.profileimage}
              />
            )}

            <TouchableOpacity onPress={handleChoosePhoto}>
              <Text style={{color: 'black', top: responsiveHeight(1)}}>
                Choose Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={globalstyles.inputcontainer}>
          <TextInput
            value={Name}
            onChangeText={setName}
            style={globalstyles.name}></TextInput>

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
            placeholder="Enter Your Password"
            placeholderTextColor="black"
            onChangeText={setPassword}
            value={password}
            require={true}
            secureTextEntry={true}
          />

          <TextInput
            style={globalstyles.input}
            placeholder="Enter Your Phone number"
            placeholderTextColor="black"
            onChangeText={setphone}
            value= {phone}
            // inputMode="email"
            keyboardType="numeric"
            require={true}
          />
          <TextInput
            style={globalstyles.input}
            placeholder="Enter Your Address"
            placeholderTextColor="black"
            onChangeText={setaddress}
            value={address}
            require={true}
          />
          <TouchableOpacity style={globalstyles.button} onPress={handlsave}>
            <Text style={globalstyles.buttontext}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <PopupDialog
        visible={error}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        onTouchOutside={handleError}>
        <View style={globalstyles.alert}>
          <Text style={globalstyles.alertTitle}>Warning</Text>
          <Text style={globalstyles.alertMessage}>
            {error}
          </Text>
          <TouchableOpacity
            style={globalstyles.alertButton}
            onPress={handleError}>
            <Text style={globalstyles.alertButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </PopupDialog>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
