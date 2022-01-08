import React, {useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  Platform,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import ProgressBar from '../../../../Component/ProgressBar';
import colors from '../../../../styles/colors';
import {
  calculatePace,
  pacePresentation,
  secondsToHm,
} from '../../../../utils/Calculations';
import styles from './SummerDetailCard.styles';

const SummaryDetailCard = ({
  day,
  value,
  onChangeText,
  distance,
  time,
  cal,
  kilometerLeft,
  backgroundColor,
  nextLevelbackgroundColor,
  prog,
  innerBorderColor,
  containerBorderColor,
  metricValue,
}) => {
  // Reference to TextInput component
  const textInputRef = useRef();

  return (
    // Main Container
    <Pressable style={styles.mainContainer} onPress={() => Keyboard.dismiss()}>
      {/* Day-Time */}
      <Text style={styles.subheading}>{day} - 07:28</Text>
      {/* TextInput- heading with pencil icon */}
      <Pressable
        style={styles.textInputContainer}
        onPress={() => textInputRef.current.focus()}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          ref={textInputRef}
        />
        <SimpleLineIcons name="pencil" size={20} />
      </Pressable>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.KeyboardAvoidingView}
        keyboardVerticalOffset={-100}>
        <View style={styles.kilometerContainer}>
          {/* Kilometers */}
          <View style={styles.innerKilometerContainer}>
            <Text style={styles.kilometerValue}>{distance.toFixed(1)}</Text>
            <Text style={styles.kilometerMetric}>Kilometers</Text>
          </View>
          {/* Metric pace, time and calories */}
          <View style={styles.metricContainer}>
            <View>
              <Text style={styles.metricValue}>
                {pacePresentation(calculatePace(metricValue))}
              </Text>
              <Text style={styles.metric}>Pace</Text>
            </View>
            <View>
              <Text style={styles.metricValue}>
                {secondsToHm(time).substring(0, 5)}
              </Text>
              <Text style={styles.metric}>Time</Text>
            </View>
            <View>
              <Text style={styles.metricValue}>{cal}</Text>
              <Text style={styles.metric}>Calories</Text>
            </View>
          </View>
          {/* LOGO AND Progress bar */}
          <View style={styles.ImageLogoContainer}>
            <Image
              source={require('../../../../assets/Logo2.png')}
              style={{...styles.image, backgroundColor: backgroundColor}}
            />
            <Image
              source={require('../../../../assets/Logo2.png')}
              style={{
                ...styles.nextLevelImage,
                backgroundColor: nextLevelbackgroundColor,
              }}
            />
            <ProgressBar
              prog={prog}
              innerBorderColor={innerBorderColor}
              containerBorderColor={containerBorderColor}
              containerBgr={colors.summaryProgressBarContainerBackground}
            />
            <Text style={styles.kilometerLeft}>
              {kilometerLeft} Km to Orange Level
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default SummaryDetailCard;
