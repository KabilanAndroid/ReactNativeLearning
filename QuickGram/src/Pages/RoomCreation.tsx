/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import AppButton from '../atoms/AppButton';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  const handleCreateRoom = async () => {
    navigation.navigate('chatDiscuss' as never);
  };

  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
      <AppButton
        text={'Go to Chat'}
        Onpress={handleCreateRoom}
        Style={{ backgroundColor: 'black', width: 200, marginStart: 100 }}
      />
    </View>
  );
}

export default HomeScreen;
