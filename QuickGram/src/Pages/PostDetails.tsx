/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppRoute } from '../navigation/NavigationHook';
import AppText from '../atoms/AppText';
import AppTextInput from '../atoms/AppTextInput';
import firestore from '@react-native-firebase/firestore';
import { Rendercomment } from '../utils/Types';
import { useAppSelector } from '../redux/ReduxHook';
import { Colors } from '../utils/Colors';
import AppButton from '../atoms/AppButton';
import moment from 'moment';

const PostDetails = () => {
  const route = useAppRoute<'postdetails'>();
  const routeData = route.params;
  const { width } = useWindowDimensions();
  const [comment, setcomment] = useState('');
  const [comments, setcomments] = useState<Rendercomment[]>();
  const user = useAppSelector(state => state.auth);
  console.log('comments:', comments);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  console.log('dimensions:', dimensions);

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };
  const rendercomment = ({
    item,
  }: {
    item: Rendercomment;
    index: number;
  }) => {
    const dateInMilliseconds = item?.commenttime?.seconds * 1000;
    const timeAgo = moment(dateInMilliseconds).fromNow();
    return (
      <View style={{ borderBottomWidth: 1 ,borderBottomColor:'#efe3e3ff'}}>
        <View
          style={{
            minHeight: 50,
            maxHeight: 100,
            backgroundColor: 'white',
            width: width - 20,
            margin: 10,

            // elevation: 10,
            borderRadius: 15,
            padding: 10,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              columnGap: 10,
              alignItems: 'center',
            }}
          >
            <AppText
              text={item.commentname}
              type={'lastmessage'}
              style={{ fontSize: 18 }}
            />
            <AppText text={timeAgo} type={'lastmessage'} />
          </View>
          <AppText text={item.text} type={'lastmessage'} />
        </View>
      </View>
    );
  };
  const dateInMilliseconds = routeData?.posttime.seconds * 1000;
  const timeAgo = moment(dateInMilliseconds).fromNow();
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
          width: width - 20,
          backgroundColor: '#fff',
          minHeight: 100,
          margin: 10,
          borderRadius: 15,
          elevation: 10,
        }}
      >
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 10,
              alignItems: 'center',
            }}
          >
            <View
              style={{ backgroundColor: 'red', width: 5, height: 30 }}
            ></View>
            <AppText
              text={routeData?.postusername}
              type={'lastmessage'}
              style={{ fontSize: 24, fontWeight: 700 }}
            />
            <AppText text={timeAgo} type={'lastmessage'} />
          </View>
          <AppText
            text={`@${routeData?.postusername}`}
            type={'lastmessage'}
            style={{ color: '#959fb5ff' }}
          />
          <AppText
            text={routeData?.text}
            type={'lastmessage'}
            rest={{ numberOfLines: 0 }}
            style={{ fontSize: 24 }}
          />
          {/* <View style={{ flexDirection: 'row', columnGap: 20, marginTop: 10 }}>
            <AppImage
              source={image.dislike}
              style={{ height: 28, width: 28 }}
            />
            <AppImage source={image.share} style={{ height: 30, width: 28 }} />
          </View> */}
        </View>
      </View>
      <View
        onLayout={onLayout}
        style={{
          marginBottom: 10,
          backgroundColor: 'white',
          paddingVertical: 20,
          marginHorizontal: 10,
          width: width - 20,
          borderRadius: 15,
          elevation: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            columnGap: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: '#FC4D76',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AppText
              text={user.username[0]}
              type={'lastmessage'}
              style={{ fontSize: 32, fontWeight: 700, color: 'white' }}
            />
          </View>
          <View style={styles.textinputmaininsideview}>
            <AppTextInput
              onChangeText={setcomment}
              value={comment}
              placeholder={'share your thoughts...'}
              style={{
                borderColor: '#c6c3c3ff',
                borderWidth: 1,
                width: dimensions.width - 100,
                // width:400,
                borderRadius: 10,
                backgroundColor: '#f6f7f9ff',
                height: 90,
              }}
              props={{
                multiline: true,
                editable: true,
                numberOfLines: 4,
                maxLength: 40,
              }}
            />
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', marginEnd: 15, marginTop: 5 }}>
          <AppButton
            text={'send'}
            TextStyles={{ color: 'white' }}
            Onpress={sendcomment}
            Style={{
              backgroundColor: Colors.maingreen,
              height: 40,
              width: 100,
              borderRadius: 25,
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1, borderTopWidth: 2, borderTopColor: '#eff6ff' }}>
        <View
          style={{
            alignItems: 'center',
            // backgroundColor: Colors.white,
            // elevation: 10,
            height: 40,
          }}
        >
          <AppText text={`Comments`} type={'chatpeople'} />
        </View>
        <FlatList
          data={comments}
          renderItem={rendercomment}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
      {/* <View style={styles.textinputmain}> */}
    </View>
    // </View>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  textinputmaininsideview: {
    flexShrink: 1,
    height: 100,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    columnGap: 20,
  },

  icon: { height: 30, width: 30 },
});
