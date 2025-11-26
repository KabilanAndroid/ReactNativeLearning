/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../utils/Colors';
import { useAppSelector } from '../redux/ReduxHook';
import AppText from './AppText';
import { image } from '../utils/Images';
import { MessageseenType } from '../utils/Types';

type ChatBubbleType = {
  item: MessageseenType;
};

const ChatBubble: FC<ChatBubbleType> = ({ item }) => {
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
        <AppText
          text={item.timestamp?.toDate()?.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
          type={'timestamptxt'}
          style={styles.timestampText}
        />

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
    margin: 5,
    maxWidth: '80%',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  timestampText: {
    fontSize: 10,
    color: Colors.timestampText,
  },
});
