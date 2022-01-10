import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  calculatePace,
  pacePresentation,
  secondsToHm,
} from '../../../utils/Calculations';
import routes from '../../../Navigation/routes';
import styles from './ActivityCard.styles';


const ActivityCard = props => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.mainContainer}
      onPress={() =>
        navigation.navigate(routes.SUMMARYDETAIL, {
          day: props.day,
          timeOfDay: props.timeOfDay,
          distance: props.distance,
          time: props.time,
          cal: props.cal,
        })
      }>
      <View style={styles.innerContainer1}>
        <Image
          source={{uri: 'https://i.stack.imgur.com/ddX9U.png'}}
          style={styles.image}
        />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{props.day}</Text>
          <Text style={styles.subheading}>
            {props.day} {props.timeOfDay} Run
          </Text>
        </View>
      </View>
      <View style={styles.innerContainer2}>
        <View>
          <Text style={styles.metricValue}>{props.distance.toFixed(1)}</Text>
          <Text style={styles.metric}>Kilometer</Text>
        </View>
        <View>
          <Text style={styles.metricValue}>
            {pacePresentation(calculatePace(props.distance, props.time))}
          </Text>
          <Text style={styles.metric}>Avg. Pace</Text>
        </View>
        <View>
          <Text style={styles.metricValue}>
            {secondsToHm(props.time).substring(0, 5)}
          </Text>
          <Text style={styles.metric}>Time</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ActivityCard;
