import { Image, StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import AppText from './AppText';
import { image } from '../utils/Images';
import { Colors } from '../utils/Colors';

const HomeChatView = () => {
  return (
    <View style={styles.first}>
      <View style={styles.textview1}>
        <AppText
          text={'Chats'}
          type={'heardertext'}
          style={styles.headertextstyle}
        />
      </View>
      <View style={styles.imageicon}>
        <Image source={image.message2} style={styles.message2} />
        <Image source={image.bell2} style={styles.message2} />
      </View>
    </View>
  );
};

export default memo(HomeChatView);

const styles = StyleSheet.create({
  first: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#f0ebebff',
    backgroundColor: Colors.headercolor,
  },
  textview1: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  headertextstyle: {
    padding: 10,
    // backgroundColor: Colors.introbg,
  },
  imageicon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 20,
    alignItems: 'center',
    marginEnd: 15,
  },
  message2: {
    height: 28,
    width: 28,
  },
});
