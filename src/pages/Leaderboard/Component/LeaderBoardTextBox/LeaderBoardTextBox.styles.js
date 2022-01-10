import {StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricValue: {
    fontWeight: 'bold',
  },
  metric: {
    color: colors.cardMetric,
  },
});
