import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [rates, setRates] = React.useState({});
  const [ammount, setAmmount] = React.useState('');
  const [picked, setPicked] = React.useState('USD');
  const [result, setResult] = React.useState('');
  let url = 'https://api.exchangeratesapi.io/latest';

  React.useEffect(() => {
    findrates();
  }, [])

  const findrates = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRates(data.rates);
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }

  const convert = () => {
    let rate = rates[picked];
    let convertedAmmount = ammount * rate;
    setResult(convertedAmmount + '€');
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ paddingBottom: 20 }}>{result}</Text>
      <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
        <TextInput
          style={{ width: 100, borderColor: 'gray', borderWidth: 1 }}
          keyboardType={'numeric'}
          onChangeText={value => setAmmount(value)}
          value={ammount}
        />
        <Picker
          selectedValue={picked}
          style={{ height: 50, width: 100 }}
          onValueChange={(value) =>
            setPicked(value)
          }>
          {Object.keys(rates).map((item) => {
            return <Picker.Item label={item} value={item} />
          })}

        </Picker>
      </View>
      <Button title='Convert' onPress={() => convert()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
