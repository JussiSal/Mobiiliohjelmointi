import React from 'react';
import { Text, View, FlatList } from 'react-native';

export default function History({ route, navigation }) {
  const {history} = route.params;

  return (
    <View style={{ alignItems: 'center' }}>
          <Text>History</Text>
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <Text>{item.calc}</Text>}
          />
        </View>

  );
}