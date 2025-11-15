/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '../utils/Colors';

import AppButton from '../atoms/AppButton';
import AppText from '../atoms/AppText';
import { image } from '../utils/Images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScreenType } from '../utils/Types';

const IntroScreen = () => {
  const navigation = useNavigation<NavigationProp<ScreenType>>();
  console.log('IntroScreen');
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image
          source={image.welcome}
          tintColor={'white'}
          style={styles.image}
        />

        <AppText
          text={`           Scroll less. Live more. Share your
                              green feed.`}
          type={'welcomeText'}
          style={styles.text}
        />
      </View>
      <AppButton
        text={`Let's Explore`}
        Style={styles.button}
        Onpress={function (): void {
          navigation.navigate('loginscreen');
        }}
      />
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.introbg,
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignContent: 'flex-end',
    width: '100%',
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  image: {
    height: 410,
    width: 410,
  },
});
