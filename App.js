import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Button,
  ScrollView,
} from 'react-native';
import io from 'socket.io-client';
import VInput from './components/VInput';
import NumberPad from './components/NumberPad';
import Row from './components/Row';

const socket = io(`http://127.0.0.1:3001?channelId=numbers`);

const getRandomColor = () => {
  return (
    'rgb(' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ')'
  );
};

const App: () => React$Node = () => {
  const [number, setNumber] = useState('');
  const [tag, setTag] = useState('');
  const [tagSelected, setTagSelected] = useState(null);
  const [numberList, setNumberList] = useState([]);

  socket?.on('chat', (msg) => {
    setNumberList(msg);
  });

  useEffect(() => {
    fetch('http://127.0.0.1:3000/')
      .then((response) => response.json())
      .then((json) => setNumberList(json.list))
      .catch((error) => console.error(error));
  }, []);

  const saveTag = () => {
    if (
      number === undefined ||
      number.length === 0 ||
      tag === undefined ||
      tag?.trim().length === 0
    ) {
      return;
    }

    if (tagSelected?.id) {
      const updateTag = {
        tag,
        number,
        id: tagSelected?.id,
        color: tagSelected?.color,
      };
      socket?.emit('update', updateTag);
    } else {
      const addTag = {
        tag,
        number,
        id: Date.now(),
        color: getRandomColor(),
      };
      socket?.emit('add', addTag);
    }

    setTagSelected(null);
    setNumber('0');
    setTag('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{backgroundColor: '#ccc', marginTop: 40}}>
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
            <Button title={'Add'} onPress={saveTag} />
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
        </View>
        {numberList.map((item) => (
          <Row
            key={`row-${item.id}`}
            item={item}
            onDelete={() => {
              socket?.emit('delete', item);
            }}
            onPress={() => {
              setTag(item.tag);
              setNumber(item.number);
              setTagSelected(item);
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ccc',
  },
  input: {
    width: 100,
    backgroundColor: 'white',
    marginLeft: 5,
    height: 40,
    paddingLeft: 10,
    borderRadius: 0,
  },
  header: {
    flexDirection: 'row',
  },
});

export default App;
