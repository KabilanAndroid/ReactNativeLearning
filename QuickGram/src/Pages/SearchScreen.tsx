/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import { FlatList, Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatSearch from '../atoms/ChatSearch';
import { Colors } from '../utils/Colors';
import AppText from '../atoms/AppText';
import { image } from '../utils/Images';
import Appbackbtn from '../atoms/Appbackbtn';
import firestore from '@react-native-firebase/firestore';
import { searchnewtype } from '../utils/Types';
import { useAppSelector } from '../redux/ReduxHook';
import auth from '@react-native-firebase/auth';
const usermain = auth().currentUser;
const SearchScreen = () => {
  const [searchitem, setSearchitem] = useState('');
  const [chatuser, setchatuser] = useState<searchnewtype[]>([]);
  const user = useAppSelector(state => state.auth);



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
    const originalmessage = newMessages?.filter(a => a.id !== user.userid)
    setchatuser(originalmessage);

    console.log('new original:', originalmessage);
  };

  useEffect(()=>{
    getsearchitem()
  },[])
console.log("i am rendering");

 

  const request = async (recieveid: String) => {
    console.log('item click id :', recieveid);

    try {
      await firestore()
        .collection('FriendRequest')
        .doc('request')
        .collection('allrequest')
        .add({
          senderid: user.userid,
          recieverid: recieveid,
          sendername:usermain?.displayName,
          status: 'pending',
          timestamp: firestore.FieldValue.serverTimestamp(),
          type: 'friendrequest',
        });
    } catch {
      console.log('unknown error:');
    }
  };

  const renderItem = ({ item }: { item: searchnewtype }) => {
    return (
      <View style={styles.listItem}>
        <Image source={image.profilelogo} style={styles.avatar} />
        <View style={styles.textview}>
          <AppText text={item.username} type={'chatpeople'} />
        </View>
        <View style={styles.addfriendview}>
          <Appbackbtn
            source={image.addedfrnicn}
            style={styles.iconstyle}
            Onpress={() => request(item.id)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppText
        text={'Search'}
        type={'LoginText'}
        style={styles.headertextstyle}
      />
      <ChatSearch
        onChangeText={setSearchitem}
        value={searchitem}
        placeholder={'search'}
        style={styles.searchbar}
      />
      <FlatList
        data={chatuser}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconstyle: {
    height: 28,
    width: 28,
  },
  textview: {
    flex: 1,
    flexDirection: 'row',
  },
  addfriendview: {
    alignItems: 'flex-end',
  },
  headertextstyle: {
    padding: 10,
    backgroundColor: Colors.introbg,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },

  searchbar: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 45,
    borderColor: Colors.black,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.introbg,
  },
});
