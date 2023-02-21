import { View, Text, StyleSheet } from 'react-native';

const Label = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4f4f4f',
  },
});

export default Label;
