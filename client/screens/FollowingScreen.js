import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppScreen from '../components/AppScreen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';

import ListItem from '../components/ListItem';
import playersAPI from "../api/players";
import AuthContext from '../auth/context';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
});

function FollowingScreen({ navigation }) {
  const [searchFailed, setSearchFailed] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [following, setFollowing] = useState([]);

  const handleSubmit = async ({ username }) => {
    const result = await playersAPI.getPlayerByUsername(username);
    console.log(result)
    if (result.data.success) {
      console.log(result.data);
      setSearchFailed(false);
      navigation.navigate("Player Profile", result.data.content)
    }
  };

  useEffect(() => {
    loadFollowing();
  })

  const loadFollowing = async () => {
    const response = await playersAPI.getFollowing(currentUser.username);
    setFollowing(response.data.content);
  }

  return (
    <AppScreen>
      <Text style={styles.searchTitle}>Search for a Player:</Text>
        <View style={styles.searchContainer}>
          <Formik
            initialValues={{ username: ''}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <>
              <AppTextInput 
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("username")}
              />
              <ErrorMessage error={errors.username} visible={searchFailed}/>
              <AppButton 
                title="SEARCH"
                color="green"
                textColor="white"
                onPress={handleSubmit}/>
              </>
            )}
          </Formik>
          
        </View>
    <View style={styles.followingList}>
      <Text style={styles.followingTitle}>Players you follow:</Text>
      <FlatList
        data={following}
        keyExtractor={followingPlayer => followingPlayer.username}
        renderItem={({ item }) => (
          <ListItem
            title={item.username}
            subtitle={item.name}
            onPress={() => navigation.navigate("Player Profile", item)}
          />
        )}
      />
      <View style={styles.playerList}>
        
      </View>
    </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  searchTitle: {
    fontSize: 25,
    fontWeight: "500",
    color: "green",
    padding: 20,
  },
  searchContainer: {
    paddingLeft: 60,
    paddingRight: 60
  },
  followingList: {
    padding: 15,
    paddingTop: 30
  },
  followingTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 30
  }
})

export default FollowingScreen;