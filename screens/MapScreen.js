import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MapScreen = ({route}) => {
  const {latitude, longitude} = route.params.location;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={{latitude, longitude}} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
