import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import parseContentData from '../../utils/parseContentData';
import Button from '../../Component/Button';
import routes from '../../Navigation/routes';

import styles from './Dashboard.styles';

export default function Dashboard() {
  const [contentList, setContentList] = useState([]);
  const navigation = useNavigation();
  // const route = useRoute();
  // const item = route.params;

  const handleNewActivity = () => navigation.navigate(routes.NEWACTIVITY);

  // const item = auth().currentUser.email;

  // const date = new Date().toISOString();
  // const userName = item.split('@')[0];

  useEffect(() => {
    database()
      .ref('users/')
      .on('value', snapshot => {
        const contentData = snapshot.val();

        const parsedData = parseContentData(contentData || {});
        setContentList(parsedData);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>{date}</Text> */}
      <Text>{`Merhaba ${contentList.username} aktivitenize hoşgeldiniz.`}</Text>
      <Text style={styles.header}>toplam yapılan mesafe</Text>
      <Text style={styles.header}> toplam süre</Text>
      <Text style={styles.header}>aktivite sayısı</Text>
      <Button text="Yeni Aktivite" onPress={handleNewActivity}/>
      <Button text="Aktivite Geçmişim" />
      <Button text="Leaderboard" />
    </SafeAreaView>
  );
}
