import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from 'react';
import { StyleSheet, TabBarIOS, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AppScreen from './components/AppScreen';
import AppTextInput from './components/AppTextInput';
import AuthNavigator from './navigation/AuthNavigator';
import Card from './components/Card';
import CourseDetailScreen from './screens/CourseDetailScreen';
import AppTabNavigator from './navigation/AppTabNavigator';
import AuthContext from './auth/context';

const getFonts = () => Font.loadAsync({
  "MPLUSRounded": require('./assets/fonts/MPLUSRounded1c-Medium.ttf')
});

export default function App() {
  const [ fontsLoaded, setFontsLoaded ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState();

  if (fontsLoaded) {
    return (
      <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavigationContainer>
          {/* <AppTabNavigator /> */}
          {currentUser ? <AppTabNavigator/> : <AuthNavigator/>}
        </NavigationContainer>
      </AuthContext.Provider>
      // <View style={{
      //   backgroundColor: "#ededed",
      //   padding: 20,
      //   paddingTop: 100
      // }}>
      //   <Card
      //     title="Redwoods Golf Course"
      //     description="par 99"
      //     // username="hello"
      //     image={require("./assets/images/redwoods.png")}
      //     />
      // </View>
      // <CourseDetailScreen
      //   name="Redwoods Golf Course"
      //   par="par 72"/>
      // <FollowingScreen/>
      // <AccountScreen/>
      // <FeedScreen/>
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

