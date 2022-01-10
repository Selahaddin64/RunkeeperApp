import React from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';

import ProgressBar from '../../../../Component/ProgressBar';
import styles from './RunCard.styles';

const RunCard = ({
  currentRun,
  calories,
  secondsToHm,
  currentPace,
  prog,
  startOnPress,
  onLongPress,
  onPress,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.metricMainContainer}>
        <View style={styles.metricInnerContainer}>
          <View style={styles.metricContainer}>
            <Text style={styles.metricValue}>
              {currentRun.distance.toFixed(1)}
            </Text>
            <Text style={styles.metric}>Kilometers</Text>
          </View>
          <View style={styles.secondMetricContainer}>
            <Text style={styles.metricValue}>{calories}</Text>
            <Text style={styles.metric}>Calories</Text>
          </View>
        </View>
        <View style={styles.metricInnerContainer}>
          <View style={styles.metricContainer}>
            <Text style={styles.metricValue}>
              {secondsToHm(currentRun.time).substring(0, 5)}
            </Text>
            <Text style={styles.metric}>Time</Text>
          </View>
          <View style={styles.secondMetricContainer}>
            <Text style={styles.metricValue}>{currentPace}</Text>
            <Text style={styles.metric}>Pace</Text>
          </View>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          prog={prog}
          containerBgr={'#ccc'}
          propStyles={{width: '90%'}}
          containerBorderColor={'#fff'}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Avatar
          size={100}
          rounded
          icon={{name: 'pause'}}
          onPress={startOnPress}
          activeOpacity={0.7}
          containerStyle={styles.startButton}
        />
        <Avatar
          size={100}
          rounded
          icon={{name: 'stop'}}
          activeOpacity={0.7}
          containerStyle={styles.stopButton}
          onLongPress={onLongPress}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default RunCard;
