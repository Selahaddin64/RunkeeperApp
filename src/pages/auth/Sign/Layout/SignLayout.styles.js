import {StyleSheet} from 'react-native';
import color from '../../../../styles/colors';
import space from '../../../../styles/space';

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
  logo_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 400,
    width: 400,
    backgroundColor: color.green,
  },
});
