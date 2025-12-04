import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import PostHeader from '../atoms/PostHeader';
import Postusername from '../atoms/Postusername';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../redux/ReduxHook';
import PostTexttInput from '../atoms/PostTexttInput';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScreenType } from '../utils/Types';



const PostScreen = () => {
  const [tweet, settweet] = useState('');
  const user = useAppSelector(state => state.auth);
    const navigation = useNavigation<NavigationProp<ScreenType>>();
     const red = [ 'black', 'red', 'blue', 'brown', 'green', 'violet', 'yellow', 'orange', 'aqua', 'indigo', 'maroon', 'teal', 'turquoise', 'burgundy', 'skyblue' , 'beige']
        const number = Math.random()*10;
        const arrange = Math.ceil(number)
  let show = false
  if (tweet.trim().length > 1){
    show = true
  }
  else{
    show = false
  }
  const NewPost = async () => {
    await firestore().collection('Post').add({
      Text: tweet,
      SenderId: user.userid,
      SenderName: user.username,
      PostTime: new Date(),
      color:red[arrange]
    });

    await firestore()
      .collection('UserDetails')
      .doc(user.userid)
      .collection('Post')
      .add({
        Text: tweet,
        SenderId: user.userid,
        SenderName: user.username,
        PostTime: new Date(),
        color:red[arrange]
      });
      settweet('')
      navigation.goBack()
    
  };

  return (
    <View style={styles.mainstyle}>
      <View style={styles.header}>
        <PostHeader NewPost={NewPost} show={show}  />
        <Postusername />
        {/* <PostTextInput settweet={settweet} tweet={tweet} />
         */}
         <PostTexttInput settweet={settweet} tweet={tweet}/>
      </View>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  headertextstyle: {
    padding: 10,
  },
  mainstyle: { flex: 1 },

  header: { paddingVertical: 10, paddingHorizontal: 10 },
  headerinsideview: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
