/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, Text, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { Colors } from '../utils/Colors';
import { useAppSelector } from '../redux/ReduxHook';
import AppText from './AppText';
import { image } from '../utils/Images';
import { MessageseenType } from '../utils/Types';
type ChatBubbleType = {
  item: MessageseenType;
  previousItem: MessageseenType;
};

const ChatBubble: FC<ChatBubbleType> = ({ item, previousItem }) => {
  const currentnow = useMemo(() => {
    item.senderId === user?.userid
  }, []);
  const user = useAppSelector(state => state.auth);
  return (
    <View
      style={[
        styles.rendermessageview,
        {
          alignSelf: item.senderId === user?.userid ? 'flex-end' : 'flex-start',

          backgroundColor:
            item.senderId === user?.userid
              ? Colors.userchatclr
              : Colors.frndchatclr,

          marginRight: item.senderId === user?.userid ? 10 : null,
          marginLeft: item.senderId === user?.userid ? null : 10,
          borderTopLeftRadius: item.senderId === user?.userid ? 10 : 0,
          borderBottomStartRadius: item.senderId === user?.userid ? 10:10,
          borderBottomEndRadius: item.senderId === user?.userid ? 10:10,
          borderTopEndRadius: item.senderId === user?.userid ? 0:10,
          // borderTopRightRadius: item.senderId === user?.userid ? 0:10,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        {item.deleted ? (
          <Text
            style={{
              padding: 5,
              fontSize: 14,
              color: '#000000ff',
            }}
          >
            🚫This message was deleted
          </Text>
        ) : (
          <Text
            style={{
              padding: 5,
              fontSize: 14,
            }}
          >
            {item.text}
          </Text>
        )}
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: 'flex-end',
          flexDirection: 'row',
          columnGap: 5,
        }}
      >
        {item.timestamp ? (
          <AppText
            text={item.timestamp?.toDate()?.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
            type={'timestamptxt'}
            style={styles.timestampText}
          />
        ) : null}

        {item.senderId === user?.userid && (
          <Image
            source={item.deleted ? null : image.doubletick}
            style={{ height: 20, width: 20 }}
            {...(item.status === 'seen' && {
              tintColor: '#3d77e2ff',
            })}
          />
        )}
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  rendermessageview: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 5,
    minWidth: '23%',
    maxWidth: '80%',

    paddingHorizontal: 12,
    paddingVertical: 1,
  },
  timestampText: {
    fontSize: 10,
    color: Colors.timestampText,
  },
});
