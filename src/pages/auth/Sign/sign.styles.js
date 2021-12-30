import {StyleSheet} from 'react-native';
import color from '../../../styles/color';
import space from '../../../styles/space';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '64b5f6',
  },
  header: {
    color: color.green,
    margin: space.small,
    fontSize: 160,
    textAlign: 'center',
  },
});
