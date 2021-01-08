import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

import AppScreen from '../components/AppScreen'
import Card from '../components/Card';
import playersAPI from "../api/players";
import AuthContext from '../auth/context';

function FeedScreen({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [feedScoreLogs, setFeedScoreLogs] = useState([]);

  useEffect(() => {
    loadFeedScoreLogs();
  })

  const loadFeedScoreLogs = async () => {
    const response = await playersAPI.getScoreLogsFeed(currentUser.username);
    setFeedScoreLogs(response.data.content);
  }

  return (
    <AppScreen>
      <View style={styles.screen}>
        <FlatList
          data={feedScoreLogs}
          keyExtractor={feedScoreLog => feedScoreLog._id}
          renderItem={({ item }) => 
            <Card
              title={item.cname}
              description={"Par " + item.par}
              username={item.username}
              imageURL={item.imageURL}
              score={"Score: " + item.score.toString()}
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

export default FeedScreen;