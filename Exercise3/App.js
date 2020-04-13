import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [num1, setNum1] = React.useState('');
  const [num2, setNum2] = React.useState('');
  const [result, setResult] = React.useState('');
  const [history, setHistory] = React.useState([]);

  const add = () => {
    setResult(+num1 + +num2);
    let result2 = +num1 + +num2;
    let str = num1 + ' + ' + num2 + ' = ' + result2;
    setHistory([...history, { calc: str }]);
  }

  const substract = () => {
    setResult(num1 - num2);
    let result2 = num1 - num2;
    let str = num1 + ' - ' + num2 + ' = ' + result2;
    setHistory([...history, { calc: str }]);
  }

  return (
    <View >

      <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <Text>Result: {result}</Text>
        <TextInput
          style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
          keyboardType={'numeric'}
          onChangeText={num1 => setNum1(num1)}
          value={num1}
        />
        <TextInput
          style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
          keyboardType={'numeric'}
          onChangeText={num2 => setNum2(num2)}
          value={num2}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20, paddingHorizontal: 140, }}>
        <Button onPress={add} title="+" />
        <Button onPress={substract} title="-" />

      </View>
      <View style={{ alignItems: 'center' }}>
        <Text>History</Text>
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <Text>{item.calc}</Text>}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
