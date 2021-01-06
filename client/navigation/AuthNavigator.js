import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "green" },
      headerTintColor: "white",
      fontFamily: "MPLUSRounded",
      headerShown: false
    }}>
    <Stack.Screen 
      name="Welcome" 
      component={WelcomeScreen}
    />
    <Stack.Screen 
      name="Login"
      component={LoginScreen}
      options={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "green",
        headerShown: true
      }}/>
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "green",
        headerShown: true
      }}/>
  </Stack.Navigator>
)

export default AuthNavigator;