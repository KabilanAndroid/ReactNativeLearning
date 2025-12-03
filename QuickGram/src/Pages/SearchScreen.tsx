/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatSearch from '../atoms/ChatSearch';
import { Colors } from '../utils/Colors';
import AppText from '../atoms/AppText';
import firestore from '@react-native-firebase/firestore';
import { notificationType} from '../utils/Types';
import { useAppSelector } from '../redux/ReduxHook';
import { RequestStatusType } from '../utils/Enum';
import SearchView from '../atoms/SearchView';

/*-------------------------------------search screen------------------------------------------ */

const SearchScreen = () => {
  const [searchitem, setSearchitem] = useState('');
  const [chatuser, setchatuser] = useState<notificationType[]>([]);
  const user = useAppSelector(state => state.auth);
  console.log('chatuser:', chatuser);

  const filteredData = chatuser.filter(item => {
    return item.username.toLowerCase().includes(searchitem.toLowerCase());
  });

  /*-------------------------------Getting and displaying global data ---------------------------------- */
  /*-------------------------------Getting pending data for current user ---------------------------------------- */
  
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

        /*------------------------------- merging and getting as object for current user ---------------------------------- */

        const mergedDetails = reqdetails.map(item => {
          console.log('item now -->', item);

          return {
            ...item.receiver,
            status: item.senderstatus,
            reciverid: item.recieverid,
          };
        });
        console.log('merge ->', mergedDetails);
        const outputObject = mergedDetails.reduce((acc, cur) => {
          acc[cur.reciverid] = cur.status;
          return acc;
        }, {});
        console.log('merging object1:', outputObject);

        /*-------------------------------Getting pending data for another user ---------------------------------------- */

        firestore()
          .collection('FriendRequest')
          .where('recieverid', '==', user.userid)
          .onSnapshot(onSnapshot => {
            const reqdetails2 = onSnapshot.docs.map(
              doc =>
                ({
                  id: doc.id,
                  ...doc.data(),
                } as notificationType),
            );
            console.log('req id2 :', reqdetails2);
            /*------------------------------- merging and getting as object for another user ---------------------------------- */
            const mergedDetails2 = reqdetails2.map(item => {
              return {
                ...item.receiver,
                status: item.receiverstatus,
                senderid: item.senderid,
              };
            });
            console.log('merge2 ->', mergedDetails2);
            const outputObject2 = mergedDetails2.reduce((acc, cur) => {
              acc[cur.senderid] = cur.status;
              return acc;
            }, {});
            console.log('merging object2:', outputObject2);
            /*------------------------------------ merging two object ---------------------------------- */
            const twomergedobj = { ...outputObject, ...outputObject2 };

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
                const requestUserList = globaluserlist?.map(item => {
                  console.log('my item1-->', item.id, twomergedobj, item);
                  return {
                    ...item,
                    requeststatus: twomergedobj[item.id] || 0,
                  };
                });
                // console.log('users database :', users);
                setchatuser(requestUserList);
                console.log('globallist-->', globaluserlist);
                console.log('new original:', requestUserList);
              });
          });
      });
  };

  /*------------------------------------------ useEffect --------------------------------------------- */

  
  /*-------------------------------click events in firebase ------------------------------------------ */
  const request = async (recieveid: String) => {
    console.log('item click id :', recieveid);
    try {
      await firestore().collection('FriendRequest').add({
        senderid: user.userid,
        recieverid: recieveid,
        sendername: user?.username,
        senderstatus: RequestStatusType.pending,
        receiverstatus: RequestStatusType.acceptOrreject,
        timestamp: firestore.FieldValue.serverTimestamp(),
        type: 'friendrequest',
      });
    } catch {
      console.log('unknown error:');
    }
  };

  /*-------------------------------Render item ------------------------------------------------------ */
  const renderItem = ({ item }: { item: notificationType }) => {
    console.log('itemid now is ->:', item);

    return (
      <SearchView item={item} callback={()=>{request(item.id)}}/>
    );
  };
  useEffect(() => {
    getsearchitem()
    
  }, []);
  /*-------------------------------Return------------------------------------------------------------ */
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <AppText
        text={'Search'}
        type={'heardertext'}
        style={styles.headertextstyle}
      />
      </View>
      <ChatSearch
        onChangeText={setSearchitem}
        value={searchitem}
        placeholder={'search'}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredData}
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
    // backgroundColor: Colors.white,
  },

  header:{justifyContent:'center',backgroundColor:Colors.headercolor},
  headertextstyle: {
        padding: 10,
        alignSelf:'center',
        // backgroundColor: Colors.headercolor,
        // borderBottomWidth: 2,
        // borderBottomColor: '#f0ebebff',
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
  
});
