import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AppButton from '../components/AppButton';
import ListItem from '../components/ListItem';
import playersAPI from "../api/players";
import scoreLogAPI from "../api/scoreLog";
import AuthContext from '../auth/context';

function PlayerScreen({ route }) {
  const player = route.params;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [scoreLogs, setScoreLogs] = useState([]);

  useEffect(() => {
    loadScoreLogs();
    checkFollowing();
  })

  const loadScoreLogs = async () => {
    const response = await playersAPI.getScoreLogsByUsername(player.username);
    setScoreLogs(response.data.content);
  }

  const checkFollowing = async () => {
    const response = await playersAPI.checkFollowing(currentUser.username, player.username);
    setIsFollowing(response.data.isFollowing);
  }

  const handleSubmit = async () => {
    const result = await playersAPI.followPlayer(currentUser.username, player.username);
    console.log(result.data);
    setIsFollowing(true);
  };

  return (
    <View style={styles.playerProfile}>
      <Text style={styles.playerName}>{player.name}</Text>
      <View style={styles.follow}>
        <AppButton 
                  title="FOLLOW"
                  color="green"
                  textColor="white"
                  onPress={handleSubmit}
                  disabled={isFollowing}
        />
      </View>
      <Text style={styles.playerRecord}>Playing Record:</Text>
        <FlatList
          data={scoreLogs}
          keyExtractor={scoreLog => scoreLog._id}
          renderItem={({ item }) => (
            <ListItem
            title={"Score: " + item.score.toString()}
            subtitle={item.username}
            description={item.cname}
            />
          )}
        />
      <View style={styles.playerList}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  follow: {
    paddingLeft: 90,
    paddingRight: 90,
    marginBottom: 40
  },
  playerProfile: {
    padding: 15,
    paddingTop: 60
  },
  playerName: {
    alignSelf: "center",
    fontSize: 35,
    fontWeight: "500",
    color: "green",
    marginBottom: 20
  },
  playerRecord: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20
  }
})

export default PlayerScreen;