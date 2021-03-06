import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CenterMessage = ({message}) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 10,
  },
  message: {
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default CenterMessage;
