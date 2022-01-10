import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    width: 35,
    height: 35,
  },
  currentTempContainer: {
    flexDirection: 'row',
    backgroundColor: '#00000033',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#eee',
    borderWidth: 1,
    padding: 5,
  },
  day: {
    fontSize: 10,
    color: 'white',
    backgroundColor: '#3c3c44',
    padding: 5,
    textAlign: 'center',
    borderRadius: 20,
    fontWeight: '20',
    marginBottom: 10,
  },
  temp: {
    fontSize: 16,
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
  },
});
