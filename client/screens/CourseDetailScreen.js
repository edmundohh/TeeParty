import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ListItem from '../components/ListItem';
import playersAPI from "../api/players";
import AuthContext from '../auth/context';

function CourseDetailScreen({ route }) {
  const course = route.params;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [followingScoreLogs, setFollowingScoreLogs] = useState([]);

  useEffect(() => {
    loadFollowingScoreLogs();
  })

  const loadFollowingScoreLogs = async () => {
    const response = await playersAPI.getFollowingScoreLogs(currentUser.username, course.cid);
    setFollowingScoreLogs(response.data.content);
  }

  return (
    <View>
      <Image style={styles.image} source={{uri: course.imageURL}} />
      <View style={styles.details}>
        <Text style={styles.courseName}>{course.cname}</Text>
        <Text style={styles.courseId}>{"Course ID: " + course.cid.toString()}</Text>
        <Text style={styles.par}>{"Par " + course.par.toString()}</Text>
      </View>
      <View style={styles.playerList}>
      <Text style={styles.coursePlayCount}>{course.playCount} Players logged their scores on this course!</Text>
        <Text style={styles.playerTitle}>Players you follow that played here:</Text>
        <FlatList
          data={followingScoreLogs}
          keyExtractor={followingScoreLog => followingScoreLog._id}
          renderItem={({ item }) => (
          <ListItem
            title={"Score: " + item.score.toString()}
            subtitle={item.username}
            onPress={() => console.log("player clicked", item)}
          />
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    padding: 15,
  },
  image: {
    width: "100%",
    height: 300
  },
  courseId: {
    color: "grey",
    fontSize: 15,
    marginVertical: 10
  },
  courseName: {
    fontSize: 27,
    fontWeight: "500"
  },
  coursePlayCount: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    color: "grey"
  },
  par: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10
  },
  playerList: {
    padding: 15,
    paddingTop: 45
  },
  playerTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20
  }
})

export default CourseDetailScreen;