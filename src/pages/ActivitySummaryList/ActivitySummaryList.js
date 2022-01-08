import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {useSelector} from 'react-redux';

import ActivityCard from '../../Component/ActivityCard';
import styles from './ActivitySummaryList.styles';

const ActivitySummaryList = () => {
  const DATA = useSelector(state => state.previousRuns);
  console.log(DATA);
  const renderItem = ({item}) => (
    <ActivityCard
      day={item.day}
      timeOfDay={item.timeOfDay}
      distance={item.distance}
      time={item.time}
      cal={item.cal}
    />
  );

  return (
    <View style={styles.container}>
      {DATA.length == 0 ? (
        <View style={styles.innerContainer}>
          <Text style={styles.text_warning}>
            No Activity Found! Let's Start Running!!
          </Text>
        </View>
      ) : (
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ActivitySummaryList;
