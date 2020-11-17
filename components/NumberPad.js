import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const NumberPad = ({onPress, onDelete}) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Button title={'1'} onPress={() => onPress(1)} />
      <Button title={'2'} onPress={() => onPress(2)} />
      <Button title={'3'} onPress={() => onPress(3)} />
    </View>
    <View style={styles.row}>
      <Button title={'4'} onPress={() => onPress(4)} />
      <Button title={'5'} onPress={() => onPress(5)} />
      <Button title={'6'} onPress={() => onPress(6)} />
    </View>
    <View style={styles.row}>
      <Button title={'7'} onPress={() => onPress(7)} />
      <Button title={'8'} onPress={() => onPress(8)} />
      <Button title={'9'} onPress={() => onPress(9)} />
    </View>
    <View style={styles.row}>
      <Button title={'  '} />
      <Button title={'0'} onPress={() => onPress(0)} />
      <Button title={'E'} onPress={() => onDelete()} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default NumberPad;
