import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {

  const [answ, setAnsw] = React.useState('');
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState('Guess a number between 1-100');
  const [rand, setRand] = React.useState(Math.floor(Math.random() * 100) + 1);

  const check = () => {


    if (answ == rand) {
      alert('You guessed the number in ' + count + ' guesses!');
      setRand(Math.floor(Math.random() * 100) + 1);
      setText('Guess a number between 1-100');
      setCount(1);
      return;
    } else if (answ > rand) {
      setText('Your guess ' + answ + ' is too high');
    } else if (answ < rand) {
      setText('Your guess ' + answ + ' is too low');
    }
    setCount(count + 1);
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <View style={{ padding: 20 }}>
        <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
          keyboardType={'numeric'}
          onChangeText={answ => setAnsw(answ)}
          value={answ}
        />
      </View>
      <Button title="Make guess" onPress={check} />
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
