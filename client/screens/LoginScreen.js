import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import AppScreen from "../components/AppScreen";
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

function LoginScreen(props) {
  return (
    <AppScreen>
        <Text style={styles.title}>TeeParty</Text>
        <View style={styles.loginContainer}>
          <AppTextInput placeholder="Username" keyboardType="email-address"></AppTextInput>
          <AppTextInput placeholder="Password" secureTextEntry={true}></AppTextInput>
          <AppButton title="LOGIN" color="green" textColor="white"/>
        </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    padding: 20,
    marginVertical: 60,
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    fontFamily: "MPLUSRounded",
    color: "green",
    alignSelf: "center",
    top: 5
  }
})

export default LoginScreen;