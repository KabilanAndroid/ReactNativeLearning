import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScreenType } from '../utils/Types';
import AppImage from './AppImage';
import AppText from './AppText';
import { image } from '../utils/Images';
import { Colors } from '../utils/Colors';
type PostHeaderType = {
  NewPost: () => void;
  show: boolean;
};

const PostHeader: FC<PostHeaderType> = ({ NewPost, show }) => {
  const navigation = useNavigation<NavigationProp<ScreenType>>();
  return (
    <View style={styles.headerinsideview}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AppImage source={image.cancel} style={styles.cancelimg} />
      </TouchableOpacity>
      <AppText
        text={'Create Post'}
        type={'logoutbtn'}
        style={styles.createpost}
      />
      {show ? (
        <TouchableOpacity style={styles.postbuttonstyle} onPress={NewPost}>
          <AppText text={'Post'} style={styles.posttext} type={'logoutbtn'} />
        </TouchableOpacity>
      ) : (
        <AppText text={'Post'} style={styles.noshowpost} type={'logoutbtn'} />
      )}
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  headerinsideview: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noshowpost: {
    fontSize: 20,
    color: Colors.black,
    backgroundColor: '#dfdfe5ff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  createpost: { color: 'black', fontSize: 20 },
  cancelimg: { height: 30, width: 30 },
  postbuttonstyle: {
    backgroundColor: Colors.maingreen,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  posttext: { color: Colors.white, fontSize: 20 },
});
