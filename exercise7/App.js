import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Alert, Image } from 'react-native';

export default function App() {

  const [userInput, setUserInput] = React.useState('');
  const [recipies, setRecipies] = React.useState([]);
  const url = 'http://www.recipepuppy.com/api/?i=';

  const find = () => {
    let searchUrl = url + userInput;
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        setRecipies(data.results);
        console.log(data.results)
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
      <Image source ={{ uri: item.thumbnail }} style={{width: 50, height: 50}}/>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 9 , paddingTop: 40}}>
        <FlatList
          style={{ marginLeft: "5%" }}
          keyExtractor={item => item.href}
          renderItem={renderItem}
          data={recipies}
        />
      </View>
      <View style={{ flex: 1}}>
        <TextInput
          style={{borderColor: 'black', borderWidth:1, width: 100, paddingBottom: 10}}
          placeholder='Search'
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
        />
        <Button
          title="FIND"
          onPress={() => find()}
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
