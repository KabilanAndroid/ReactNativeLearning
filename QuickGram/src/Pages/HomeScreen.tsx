/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import { useDispatch } from 'react-redux';
import { setlogout, setusernameredux } from '../redux/AuthSlice';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../redux/ReduxHook';
import { searchnewtype } from '../utils/Types';
import AppText from '../atoms/AppText';
import { Colors } from '../utils/Colors';
import Apptextbutton from '../atoms/Apptextbutton';

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
      <View style={styles.logoutbtnview}>
        <Apptextbutton
          text={'logout'}
          textType="logoutbtn"
          Style={styles.logoutbtn}
          Onpress={() => handleLogout()}
        />
      </View>
    </View>
  );
};

export default UserDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
