import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import space from '../../styles/space';

const base_style = StyleSheet.create({
  container: {
    padding: space.normal,
    margin: space.normal,
    borderRadius: space.huge,
    alignItems: 'center',
  },
  bottom_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: space.tiny,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
});

export default {
  primary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: colors.orange,
    },
    title: {
      ...base_style.title,
      color: 'white',
    },
  }),

  secondary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: colors.orange,
    },
    title: {
      ...base_style.title,
      color: colors.orange,
    },
  }),
};
