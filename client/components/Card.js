import React from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';

function Card({ title, description, username, score, imageURL, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: imageURL }} />
        <View style={styles.detail}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.score}>{score}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "white",
    marginBottom: 20,
    overflow: "hidden"
  },
  description: {
    color: "green",
    fontWeight: "bold"
  },
  detail: {
    padding: 15,
  },
  image: {
    width: "100%",
    height: 200,
  },
  score: {
    color: "blue",
    fontWeight: "bold"
  },
  title: {
    marginBottom: 7,
  },
  username: {
    fontWeight: "bold"
  },
})

export default Card;