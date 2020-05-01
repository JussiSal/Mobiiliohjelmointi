import React, { useState, useEffect }from 'react';
import * as SQLite from 'expo-sqlite';
import { Text, View, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {
  const [ammount, setAmmount] = React.useState('');
  const [product, setProduct] = React.useState('');
  const [list, setList] = React.useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, product text, ammount text);');
    });
    updateList();
  }, []);

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
        setList(rows._array)
      ); 
    });
  }

  const additem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (product, ammount) values (?, ?);', [product, ammount]);    
    }, null, updateList
  )
  }

  const deleteitem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shoppinglist where id = ?;`, [id]);
      }, null, updateList
    )
  }
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder='Product'
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 , marginTop: 60}}
        onChangeText={product => setProduct(product)}
        value={product}
      />
      <TextInput
      placeholder='Ammount'
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={ammount => setAmmount(ammount)}
        value={ammount}
      />
      <Button onPress={additem} title="Save" />

      <Text style={{ color: 'blue' }}>Shopping List</Text>
      <FlatList
        data={list}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={listSeparator}
        renderItem={({ item }) =>
          <View style={styles.listcontainer}>
          <Text>{item.product}, {item.ammount}</Text>
          <Text style={{ color: 'blue' }} onPress={() => deleteitem(item.id)}> bought</Text>
          </View>}
      />
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
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});

