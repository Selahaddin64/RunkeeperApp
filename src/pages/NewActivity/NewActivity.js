import React, {useEffect, useState, useRef, useCallback} from 'react';
import {View, Alert, Text} from 'react-native';
import MapView, {Circle, Polyline} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import GeoLocation from 'react-native-geolocation-service';
import Share from 'react-native-share';

import * as Actions from '../../Context/actions/action';
import {hasPermission} from '../../utils/LocationPermission';
import {
  calculatePace,
  getDayName,
  getTimeOfDay,
  pacePresentation,
  secondsToHm,
  calDistance,
} from '../../utils/Calculations';
import Weather from './Component/Weather';
import RunCard from './Component/RunCard/RunCard';
import routes from '../../Navigation/routes';
import styles from './NewActivity.styles';

const NewActivity = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const interval = useRef(null);
  const watchId = useRef(null);
  const currentRun = useSelector(state => state.currentRun);

  const [location, setLocation] = useState(null);
  const [metricValue, setMetricValue] = useState('0.0');
  const [progress, setProgress] = useState('0%');
  const [currentPace, setCurrentPace] = useState('-\'--"');
  const [calories, setCalories] = useState('--');
  const [targetValue, setTargetValue] = useState('0.0');
  const [result, setResult] = useState('');

  // Getting total time and distance covered in previous run from redux store
  let totalTime = useSelector(state => state.currentRun.time);
  let totalDistance = useSelector(state => state.currentRun.distance);

  // function to get current location of user
  const getCurrentLocation = async () => {
    GeoLocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      error => {
        setLocation(null);
        Alert.alert(
          "We couldn't fetch your location. Please check your device location service!",
        );
        setLocation(null);
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
  };

  const getLocationUpdates = async () => {
    const LocationPermission = await hasPermission();
    if (!LocationPermission) {
      return;
    }
    let oldLocation = null;
    watchId.current = GeoLocation.watchPosition(
      position => {
        setLocation(position);
        let newDistance;
        let newTime;
        if (oldLocation == null) {
          newDistance = '0.0';
        } else {
          newDistance = calDistance(
            oldLocation.coords.latitude,
            oldLocation.coords.longitude,
            position.coords.latitude,
            position.coords.longitude,
          );
        }
        totalDistance = totalDistance + parseFloat(newDistance);
        totalTime = totalTime + newTime;
        setCurrentPace(pacePresentation(calculatePace(newDistance, newTime)));
        // Dispatching save current run action every 30 seconds
        dispatch(
          Actions.save_current_run({
            distance: totalDistance,
            time: totalTime,
          }),
        );
        setMetricValue(secondsToHm(totalTime).substring(0, 5));
        setMetricValue(totalDistance.toFixed(1));
        oldLocation = position;
      },
      error => {
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 30000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
        useSignificantChanges: false,
      },
    );
  };

  // This useEffect add listener to focus event

  useEffect(() => {
    navigation.addListener('focus', event => {
      interval.current = setInterval(() => getCurrentLocation(), 30000);
      getCurrentLocation();
    });
    return () => clearInterval(interval.current);
  }, [navigation]);

  useEffect(() => {
    navigation.addListener('blur', event => {
      clearInterval(interval.current);
      interval.current = null;
    });
  }, [navigation]);

  const updateProgress = () => {
    let target, current;
    //convert HH:MM to minutes

    // 01:01
    current = parseInt(metricValue.substring(0, 2)) * 60; //60
    current = current + parseInt(metricValue.substring(3, 5)); //61

    // 02:00
    target = parseInt(targetValue.substring(0, 2)) * 60; //120
    target = target + parseInt(targetValue.substring(3, 5));

    current = parseFloat(metricValue);
    target = parseFloat(targetValue);

    // Edge case
    if (target === 0) {
      return;
    }
    let percentageCompleted = current / target;
    setProgress(percentageCompleted * 100 + '%');
  };
  // Function to remove location updates api
  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      GeoLocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  const handleStart = () => {
    updateProgress();
    navigation.addListener('focus', event => {
      getLocationUpdates();
    });
    navigation.addListener('blur', event => {
      removeLocationUpdates();
    });
  };

  useEffect(() => {
    setTargetValue(targetValue);
  }, []);

  const myCustomShare = async ({
    totalDistance,
    totalTime,
    cal,
    currentPace,
  }) => {
    const shareOptions = {
      title: 'Compleated your run !',
      message: `Total distance: ${totalDistance}
      Total time: ${totalTime}
      Calories: ${cal}
      Total pace: ${currentPace}`,
    };
    try {
      const shareResponse = await Share.open(shareOptions);
      setResult(JSON.stringify(shareResponse, null, 2));
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  // Functions to save run to redux store and db, also moving to summary screen
  const saveRun = () => {
    dispatch(
      Actions.save_run_to_db({
        day: getDayName(),
        timeOfDay: getTimeOfDay(),
        distance: currentRun.distance,
        time: currentRun.time,
        cal: 0,
      }),
    );

    navigation.reset({
      index: 1,
      routes: [
        // {name: 'HomeTabs'},
        {
          name: routes.SUMMARYDETAIL,
          params: {
            day: getDayName(),
            timeOfDay: getTimeOfDay(),
            distance: currentRun.distance,
            time: currentRun.time,
            cal: calories,
          },
        },
      ],
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mapContainer} pointerEvents="none">
        <MapView
          region={{
            latitude: location?.coords.latitude || 37.78825,
            longitude: location?.coords.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          minZoomLevel={18}
          style={styles.map}>
          {/* <Polyline coordinates={position} strokeWidth={5} /> */}
          <Circle
            center={{
              latitude: location?.coords.latitude || 37.78825,
              longitude: location?.coords.longitude || -122.4324,
            }}
            radius={4}
            fillColor="red"
          />
        </MapView>
      </View>
      <View style={styles.weatherContainer}>
        <Weather />
        <Text>
          {' '}
          {location?.timestamp
            ? new Date(location.timestamp).toLocaleString()
            : ''}
        </Text>
      </View>
      <RunCard
        currentRun={currentRun}
        calories={calories}
        secondsToHm={secondsToHm}
        currentPace={currentPace}
        prog={progress}
        startOnPress={() => {
          handleStart;
        }}
        onLongPress={saveRun}
        onPress={myCustomShare}
      />
      <Text style={styles.result}>{result}</Text>
    </View>
  );
};

export default NewActivity;
