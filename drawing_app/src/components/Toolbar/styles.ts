import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  toolbar: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  tools: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
}); 