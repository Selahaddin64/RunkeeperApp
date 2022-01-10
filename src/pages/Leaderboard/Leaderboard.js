import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import LeaderBoardTextBox from './Component/LeaderBoardTextBox';
import styles from './Leaderboard.styles';

const LeaderBoard = () => {
  const [data, setData] = useState([]);

  const Data = useSelector(state => state.previousRuns);

  const productSeperator = () => <View style={styles.product_seperator} />;

  const renderItem = ({item}) => <LeaderBoardTextBox props={item} />;

  useEffect(() => {
    data.sort((a, b) => b.distance - a.distance);
    setData([Data]);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={productSeperator}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </View>
  );
};

export default LeaderBoard;
