/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setlogout, setusernameredux } from '../redux/AuthSlice';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../redux/ReduxHook';
import { RenderPost, ScreenType, searchnewtype } from '../utils/Types';
import AppText from '../atoms/AppText';
import { Colors } from '../utils/Colors';
import { image } from '../utils/Images';
import AppImage from '../atoms/AppImage';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const UserDetailsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<ScreenType>>();
  const user = useAppSelector(state => state.auth);
  const [renderpost, setrenderpost] = useState<RenderPost[]>();
  const handleLogout = async () => {
    try {
      dispatch(setlogout());
      console.log('User signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  useEffect(() => {
    getsearchitem();
  }, []);
  const getsearchitem = async () => {
    const querySnapshot = await firestore().collection('UserDetails').get();
    const newMessages = querySnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as searchnewtype),
    );
    console.log('new new message:', newMessages);
    const originalmessage = newMessages?.find(
      a => a.id === user.userid,
    )?.username;
    console.log('username is:', originalmessage);
    dispatch(setusernameredux(originalmessage));
    console.log('new original:', originalmessage);
  };
  
  
  const renderflatlistpost = ({
    item,
    index,
  }: {
    item: RenderPost;
    index: number;
  }) => {
    const posttext = item.Text;
    console.log("time post->",item?.PostTime);
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 5,
          marginHorizontal: 10,
          paddingVertical: 10,
          marginVertical: 5,
          borderWidth: 1,
          borderBottomWidth: 1,
        }}
      >
        <View style={{flexDirection:'row',alignItems:'center'}}>
          {/* <AppImage source={image.profilelogo} style={{height:40,width:40,borderRadius:50}}/> */}
          <AppText text={item.SenderName} type={'lastmessage'}/>
      
          </View>
          <AppText
            text={posttext}
            type={'lastmessage'}
            style={{ color: 'black', marginTop: 10,marginStart:0}}
            rest={{
              numberOfLines:0
            }}
          />
        
      </View>
    );
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Post')
      .orderBy('PostTime', 'desc')
      .limit(10)
      .onSnapshot(querySnapshot => {
        const newpost = querySnapshot.docs.map(
          doc =>
            ({
              id: doc.id,
              ...doc.data(),
            } as RenderPost),
        );
        setrenderpost(newpost);
        console.log('post->>:', newpost);
      });
    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textview}>
        <AppText
          text={'Home'}
          type={'heardertext'}
          style={styles.headertextstyle}
        />
        <TouchableOpacity onPress={() => handleLogout()}>
          <AppImage source={image.logout} style={styles.logout} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={renderpost}
        renderItem={renderflatlistpost}
        keyExtractor={item => item.id}
      />
      <View style={styles.buttonstyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('postscreen');
          }}
        >
          <AppImage source={image.add} style={styles.imagestyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UserDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonstyle: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-end',
    right: 20,
  },
  imagestyle: {
    height: 60,
    width: 60,
    tintColor: Colors.maingreen,
  },
  modelview: {
    padding: 20,
    backgroundColor: Colors.white,
    paddingVertical: 60,
    marginHorizontal: 60,
    gap: 10,
  },
  usernameview: {
    marginTop: 20,
    backgroundColor: Colors.commonbg,
    alignSelf: 'center',
  },
  logout: { height: 40, width: 40 },
  textview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    alignItems: 'center',
    borderBottomColor: Colors.borderbottomcolor,
    backgroundColor: Colors.headercolor,
  },
  logoutbtnview: { flex: 1, alignItems: 'flex-end', paddingTop: 20 },
  headertextstyle: {
    padding: 10,
  },
  logoutbtn: {
    borderRadius: 10,
    backgroundColor: Colors.commonbg,
    width: 100,
    alignItems: 'center',
    marginEnd: 10,
  },
});
