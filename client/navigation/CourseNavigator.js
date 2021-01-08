import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import FeedScreen from "../screens/FeedScreen";
import CoursesScreen from "../screens/CoursesScreen";

const Stack = createStackNavigator();

const CourseNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen 
      name="Courses" 
      component={CoursesScreen} 
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
        headerShown: false
      }}
    />
  </Stack.Navigator>
);

export default CourseNavigator;
