import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import ActivityCard from '../../Component/Cards/ActivityCard';
import Button from '../../Component/Button';
import routes from '../../Navigation/routes';
import styles from './Dashboard.styles';

export default function Dashboard() {
  const item = useSelector(state => state.previousRuns);
  const navigation = useNavigation();

  const handleNewActivity = () => navigation.navigate(routes.NEWACTIVITY);

  const handleActivityList = () =>
    navigation.navigate(routes.ACTIVITYSUMMARYLİST);

  const handleLeaderBoard = () => {
    navigation.navigate(routes.LEADERBOARD);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {item.length === 0 ? (
        <View style={styles.innerContainer}>
          <Text style={styles.text_warning}>
            No Activity Found! Let's Start Running!!
          </Text>
          <Button text="New Activity" onPress={handleNewActivity} />
          <Button text="Activity List" onPress={handleActivityList} />
          <Button text="Leaderboard" onPress={handleLeaderBoard} />
        </View>
      ) : (
        <ActivityCard
          day={item.day}
          timeOfDay={item.timeOfDay}
          distance={item.distance}
          time={item.time}
          cal={item.cal}
        />
      )}
    </SafeAreaView>
  );
}