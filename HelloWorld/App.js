import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {

  const [text, setText] = React.useState('');

  const buttonPressed = () => {
    Alert.alert('You typed' + text);
  }

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button onPress={buttonPressed} title="Press me" />
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
