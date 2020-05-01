import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { ListItem, Input, Header, Button } from 'react-native-elements';

const db = SQLite.openDatabase('listdb.db');

export default function List({ navigation }) {
  const [address, setAddress] = useState('');
  const [disable, setDisable] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists list (id integer primary key not null, address text);');
    });
    updateList();
  }, []);

  useEffect(() => {
    if (address == '') {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [address]);

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from list;', [], (_, { rows }) =>
        setList(rows._array)
      );
    });
  }

  const additem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into list (address) values (?);', [address]);
    }, null, updateList
    );
    setAddress('');
  }

  const deleteitem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from list where id = ?;`, [id]);
      }, null, updateList
    )
  }

  const renderItem = ({ item }) => (
    <ListItem
      title={item.address}
      rightSubtitle= {<Text onPress={() => navigation.navigate('Map', {address: item.address})} style={{color: '#d3d3d3'}}>Show on map</Text>}
      bottomDivider
      chevron
      onLongPress={() => deleteitem(item.id)}
    />
  )

  return (
    <View >
      <Input
        placeholder='Type in address'
        label='PLACEFINDER'
        containerStyle={{ marginTop: 10 }}
        onChangeText={address => setAddress(address)}
        value={address}
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