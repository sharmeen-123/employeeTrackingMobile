import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import axios from 'axios';
// import api from '../axios';
import {TouchableOpacity} from 'react-native';
import {React, useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {globalstyles} from './constants';
import Geolocation from '@react-native-community/geolocation';

export default function Endshift(props) {
  url = process.env.API_URL;
  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  };
  useEffect(() => {
    endShift();
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  console.log(formattedDate);

  console.log('Endshift props:', props);

  const startTime = props.route.params.startTime;
  const date = new Date(startTime);
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const endTime = props.route.params.endTime;
  const datee = new Date(endTime);
  const formattedendTime = datee.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const hours = formatTime(props.route.params.totalTime)

  // end Shift api
  const endShift = async () => {
    console.log('..........................in end Shift----------------------', props.route.params.shiftId)
    let res = await axios.put(`${url}/shifts/endShift/`+props.route.params.shiftId, {checkoutTime:endTime, checkoutLocation:props.route.params.location, totalHours:hours.toString()})
    .then ((res) => {
     
    }
      
    )
    .catch((error) => {
      // setErrorMsg(error.response.data);
        console.log("error occured")
        console.log("error",error.response.data);
    })
  }

  return (
    <LinearGradient colors={['#E4F9E9', '#fff']} style={{height: '100%'}}>
      <View style={styles.logocontainer}>
        <Image
          source={require('../assets/logo.png')}
          style={{height: responsiveHeight(20), resizeMode: 'contain'}}
        />
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text}>Shift Ended!</Text>
        </View>
        <View style={globalstyles.smallcontainer}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#338B47',
              fontSize: responsiveFontSize(4),
              // paddingLeft: 15,
              fontWeight: 'bold',
              top: responsiveHeight(-2),
            }}>
            Shift Details
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.headtext}>Date:</Text>
            <Text style={styles.maintext}>{formattedDate}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.headtext}>Starting Time:</Text>
            <Text style={styles.maintext}>{formattedTime}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.headtext}>Ending time:</Text>
            <Text style={styles.maintext}>{formattedendTime}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.headtext}>Total time:</Text>
            <Text style={styles.maintext}>
              {formatTime(props.route.params.totalTime)}
              <Text style={styles.maintext}>hrs</Text>
            </Text>
          </View>
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
  },
  headtext: {
    color: 'black',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  maintext: {
    color: '#338B47',
    fontSize: responsiveFontSize(3),
    paddingLeft: 15,
    fontWeight: 'bold',
    fontFamily: 'yahei',
  },
  logocontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: responsiveHeight(5),
  },
});
