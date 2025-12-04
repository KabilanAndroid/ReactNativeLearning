import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppText from '../atoms/AppText';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Rendercomment, ScreenType } from '../utils/Types';
import { useAppRoute } from '../navigation/NavigationHook';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../redux/ReduxHook';
import moment from 'moment';
import CommentHeader from '../atoms/CommentHeader';
import CommentInput from '../atoms/CommentInput';

const CommentScreen = () => {
  // const height = useHeaderHeight()
  const route = useAppRoute<'commentscreen'>();
  const routeData = route.params;
  const user = useAppSelector(state => state.auth);
  console.log('routeparam:', routeData.docid);
  const [comments, setcomments] = useState<Rendercomment[]>();
  const navigation = useNavigation<NavigationProp<ScreenType>>();
  const [keybrd, setKeyboardVisible] = useState(Boolean);
  const [sendcommentstate, setsendcommentstate] = useState('');

  let show = false;
  if (sendcommentstate.trim().length > 1) {
    show = true;
  } else {
    show = false;
  }
  console.log('get->>', comments);

  const renderitem = ({
    item,
    index,
  }: {
    item: Rendercomment;
    index: number;
  }) => {
   
    const dateInMilliseconds = item?.commenttime?.seconds * 1000;
    const timeAgo = moment(dateInMilliseconds).fromNow();
    
    return (
      <KeyboardAvoidingView>
        <View style={styles.renderitemmain}>
          <View style={styles.renderiteminsideview}>
            <View style={styles.renderinsideview1}>
              <AppText
                text={item?.commentname}
                type={'lastmessage'}
                style={{ textDecorationLine: 'underline' }}
              />
              <AppText text={timeAgo} type={'lastmessage'} />
            </View>
            <AppText text={item?.text} type={'lastmessage'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  const sendcomments = () => {
    firestore()
      .collection('Post')
      .doc(routeData?.docid?.toString())
      .collection('comments')
      .add({
        commentbyid: user?.userid,
        commentname: user?.username,
        commenttime: new Date(),
        text: sendcommentstate,
      });
    setsendcommentstate('');
  };

  const increasecount = async () => {
    await firestore()
      .collection('Post')
      .doc(routeData?.docid?.toString())
      .update({
        count: firestore.FieldValue.increment(1),
        commentby: firestore.FieldValue.arrayUnion(user.userid),
      });
  };

  const sendcomment = () => {
    sendcomments();
    increasecount();
  };
  useEffect(() => {
    const subscriber = firestore()
      .collection('Post')
      .doc(routeData?.docid?.toString())
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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const keyboardOffset = keybrd ? 24 : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'position'}
      style={styles.centeredView}
      keyboardVerticalOffset={keyboardOffset}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flex: 1 }}
        ></TouchableOpacity>
      </View>
      <View style={styles.modalView}>
        <CommentHeader callback={() => navigation.goBack()} />

        <FlatList
          data={comments}
          renderItem={renderitem}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyExtractor={item => item.id}
        />

        <CommentInput
          setsendcommentstate={setsendcommentstate}
          sendcommentstate={sendcommentstate}
          sendcoment={sendcomment}
          show={show}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000040',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    maxHeight: '60%',
    // minHeight: '10%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },

  button: {
    borderRadius: 20,
    marginHorizontal: 100,
    paddingVertical: 20,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  icon: { height: 30, width: 30 },

  renderitemmain: { paddingVertical: 5, marginHorizontal: 20 },
  renderiteminsideview: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#dcd9d9ff',
  },
  renderinsideview1: { flexDirection: 'row', columnGap: 10 },
});
