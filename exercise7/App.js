import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {

  const [userInput, setUserInput] = React.useState('');
  const [recipies, setRecipies] = React.useState([]);
  const url = 'http://www.recipepuppy.com/api/?i=';

  const find = () => {
    let searchUrl = url + userInput;
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
