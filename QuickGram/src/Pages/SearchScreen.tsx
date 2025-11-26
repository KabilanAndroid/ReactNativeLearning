/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import { FlatList, Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatSearch from '../atoms/ChatSearch';
import { Colors } from '../utils/Colors';
import AppText from '../atoms/AppText';
import { image } from '../utils/Images';
import Appbackbtn from '../atoms/Appbackbtn';
import firestore from '@react-native-firebase/firestore';
import { notificationType, ScreenType } from '../utils/Types';
import { useAppSelector } from '../redux/ReduxHook';
import { RequestStatusType } from '../utils/Enum';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Apptextbutton from '../atoms/Apptextbutton';

/*-------------------------------------search screen------------------------------------------ */

const SearchScreen = () => {
  const [searchitem, setSearchitem] = useState('');
  const [chatuser, setchatuser] = useState<notificationType[]>([]);
  const user = useAppSelector(state => state.auth);
  const navigation = useNavigation<NavigationProp<ScreenType>>();
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
      <View style={styles.listItem}>
        <Image source={image.profilelogo} style={styles.avatar} />
        <View style={styles.textview}>
          <AppText text={item.username} type={'chatpeople'} />
        </View>
        <View style={styles.addfriendview}>
          {item.requeststatus === RequestStatusType.pending ? (
            <AppText text={'requested'} type={'chatpeople'}
            style={[styles.following,{backgroundColor:Colors.lightReq,color:Colors.white}]} 
            />
          ) : item.requeststatus === RequestStatusType.accept ? (
            <AppText text={'following'} type={'chatpeople'} style={styles.following}/>
          ) : item.requeststatus === RequestStatusType.acceptOrreject ? (
            <Appbackbtn
              source={image.goto}
              style={styles.iconstyle}
              Onpress={() => navigation.navigate('notificationscreen')}
            />
          ) : (
            <Apptextbutton                                                              
              text={'follow'}
              textType={'textbutton'}
              Onpress={() => request(item.id)}
              Style={styles.followbtn}
            />
          )}
        </View>
      </View>
    );
  };
  useEffect(() => {
    getsearchitem()
    
  }, []);
  /*-------------------------------Return------------------------------------------------------------ */
  return (
    <View style={styles.container}>
      <AppText
        text={'Search'}
        type={'heardertext'}
        style={styles.headertextstyle}
      />
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
    backgroundColor: Colors.white,
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
  following:{backgroundColor: Colors.frndchatclr,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,},
  headertextstyle: {
    padding: 10,
    backgroundColor: Colors.headercolor,
    borderBottomWidth: 2,
    borderBottomColor: '#f0ebebff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  followbtn: {
    backgroundColor: Colors.maingreen,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
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
    borderBottomWidth: 2,
    borderBottomColor: '#f0ebebff',
  },
});
