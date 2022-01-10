import React, {useEffect, useState} from 'react';
import {View, ImageBackground, ToastAndroid} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';

import WeatherData from '../../Component/Weather/WeatherData';
import styles from './Weather.styles';

const API_KEY = '79ada08a1b81e3084bd395c3cd0b3da7';

export default function Weather() {
  const [data, setData] = useState({});
  const [position, setPosition] = useState(null);

  useEffect(() => {
    (async () => {
      GeoLocation.getCurrentPosition(
        position => {
          setPosition(position);
        },
        error => {
          setPosition(null);
          ToastAndroid.show(
            "We couldn't fetch your location. Please check your device location service!",
            ToastAndroid.LONG,
          );
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
          },
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: true,
          forceLocationManager: false,
          showLocationDialog: true,
        },
      );
      //   let {status} = GeoLocation.clearWatch();
      if (position !== 'granted') {
        fetchDataFromApi('40.7128', '-74.0060');
        return;
      }

      let location = GeoLocation.getCurrentPosition({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`,
      )
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          setData(data);
        });
    }
  };

  return (
    <View>
      <ImageBackground style={styles.image}>
        <WeatherData weatherData={data.daily} />
      </ImageBackground>
    </View>
  );
}
