import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Account" 
      component={AccountScreen} 
      options={{
        headerStyle: { backgroundColor: "green" },
        headerTintColor: "white",
        headerShown: true
      }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
