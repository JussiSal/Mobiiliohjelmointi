import React from 'react';
import { TextInput, View, Text, Button } from 'react-native';

export default function App() {

  const [num1, setNum1] = React.useState('');
  const [num2, setNum2] = React.useState('');
  const [result, setResult] = React.useState('');

  const add = () => {
    setResult(+num1 + +num2);
  }

  const substract = () => {
    setResult(num1 - num2);
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>

      <View>
        <View style={{ flexDirection: 'column', alignItems: 'center'}}>
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

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 40 }}>
          <Button onPress={add} title="+" />
          <Button onPress={substract} title="-" />

        </View>
      </View>
    </View>
  );
}