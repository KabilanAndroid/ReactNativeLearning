import { FlatList, Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatSearch from '../atoms/ChatSearch';
import { Colors } from '../utils/Colors';
import AppText from '../atoms/AppText';
import { image } from '../utils/Images';
import Appbackbtn from '../atoms/Appbackbtn';
import firestore from '@react-native-firebase/firestore';
import { notificationType } from '../utils/Types';
import { useAppSelector } from '../redux/ReduxHook';
import { RequestStatusType } from '../utils/Enum';
const SearchScreen = () => {
  const [searchitem, setSearchitem] = useState('');
  const [chatuser, setchatuser] = useState<notificationType[]>([]);
  const user = useAppSelector(state => state.auth);
  /*-------------------------------Getting and displaying global data ---------------------------------- */

  /*-------------------------------Getting pending data ---------------------------------------- */
  const getsearchitem = async () => {
    firestore()
      .collection('FriendRequest')
      .where('senderid', '==', user.userid)
      .onSnapshot(onSnapshot => {
        const reqdetails = onSnapshot.docs.map(
          doc =>
            ({
              id: doc.id,
              ...doc.data(),
            } as notificationType),
        );
        console.log('req id :', reqdetails);
   /*------------------------------- merging and getting as object ---------------------------------- */
        const mergedDetails = reqdetails.map(item => {
          console.log("item now -->",item);
          
          return {
            ...item.receiver,
            status: item.status,
            reciverid: item.recieverid,
          };
        });
        console.log("merge ->",mergedDetails)
        const outputObject = mergedDetails.reduce((acc, cur) => {
          acc[cur.reciverid] = cur.status;
          return acc;
        }, {});
        console.log(outputObject);

        /*------------------------------------ Getting global data ---------------------------------- */

        firestore()
          .collection('UserDetails')
          .where('userid', '!=', user?.userid)
          .onSnapshot(onSnapshot => {
            const globaluserlist = onSnapshot.docs.map(
              doc =>
                ({
                  id: doc.id,
                  ...doc.data(),
                } as notificationType),
            );
            const requestUserList = globaluserlist?.map((item, index) => {
              console.log('my item-->', item.id, outputObject,item);
              return {
                ...item,
                requeststatus: outputObject[item.id] || 0,
              };
            });
            // console.log('users database :', users);
            setchatuser(requestUserList);
            console.log('globallist-->', globaluserlist);
            console.log('new original:', requestUserList);
          });
      });
  };

  /*------------------------------------------ useEffect --------------------------------------------- */

  useEffect(() => {
    getsearchitem();
  }, []);

  /*-------------------------------click events in firebase ------------------------------------------ */
  const request = async (recieveid: String) => {
    console.log('item click id :', recieveid);
    try {
      await firestore().collection('FriendRequest').add({
        senderid: user.userid,
        recieverid: recieveid,
        sendername: user?.username,
        status: 1,
        timestamp: firestore.FieldValue.serverTimestamp(),
        type: 'friendrequest',
      });
    } catch {
      console.log('unknown error:');
    }
  };
  /*-------------------------------Render item ------------------------------------------------------ */
  const renderItem = ({ item }: { item: notificationType }) => {
    return (
      <View style={styles.listItem}>
        <Image source={image.profilelogo} style={styles.avatar} />
        <View style={styles.textview}>
          <AppText text={item.username} type={'chatpeople'} />
        </View>
        <View style={styles.addfriendview}>
          {item.requeststatus === RequestStatusType.pending ? (
            <AppText text={'pending'} type={'chatpeople'} />
            
          
          ) : item.requeststatus === RequestStatusType.accept ? (
            <AppText text={'accept'} type={'chatpeople'} />
          ) : <Appbackbtn
              source={image.addedfrnicn}
              style={styles.iconstyle}
              Onpress={() => request(item.id)}
            />}
        </View>
      </View>
    );
  };
  /*-------------------------------Return------------------------------------------------------------ */
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
