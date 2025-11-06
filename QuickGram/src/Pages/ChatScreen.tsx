import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import AppText from '../atoms/AppText';

import ChatSearch from '../atoms/ChatSearch';
import { image } from '../utils/Images';

const ChatScreen = () => {
  const [searchitem, setSearchitem] = useState('');
  return (
    <View style={styles.container}>
      <AppText text={'Chat'} type={'LoginText'} />
      <ChatSearch
              placeholder={'search'}
              onChangeText={setSearchitem}
              value={searchitem} icon={image.seachicon}        
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
