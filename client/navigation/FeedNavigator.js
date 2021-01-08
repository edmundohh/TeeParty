import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import FeedScreen from "../screens/FeedScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Feed" 
      component={FeedScreen}
      options={{
        headerStyle: { backgroundColor: "green" },
        headerTintColor: "white",
        headerShown: true
      }} 
    />
    <Stack.Screen 
      name="Course Information" 
      component={CourseDetailScreen} 
      options={{
        headerStyle: { backgroundColor: "green" },
        headerTintColor: "white",
        headerShown: true
      }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
