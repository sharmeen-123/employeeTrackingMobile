import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {React, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {globalstyles} from './constants';
import Geolocation from '@react-native-community/geolocation';

export default function Startshift(props) {
  // const [startTime, setStartTime] = useContext(AuthContext);
  const handleStartPress = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log("position",position);
      },
      error => {
        console.log(error);
        Alert.alert(
          'Error',
          'Please enable location services to start the shift',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
        );
      },
      // {
      //   enableHighAccuracy: true,
      //   timeout: 20000,
      //   maximumAge: 1000,
      // },
    );
  };

  const checkLocationServices = () => {
    Geolocation.getCurrentPosition(
      position => {
        Geolocation.getCurrentPosition(info => console.log("heyyy i m cords",info.coords));
        props.navigation.navigate('Timer', {location: position.coords});
        console.log("position",position);
        handleStartPress();
      },
      error => {
        console.log(error);
        Alert.alert(
          'Error',
          'Please enable location services to start the shift',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
        );
      },
    );
  };

  return (
    <LinearGradient colors={['#E4F9E9', '#fff']} style={{height: '100%'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // top: responsiveHeight(15),
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text}>Start a new Shift!</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              checkLocationServices();
            }}>
            <Text style={styles.buttonText}>START</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={globalstyles.bckimg}>
        <Image
          style={{height: responsiveHeight(25), width: responsiveWidth(100)}}
          source={require('../assets/bck.png')}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#338B47',
    borderRadius: 80,
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    top: responsiveHeight(10),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
});
