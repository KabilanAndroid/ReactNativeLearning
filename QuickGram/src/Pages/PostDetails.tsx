/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppRoute } from '../navigation/NavigationHook';
import AppText from '../atoms/AppText';
import AppTextInput from '../atoms/AppTextInput';
import AppImage from '../atoms/AppImage';
import { image } from '../utils/Images';
import firestore from '@react-native-firebase/firestore';
import { Rendercomment } from '../utils/Types';
import { useAppSelector } from '../redux/ReduxHook';

const PostDetails = () => {
  const route = useAppRoute<'postdetails'>();
  const routeData = route.params;
  const { width, height } = useWindowDimensions();
  const [comment, setcomment] = useState('');
  const [comments, setcomments] = useState<Rendercomment[]>();
  const user = useAppSelector(state => state.auth);

  const rendercomment = ({
    item,
    index,
  }: {
    item: Rendercomment;
    index: number;
  }) => {
    console.log('commmmment->', item.text);

    return <AppText text={item.text} type={'lastmessage'} />;
  };

  const sendcomment = () => {
    sendcomments();
    increasecount();
  };
  const increasecount = async () => {
    await firestore()
      .collection('Post')
      .doc(routeData?.commentid?.toString())
      .update({
        count: firestore.FieldValue.increment(1),
        commentby: firestore.FieldValue.arrayUnion(user.userid),
      });
  };
  const sendcomments = () => {
    firestore()
      .collection('Post')
      .doc(routeData?.commentid?.toString())
      .collection('comments')
      .add({
        commentbyid: user?.userid,
        commentname: user?.username,
        commenttime: new Date(),
        text: comment,
      });
    setcomment('');
  };
  useEffect(() => {
    const subscriber = firestore()
      .collection('Post')
      .doc(routeData?.commentid?.toString())
      .collection('comments')
      .orderBy('commenttime', 'asc')
      .onSnapshot(querySnapshot => {
        const getcomment = querySnapshot.docs.map(
          doc =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Rendercomment),
        );
        setcomments(getcomment);
        console.log('getcomment:->', getcomment);
      });
    return () => subscriber();
  }, [routeData]);
  return (
    <View style={styles.container}>
      <View
        style={{
          maxHeight: height,
          width: width - 20,
          backgroundColor: '#84b5a3ff',
          minHeight: 100,
          margin: 10,
          borderRadius: 15,
          flex: 1,
        }}
      >
        <View style={{ padding: 10 }}>
          <AppText
            text={routeData?.text}
            type={'lastmessage'}
            rest={{ numberOfLines: 0 }}
          />
        </View>
      </View>
      <View style={{ flex: 1, borderTopWidth: 2, borderTopColor: '#eff6ff' }}>
        <View style={{ alignItems: 'center' }}>
          <AppText text={'Comments'} type={'chatpeople'} />
        </View>
        <View>
          <FlatList
            data={comments}
            renderItem={rendercomment}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </View>
      <View style={styles.textinputmain}>
        <View style={styles.textinputmaininsideview}>
          <AppTextInput
            onChangeText={setcomment}
            value={comment}
            placeholder={'comments...'}
            style={styles.textinputinside}
            props={{
              multiline: true,
            }}
          />
          <TouchableOpacity onPress={sendcomment}>
            <AppImage source={image.sendicon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  textinputmain: { height: 100 },
  textinputmaininsideview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 20,
  },

  textinputinside: { borderWidth: 1, borderRadius: 20, width: 300 },
  icon: { height: 30, width: 30 },
});
