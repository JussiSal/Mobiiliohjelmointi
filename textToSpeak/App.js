import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import * as Speech from "expo-speech";

export default function App() {

  const [userInput, setUserInput] = useState("");

  const speak = () => {
    Speech.speak(userInput);
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Text to convert"
        style={{
          marginTop: 30,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
        }}
        onChangeText={(userInput) => setUserInput(userInput)}
        value={userInput}
      />
      <Button title="Press to hear" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
