import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../styles/colors';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.summaryBackgroundColor,
    flex: 1,
    borderTopWidth: 1,
    borderColor: colors.summaryBorder,
    padding: 20,
  },
  subheading: {
    fontSize: 16,
    color: colors.summarySubheading,
  },
  textInputContainer: {
    borderBottomWidth: 1,
    borderColor: colors.summaryBorder,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  kilometerContainer: {
    flex: 1,
  },
  innerKilometerContainer: {
    marginTop: 12,
  },
  kilometerValue: {
    fontSize: 80,
    fontWeight: 'bold',
  },
  kilometerMetric: {
    fontSize: 16,
    color: colors.summarySubheading,
  },
  metricContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  metric: {
    color: colors.summaryMetric,
    fontSize: 16,
  },
  ImageLogoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 80,
    marginBottom: 12,
  },
  nextLevelImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 25,
    top: height * 0.34,
    left: width * 0.83,
  },
  progressBarContainer: {
    borderRadius: 4,
    borderColor: '#fff',
    backgroundColor: '#ccc',
    width: '80%',
    borderWidth: 2,
  },
  progressBar: {
    borderRadius: 4,
    borderWidth: 2,
  },
  kilometerLeft: {
    marginTop: 12,
  },
});
