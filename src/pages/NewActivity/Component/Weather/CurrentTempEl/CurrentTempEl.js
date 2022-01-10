import React from 'react';
import {View, Image, Text} from 'react-native';

import styles from './CurrentTempEl.styles';

const CurrentTempEl = ({data}) => {
  if (data && data.weather) {
    const img = {
      uri:
        'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png',
    };
    return (
      <View style={styles.currentTempContainer}>
        <Image source={img} style={styles.image} />
        <View>
          <Text>Night - {data.temp.night}&#176;C</Text>
          <Text>Day - {data.temp.day}&#176;C</Text>
        </View>
      </View>
    );
  } else {
    return <View />;
  }
};

export default CurrentTempEl;
