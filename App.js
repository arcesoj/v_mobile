import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import io from 'socket.io-client';
import VInput from './components/VInput';
import NumberPad from './components/NumberPad';

const socket = io(`http://127.0.0.1:3001?channelId=numbers`);

const App: () => React$Node = () => {
  const [number, setNumber] = useState('');
  const [tag, setTag] = useState('');
  const [numberList, setNumberList] = useState([]);

  socket?.on('chat', (msg) => {
    console.log({list: msg});
    setNumberList(msg);
  });

  useEffect(() => {
    fetch('http://127.0.0.1:3000/')
      .then((response) => response.json())
      .then((json) => setNumberList(json.list))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TextInput
            value={tag}
            style={styles.input}
            placeholder={'Tag Name'}
            onChangeText={(text) => {
              setTag(text);
            }}
          />
          <VInput
            value={number}
            style={styles.input}
            placeholder={'Value'}
            onChangeMessage={(value) => {
              setNumber(value);
            }}
          />
          <Button
            title={'Add'}
            onPress={() => {
              setNumber('0');
              setTag('');
              socket?.emit('chat', {tag, number});
            }}
          />
        </View>
        <NumberPad
          onPress={(value) => {
            const currentValue = number + `${value}`;
            setNumber(currentValue);
          }}
          onDelete={() => {
            const currentValue = number.slice(0, -1);
            setNumber(currentValue);
          }}
        />
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.rowContentContainer}>
          {numberList.map((item) => (
            <TouchableWithoutFeedback
              onPress={() => {
                setTag(item.tag);
                setNumber(item.number);
              }}>
              <View style={styles.rowContainer}>
                <Text>{`TAG: ${item.tag}`}</Text>
                <Text>{`VALUE: ${item.number}`}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ccc',
  },
  input: {
    width: 150,
    backgroundColor: 'white',
    marginLeft: 5,
    height: 40,
    paddingLeft: 10,
    borderRadius: 0,
  },
  header: {
    flexDirection: 'row',
  },
  list: {
    marginTop: 10,
    marginBottom: 40,
    marginVertical: 20,
    width: '100%',
    height: '70%',
  },
  rowContainer: {
    flex: 1,
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  rowContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
