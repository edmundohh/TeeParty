import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppButton from '../components/AppButton';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>TeeParty</Text>
      <View style={styles.buttonContainer}>
        <AppButton title="LOGIN" color="white" onPress={() => navigation.navigate("Login")}/>
        <AppButton title="REGISTER" color="yellow" onPress={() => navigation.navigate("Register")}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "green",
    alignItems: "center"
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
    alignItems: "center",
    bottom: 50
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    fontFamily: "MPLUSRounded",
    color: "white",
    position: "absolute",
    top: 200
  }
})

export default WelcomeScreen;