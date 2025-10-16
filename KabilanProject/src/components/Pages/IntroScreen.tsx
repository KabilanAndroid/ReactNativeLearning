import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const IntroScreen = ({ navigation }:any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Intro Screen!</Text>
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  text: {
    fontSize: 20, marginBottom: 20
  }
});

export default IntroScreen;
