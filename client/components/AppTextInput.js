import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

function AppTextInput({ ...placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} {...placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E0E0",
    borderRadius: 40,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10
  },
  textInput: {
    fontFamily: "MPLUSRounded",
    color: "black",
    fontSize: 16
  }
})

export default AppTextInput;