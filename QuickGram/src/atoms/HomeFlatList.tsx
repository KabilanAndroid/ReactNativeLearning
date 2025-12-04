import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import AppText from './AppText';
import { useAppSelector } from '../redux/ReduxHook';
import { RenderPost } from '../utils/Types';
import moment from 'moment';

type HomeFlatListType = {
  item: RenderPost;
};

const HomeFlatList: FC<HomeFlatListType> = ({ item }) => {
  const dateInMilliseconds = item?.PostTime?.seconds * 1000;
  const user = useAppSelector(state => state.auth);
  const timeAgo = moment(dateInMilliseconds).fromNow();

  return (
    <View style={styles.renderview1}>
      <View style={{ width: 3, height: 30, backgroundColor: item?.color }}>
        <AppText text={''} type={'lastmessage'} />
      </View>
      {item.SenderId === user.userid ? (
        <AppText
          text={'You'}
          type={'lastmessage'}
          style={[styles.renderusername, { color: '#262c3c' }]}
        />
      ) : (
        <AppText
          text={item.SenderName}
          type={'lastmessage'}
          style={styles.renderusername}
        />
      )}
      <AppText
        text={`@${item.SenderName}`}
        type={'lastmessage'}
        style={{ color: '#a2a8b5' }}
      />
      <AppText
        text={timeAgo}
        type={'lastmessage'}
        style={{ color: '#a2a8b5' }}
      />
    </View>
  );
};

export default HomeFlatList;

const styles = StyleSheet.create({
  renderview1: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  renderusername: {
    fontSize: 18,
    fontWeight: '700',
  },
});
