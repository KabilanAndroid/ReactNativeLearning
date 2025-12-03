import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import AppText from './AppText';
import { useAppSelector } from '../redux/ReduxHook';
import { RenderPost } from '../utils/Types';
import moment from 'moment';

type HomeFlatListType ={
    item:RenderPost;
}

const HomeFlatList:FC<HomeFlatListType> = ({item}) => {

    const dateInMilliseconds = item?.PostTime?.seconds * 1000;
    const user = useAppSelector(state => state.auth);
    const timeAgo = moment(dateInMilliseconds).fromNow();
  return (
    <View style={styles.renderview1}>
      {item.SenderId === user.userid ? (
        <AppText
          text={'You'}
          type={'lastmessage'}
          style={styles.renderusername}
        />
      ) : (
        <AppText
          text={item.SenderName}
          type={'lastmessage'}
          style={styles.renderusername}
        />
      )}
      <AppText text={timeAgo} type={'lastmessage'} />
    </View>
  );
};

export default HomeFlatList;

const styles = StyleSheet.create({
    renderview1:{ flexDirection: 'row', alignItems: 'center', columnGap: 10 },
      renderusername:{
                fontSize: 18,
                textDecorationLine: 'underline',
                fontWeight: '700',
              },
});
