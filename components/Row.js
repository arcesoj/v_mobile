import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Row = ({item, onPress, onDelete}) => (
  <TouchableWithoutFeedback key={item.tag} onPress={onPress}>
    <View style={[styles.rowContainer, {backgroundColor: item?.color}]}>
      <View>
        <Text>{`ID: ${item.id}`}</Text>
        <Text>{`TAG: ${item.tag}`}</Text>
        <Text>{`VALUE: ${item.number}`}</Text>
      </View>
      <View>
        <Button title={'Eliminar'} onPress={onDelete} />
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
});
