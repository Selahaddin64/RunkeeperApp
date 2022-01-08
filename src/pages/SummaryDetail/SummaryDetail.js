import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {Levels} from '../../utils/Levels';
import SummaryDetailCard from './Component/SummerDetailCard/SummerDetailCard';

const SummaryDetail = ({route}) => {
  // Getting total Kms ran from redux
  const totalKmRan = useSelector(state => state.totalKms);
  // Props from each run
  const props = route.params;
  console.log(props);
  const [title, setTitle] = useState('');
  const [imageBackground, setImageBackground] = useState('green');
  const [nextLevelImageBackground, setNextLevelImageBackground] =
    useState('orange');
  const [progress, setProgress] = useState('20%');
  const [kilometerLeft, setKilometerLeft] = useState(0);
  // Function to change title input
  const titleChangeHandler = input => {
    setTitle(input);
  };

  // Function to calculate the Level of that user
  const calculateLevelHandler = totalKmRan => {
    for (let i = 0; i < Levels.length; i++) {
      if (Levels[i].kilometerRequired > totalKmRan) {
        setImageBackground(Levels[i - 1].level);
        setNextLevelImageBackground(Levels[i].level);
        let percentageDone = totalKmRan / Levels[i].kilometerRequired;
        setProgress(percentageDone * 100 + '%');
        setKilometerLeft(Levels[i].kilometerRequired - totalKmRan);
        return;
      }
      setImageBackground(Levels[i].level);
      setNextLevelImageBackground(Levels[i].level);
      let percentageDone = totalKmRan / Levels[i].kilometerRequired;
      setProgress(percentageDone * 100 + '%');
      setKilometerLeft(Levels[i].kilometerRequired - totalKmRan);
    }
  };

  // This hook works only once
  useEffect(() => {
    const startTite = props.day + ' ' + props.timeOfDay + ' Run';
    setTitle(startTite);
    calculateLevelHandler(totalKmRan);
  }, []);

  return (
    <SummaryDetailCard
      day={props.day}
      value={title}
      onChangeText={titleChangeHandler}
      distance={props.distance}
      time={props.time}
      cal={props.cal}
      metricValue={(props.distance, props.time)}
      kilometerLeft={kilometerLeft}
      backgroundColor={imageBackground}
      nextLevelbackgroundColor={nextLevelImageBackground}
      prog={progress}
      innerBorderColor={imageBackground}
      containerBorderColor={imageBackground}
    />
  );
};

export default SummaryDetail;
