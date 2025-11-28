/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setlogout, setusernameredux } from '../redux/AuthSlice';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../redux/ReduxHook';
import { searchnewtype } from '../utils/Types';
import AppText from '../atoms/AppText';
import { Colors } from '../utils/Colors';
import Apptextbutton from '../atoms/Apptextbutton';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import { image } from '../utils/Images';
import AppImage from '../atoms/AppImage';
const UserDetailsScreen = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.auth);
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
  return (
    <View style={styles.container}>
      <View style={styles.textview}>
        <AppText
          text={'Home'}
          type={'heardertext'}
          style={styles.headertextstyle}
        />
      </View>
      <AppText
        text={user.username}
        type={'logoutbtn'}
        style={styles.usernameview}
      />
      <View style={styles.logoutbtnview}>
        <Apptextbutton
          text={'logout'}
          textType="logoutbtn"
          Style={styles.logoutbtn}
          Onpress={() => handleLogout()}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            height: 100,
            width: 200,
            backgroundColor: Colors.maingreen,
            position:"relative",
            borderTopLeftRadius:5,
            borderBottomStartRadius:5,
            borderBottomEndRadius:5
          }}
        >
          <Image
            source={image.chatetriangle}
            resizeMode="cover"
            style={{
              height: 25,
              width: 25,
              tintColor: Colors.maingreen,
              position: 'absolute',
              end:-23
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default UserDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white,
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
  textview: {
    borderBottomWidth: 2,
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
