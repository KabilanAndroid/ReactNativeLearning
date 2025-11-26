/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import { setlogout, setusernameredux } from '../redux/AuthSlice';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../redux/ReduxHook';
import { searchnewtype } from '../utils/Types';
import AppText from '../atoms/AppText';
import { Colors } from '../utils/Colors';
import Apptextbutton from '../atoms/Apptextbutton';
import { Modal, Portal,   PaperProvider } from 'react-native-paper';
import { image } from '../utils/Images';

const UserDetailsScreen = () => {
    const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
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
    <PaperProvider>
    <View style={styles.container}>
      <View style={styles.textview}>
        <AppText
          text={'Home'}
          type={'heardertext'}
          style={styles.headertextstyle}
        />
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modelview}>
          <AppText text={'want to modify?'} style={{alignSelf:'center'}} type={'edittext'} />
          <View style={{flexDirection:'row',backgroundColor:'#ced3d0ff',gap:10,justifyContent:'center',paddingVertical:10,marginHorizontal:30}}>
          <Image source={image.edit} style={{height:26,width:26,alignSelf:'center'}}/>
          <Apptextbutton text={'edit'} textType='chatpeople' Style={{ alignItems: 'center' }} Onpress={function (): void {
                throw new Error('Function not implemented.');
              } } />
            </View>
          <View style={{flexDirection:'row',backgroundColor:'#ced3d0ff',gap:10,justifyContent:'center',paddingVertical:10,marginHorizontal:30}}>
          <Image source={image.delete} style={{height:28,width:28,alignSelf:'center'}}/>
          <Apptextbutton text={'delete'} textType='chatpeople' Style={{alignItems:'center'}} Onpress={function (): void {
              throw new Error('Function not implemented.');
            } }/>
          </View>
          <View style={{flexDirection:'row',backgroundColor:'#ced3d0ff',gap:10,justifyContent:'center',paddingVertical:10,marginHorizontal:30}}>
          <Apptextbutton text={'cancel'} textType='chatpeople' Style={{alignItems:'center'}} Onpress= {() => hideModal()}/>
            </View>
        </Modal>
      </Portal>
      <TouchableOpacity onLongPress={showModal}>
        <AppText text={'show'}  type={'edittext'} style={{marginVertical:10,backgroundColor:'red',alignSelf:'center'}}/>
      </TouchableOpacity >
      <AppText text={user.username} type={'logoutbtn'} style={{backgroundColor:"red"}}/>
      <View style={styles.logoutbtnview}>
        <Apptextbutton
          text={'logout'}
          textType="logoutbtn"
          Style={styles.logoutbtn}
          Onpress={() => handleLogout()}
        />
      </View>
    </View>
    </PaperProvider>
  );
};

export default UserDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modelview:{
    padding:20,
    backgroundColor:Colors.white,
    paddingVertical:60,
    marginHorizontal:60,
    gap:10
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
