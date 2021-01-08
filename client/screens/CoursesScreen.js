import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

import AppScreen from '../components/AppScreen'
import Card from '../components/Card';

import coursesAPI from "../api/courses";

function CoursesScreen({ navigation }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  })

  const loadCourses = async () => {
    const response = await coursesAPI.getCourses();
    setCourses(response.data.content);
  }
  return (
    <AppScreen>
      <View style={styles.screen}>
        <FlatList
          data={courses}
          keyExtractor={course => course.cid.toString()}
          renderItem={({ item }) =>
            <Card
              title={item.cname}
              description={"Par " + item.par.toString()}
              imageURL={item.imageURL}
              onPress={() => navigation.navigate("Course Information", item)}
            />
          }
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 25,
    backgroundColor: "#ededed"
  }
})

export default CoursesScreen;