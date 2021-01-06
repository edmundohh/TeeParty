import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AppScreen from './components/AppScreen';
import AppTextInput from './components/AppTextInput';
import AuthNavigator from './navigation/AuthNavigator';

const getFonts = () => Font.loadAsync({
  "MPLUSRounded": require('./assets/fonts/MPLUSRounded1c-Medium.ttf')
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
});

