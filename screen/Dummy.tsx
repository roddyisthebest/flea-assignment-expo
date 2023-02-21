import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Dummy: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dummy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
  },
});

export default Dummy;
