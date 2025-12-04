import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import moment from 'moment';
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
import Homeheader from '../atoms/Homeheader';
import HomeFlatList from '../atoms/HomeFlatList';
import Models from '../atoms/Models';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const UserDetailsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<ScreenType>>();
  const user = useAppSelector(state => state.auth);
  const [renderpost, setrenderpost] = useState<RenderPost[]>();
  const [modalVisible, setModalVisible] = useState(false);
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
    const originalmessage = newMessages?.find(
      a => a.id === user.userid,
    )?.username;
    dispatch(setusernameredux(originalmessage));
  };
  const renderflatlistpost = ({
    item,
    index,
  }: {
    item: RenderPost;
    index: number;
  }) => {
    const posttext = item.Text;

    const like = async (id: string | undefined, liked: string | string[]) => {
      if (liked?.includes(user.userid)) {
        await firestore()
          .collection('Post')
          .doc(id)
          .update({
            likedBy: firestore.FieldValue.arrayRemove(user.userid),
          });
      } else {
        await firestore()
          .collection('Post')
          .doc(id)
          .update({
            likedBy: firestore.FieldValue.arrayUnion(user.userid),
          });
      }
    };

    return (
      
      <View style={styles.top}>
        
        <View style={styles.rendermain}>
          <HomeFlatList item={item} />
          <AppText
            text={posttext}
            type={'lastmessage'}
            style={styles.renderposttext}
            rest={{
              numberOfLines: 0,
            }}
          />
          <View style={styles.renderview2}>
            <View style={styles.renderview2insideview}>
              {item?.likedBy?.includes(user?.userid) ? (
                <View
                  style={{
                    padding: 10,
                    borderRadius: 15,
                    backgroundColor: '#fdf2f8',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => like(item.id, item?.likedBy)}
                  >
                    <AppImage
                      source={image.like}
                      style={[styles.likeicon, { tintColor: '#f7329aff' }]}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    padding: 10,
                    // borderRadius: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => like(item.id, item?.likedBy)}
                  >
                    <AppImage source={image.dislike} style={styles.likeicon} />
                  </TouchableOpacity>
                </View>
              )}
              
              <TouchableOpacity onPress={()=>setModalVisible(true)} >
              {item?.likedBy?.includes(user?.userid) ? (
                
                <AppText
                  text={item?.likedBy?.length.toString()}
                  type={'lastmessage'}
                  style={{ color: '#F7329A' }}
                />
              ) : (
                <AppText
                  text={item?.likedBy?.length.toString()}
                  type={'lastmessage'}
                  style={{ color: Colors.black }}
                />
              )}
              </TouchableOpacity>
            </View>
            <View style={styles.renderview2insideview}>
              {item?.commentby?.includes(user?.userid) ? (
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#eff6ff',
                    borderRadius: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('commentscreen', {
                        docid: item?.id,
                      })
                    }
                  >
                    <AppImage
                      source={image.comment}
                      style={[styles.imagestyle, { tintColor: '#428dff' }]}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    padding: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('commentscreen', {
                        docid: item?.id,
                      })
                    }
                  >
                    <AppImage
                      source={image.comment}
                      style={styles.imagestyle}
                    />
                  </TouchableOpacity>
                </View>
              )}

              {item?.commentby?.includes(user?.userid) ? (
                <AppText
                  text={item?.count?.toString()}
                  type={'lastmessage'}
                  style={{ color: '#428dff' }}
                />
              ) : (
                <AppText text={item?.count?.toString()} type={'lastmessage'} />
              )}
            </View>
            <AppImage source={image.share} style={styles.imagestyle} />
          </View>
        </View>
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
    <SafeAreaProvider>
      <Models modalVisible={modalVisible} setModalVisible={setModalVisible} item={''} />
    <View style={styles.container}>
      <Homeheader logout={handleLogout} />
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
          <AppImage source={image.add} style={styles.imagestylepost} />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaProvider>
  );
};
export default UserDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9e8d6ff',
  },
  buttonstyle: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-end',
    right: 20,
  },
  imagestylepost: {
    height: 60,
    width: 60,
    tintColor: Colors.maingreen,
  },
  imagestyle: { height: 26, width: 26 },
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

  logoutbtnview: { flex: 1, alignItems: 'flex-end', paddingTop: 20 },

  logoutbtn: {
    borderRadius: 10,
    backgroundColor: Colors.commonbg,
    width: 100,
    alignItems: 'center',
    marginEnd: 10,
  },
  rendermain: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 10,
    opacity: 20,
  },

  renderposttext: { color: 'black', marginTop: 10, marginStart: 10 },
  renderview2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems:'center'
  },
  renderview2insideview: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  likeicon: { height: 26, width: 26 },
  top: { paddingVertical: 5, marginHorizontal: 10 },

  
});
