import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Geolocation from '@react-native-community/geolocation';
import {globalstyles} from './constants';
import { AuthContext } from '../App';

export default function Timer(props) {
  const {id, setActiveId } = useContext(AuthContext);
  const [startTime, setStartTime] = useState(new Date());
  const [timer, setTimer] = useState(0);
  const [shift, setShift] = useState(false)
  let shiftId;
  const [timerId, setTimerId] = useState(null); // added state to hold timer interval ID


  const location = props.route.params?.location;
  url = process.env.API_URL;

  useEffect(() => {
    const date = new Date()
    setStartTime(date);
    console.log("start time", startTime, "date", date)
    console.log(".........................id..................",id);
    if(id){
      startShift();
      console.log('............in use effect shift..............', shiftId)
    }
    // setFormattedStartTime(time)
    setTimerId(
      setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
        // updateLocation();
      }, 1000),
    );
    // if (shift){
    //   updateLocation(shift);
    // }

    // Call the API every 5 minutes
    const interval = setInterval(() => {
      console.log(".........................shift id..................",shiftId);
      if (shiftId){
        updateLocation();
      }
    }, 60 * 1000); // 5 minutes in milliseconds

    // Clear the interval when the component unmounts
    return () => {clearInterval(interval);
                  clearInterval(timerId);} // clear timer interval on unmount
  }, []);

  // calling start shift api
  const startShift = async () => {
    console.log('..........................in start Shift----------------------')
    let res = await axios.post(`${url}/shifts/startShift`, {userID:id,checkinTime:startTime, checkinLocation:location})
    .then ((res) => {
      shiftId = res.data._id;
      setShift(res.data._id);
      console.log("in start shift res.data.id =" , res.data._id);
      console.log("in start shift id =" , shift);
    }
      
    )
    .catch((error) => {
      // setErrorMsg(error.response.data);
        console.log("error occured")
        console.log("error",error.response.data);
    })
  }

  // calling update location api
  const updateLocation = async () => {
    console.log('..........................in update location----------------------', shiftId)
    console.log("shift id in update data....................."+ shiftId)
    let res = await axios.put(`${url}/shifts/changeLocation/${shiftId}`, {lastLocation:location})
    .then ((res) => {
     console.log("location updated");
    }
      
    )
    .catch((error) => {
      // setErrorMsg(error.response.data);
        console.log("error occured")
        console.log("error",error.response.data);
    })
  }


  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEndShift = () => {
    clearInterval(timerId); // stop the timer
    const endTime = new Date();
    const totalTime = timer;
    console.log("in end shift handler ", shiftId);
    props.navigation.navigate('End', {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      shiftId:shift,
      location : location,
      totalTime,
      // console.log(props)
    });
  };

  return (
    <View style={styles.container}>
      <View style={globalstyles.logocontainer}>
        <Text style={styles.text}>On Going Shift</Text>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
        <Text style={styles.locationText}>
          Current location:{' '}
          {location ? `${location.latitude}, ${location.longitude}` : 'Unknown'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleEndShift}>
          <Text style={globalstyles.text}>End Shift</Text>
        </TouchableOpacity>
      </View>
      <View style={globalstyles.bckimg}>
        <Image
          style={{height: responsiveHeight(25), width: responsiveWidth(100)}}
          source={require('../assets/bck.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2B5204',
  },
  timerText: {
    fontSize: responsiveFontSize(10),
    fontWeight: 'bold',
    top: responsiveHeight(5),
  },
  locationText: {
    color: '#DCFFE4',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    top: responsiveHeight(7),
  },
  text: {
    color: '#DCFFE4',
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a3d9af',
    width: responsiveWidth(50),
    height: responsiveHeight(5),
    borderRadius: 10,
    top: responsiveHeight(15),
  },
});

// import React, {useState, useEffect} from 'react';
// import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize,
// } from 'react-native-responsive-dimensions';
// import Geolocation from '@react-native-community/geolocation';
// import {globalstyles} from './constants';

// export default function Timer(props) {
//   const [timer, setTimer] = useState(0);
//   const [startTime, setStartTime] = useState(null);

//   const location = props.route.params?.location;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prevTimer => prevTimer + 1);
//     }, 1000);
//     setStartTime(new Date());
//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = timeInSeconds => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds
//       .toString()
//       .padStart(2, '0')}`;
//   };

//   const handleEndShift = () => {
//     const endTime = new Date();
//     const totalTime = timer;
//     props.navigation.navigate('End', {
//       startTime: startTime.toISOString(),
//       endTime: endTime.toISOString(),
//       totalTime,
//       // console.log(props)
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={globalstyles.logocontainer}>
//         <Text style={styles.text}>On Going Shift</Text>
//         <Text style={styles.timerText}>{formatTime(timer)}</Text>
//         <Text style={styles.locationText}>
//           Current location:{' '}
//           {location ? `${location.latitude}, ${location.longitude}` : 'Unknown'}
//         </Text>
//         <TouchableOpacity style={styles.button} onPress={handleEndShift}>
//           <Text style={globalstyles.text}>End Shift</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={globalstyles.bckimg}>
//         <Image
//           style={{height: responsiveHeight(25), width: responsiveWidth(100)}}
//           source={require('../assets/bck.png')}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#2B5204',
//   },
//   timerText: {
//     fontSize: responsiveFontSize(10),
//     fontWeight: 'bold',
//     top: responsiveHeight(5),
//   },
//   locationText: {
//     color: '#DCFFE4',
//     fontSize: responsiveFontSize(2),
//     fontWeight: 'bold',
//     top: responsiveHeight(7),
//   },
//   text: {
//     color: '#DCFFE4',
//     fontSize: responsiveFontSize(4),
//     fontWeight: 'bold',
//   },
//   button: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#a3d9af',
//     width: responsiveWidth(50),
//     height: responsiveHeight(5),
//     borderRadius: 10,
//     top: responsiveHeight(15),
//   },
// });
