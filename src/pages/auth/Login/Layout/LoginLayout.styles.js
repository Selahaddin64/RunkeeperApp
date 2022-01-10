import {StyleSheet, Dimensions} from 'react-native';
import color from '../../../../styles/colors';
import space from '../../../../styles/space';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '64b5f6',
  },
  header: {
    color: color.orange,
    margin: space.small,
    fontSize: 60,
    textAlign: 'center',
  },
  logo_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height * 0.3,
    width: width * 0.6,
    backgroundColor: color.orange,
  },
});
