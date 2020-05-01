import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './components/List.js';
import Mappi from './components/Map.js';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Addresslist" component={List} />
        <Stack.Screen name="Map" component={Mappi} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}