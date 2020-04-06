import React from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = React.useState('');
  const [list, setList] = React.useState([]);

  const add = () => {
    setList([...list, { key: text }]);
  }

  const clear = () => {
    setList([]);
  }

  return (
    <View >

      <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <TextInput
          style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setText(text)}
          value={text}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20, paddingHorizontal: 140, }}>
        <Button onPress={add} title="ADD" />
        <Button onPress={clear} title="CLEAR" />

      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{color: 'blue'}}>Shopping List</Text>
        <FlatList
          data={list}
          renderItem={({ item }) =>
            <Text>{item.key}</Text>}
        />
      </View>
    </View>

  );
}

