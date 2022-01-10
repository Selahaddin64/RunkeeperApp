import React from 'react';
import {View, Text} from 'react-native';

import styles from './LeaderBoardTextBox.styles';

const LeaderBoardTextBox = props => {
  return (
    <View style={styles.container}>
      <Text>{props.name.description.substring(0, 50)}</Text>
      <Text style={styles.metricValue}>
        {props.distance.toFixed(1).description.substring(0, 50)}
      </Text>
      <Text style={styles.metric}>Kilometer</Text>
    </View>
  );
};

export default LeaderBoardTextBox;
