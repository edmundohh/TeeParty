import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

function ListItem({ title, subtitle, description, onPress }) {
  return (
    <TouchableHighlight 
      underlayColor={"#ededed"}
      onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.details}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column"
  },
  description: {
    fontSize: 15,
    color: "green"
  },
  details: {
    flexDirection: "row"
  },
  subtitle: {
    fontSize: 12,
    color: "grey",
    fontWeight: "500"
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
  }
})

export default ListItem;