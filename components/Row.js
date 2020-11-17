import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';

const currencyFormat = (number) => {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const value = parseInt(number) / 100;
  return formatter.format(value);
};

const Row = ({item, onPress, onDelete}) => (
  <TouchableWithoutFeedback key={item.tag} onPress={onPress}>
    <View style={[styles.rowContainer, {backgroundColor: item?.color}]}>
      <View>
        <Text>{`ID: ${item.id}`}</Text>
        <Text>{`TAG: ${item.tag}`}</Text>
        <Text>{`VALUE: ${currencyFormat(item.number)}`}</Text>
      </View>
      <View style={styles.deleteContainer}>
        <Button title={'Eliminar'} color={'white'} onPress={onDelete} />
      </View>
    </View>
  </TouchableWithoutFeedback>
);

export default Row;

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  deleteContainer: {marginLeft: 10},
});
