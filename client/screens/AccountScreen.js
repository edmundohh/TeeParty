import { useCardAnimation } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AuthContext from '../auth/context';

import AppScreen from '../components/AppScreen'
import ListItem from '../components/ListItem';

const menuItems = [
  {
    title: "My Scores"
  },
  {
    title: "My Account"
  }
]

function AccountScreen({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  return (
    <AppScreen>
      <View style={styles.container}>
        <ListItem
          title={currentUser.username}
          subtitle={currentUser.name}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={item => item.title}
          renderItem={({ item }) => 
            <ListItem
              title={item.title}
            />
          }
        />
        <ListItem
        title="Log Out"
        onPress={() => setCurrentUser(null)}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    margin: 20
  }
})

export default AccountScreen;