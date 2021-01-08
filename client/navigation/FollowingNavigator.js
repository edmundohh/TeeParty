import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FollowingScreen from "../screens/FollowingScreen";
import PlayerScreen from "../screens/PlayerScreen";



const Stack = createStackNavigator();

const FollowingNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Following" 
      component={FollowingScreen} 
      options={{
        headerStyle: { backgroundColor: "green" },
        headerTintColor: "white",
        headerShown: true
      }}
    />
    <Stack.Screen 
      name="Player Profile" 
      component={PlayerScreen} 
      options={{
        headerStyle: { backgroundColor: "green" },
        headerTintColor: "white",
        headerShown: true
      }}
    />
  </Stack.Navigator>
);

export default FollowingNavigator;
