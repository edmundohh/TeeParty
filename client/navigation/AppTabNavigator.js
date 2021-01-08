import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import FollowingScreen from '../screens/FollowingScreen';
import AccountScreen from '../screens/AccountScreen';
import FeedScreen from '../screens/FeedScreen';
import CoursesScreen from '../screens/CoursesScreen';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import CourseNavigator from './CourseNavigator';
import FollowingNavigator from './FollowingNavigator';
import NewLogScreen from '../screens/NewLogScreen';

const AppTab = createBottomTabNavigator();

const AppTabNavigator = () => (
  <AppTab.Navigator
    tabBarOptions={{
      activeTintColor: "green",
    }}>
    <AppTab.Screen 
      name="Feed" 
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="golf-tee" size={25} color={color} />
      }}
    />
    <AppTab.Screen 
      name="Courses" 
      component={CourseNavigator} 
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="golf" size={25} color={color} />
      }}
    />
    <AppTab.Screen 
      name="Log" 
      component={NewLogScreen} 
      options={{
        tabBarIcon: ({ color }) => <FontAwesome name="pencil-square-o" size={25} color={color} />
      }}
    />
    <AppTab.Screen 
      name="Following" 
      component={FollowingNavigator} 
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="people" size={25} color={color} />
      }}
    />
    <AppTab.Screen 
      name="Account" 
      component={AccountNavigator} 
      options={{
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="golf-cart" size={25} color={color} />
      }}
    />
  </AppTab.Navigator>
)

export default AppTabNavigator;