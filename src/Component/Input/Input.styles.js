import {StyleSheet} from 'react-native';

import space from '../../styles/space';

export default StyleSheet.create({
  container: {
    padding: space.normal,
    margin: space.normal,
    backgroundColor: '#e0e0e0',
    borderRadius: space.tiny,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
});
