import React from 'react';
import { onPress, StyleSheet, Text, TouchableOpacity } from 'react-native';

function AppButton({ title, onPress, color, textColor, disabled }) {
  return (
    <TouchableOpacity disabled={disabled} style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10
  },
  text: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold"
  }
})

export default AppButton;