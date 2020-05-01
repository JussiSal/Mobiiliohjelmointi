import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { ListItem, Input, Header, Button } from 'react-native-elements';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {
  const [ammount, setAmmount] = useState('');
  const [product, setProduct] = useState('');
  const [disable, setDisable] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, product text, ammount text);');
    });
    updateList();
  }, []);

  useEffect(() => {
    if (ammount == '' || product == '') {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [ammount, product]);

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
    );
    setProduct('');
    setAmmount('');
  }

  const deleteitem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shoppinglist where id = ?;`, [id]);
      }, null, updateList
    )
  }

  const renderItem = ({ item }) => (
    <ListItem
      title={item.product}
      subtitle={item.ammount}
      rightSubtitle= {<Text onPress={() => deleteitem(item.id)} style={{color: '#d3d3d3'}}>bought</Text>}
      bottomDivider
      chevron
    />
  )

  return (
    <View >
      <Header
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' , marginBottom: 30} }}
        containerStyle={{height: 60}}
      />
      <Input
        placeholder='Product'
        label='PRODUCT'
        containerStyle={{ marginTop: 10 }}
        onChangeText={product => setProduct(product)}
        value={product}
      />
      <Input
        placeholder='Ammount'
        label='AMMOUNT'
        onChangeText={ammount => setAmmount(ammount)}
        value={ammount}
      />
      <Button 
        onPress={additem} title="SAVE"
        containerStyle={{paddingHorizontal: 10}}
        disabled={disable}
      />
      <FlatList
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
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

