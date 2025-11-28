import { Image, StyleSheet, Text, View } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import AppText from './AppText';
import { Rootofchathome } from '../utils/Types';
import { image } from '../utils/Images';
import { Colors } from '../utils/Colors';

type ChatHomedatewiseType = {
  usermessage: Rootofchathome;
  countreads: number;
  username:string;
};

const getdate = (date: {
  getFullYear: () => any;
  getMonth: () => any;
  getDate: () => any;
}) => {
  return `${date?.getFullYear()}-${date?.getMonth()}-${date?.getDate()}`;
};
const ChatHomedatewise: FC<ChatHomedatewiseType> = ({
  usermessage,
  countreads,
  username
}) => {
  var dateToday = new Date();
  var yesterday = new Date();
  yesterday.setDate(dateToday?.getDate() - 1);

  const curr_date = usermessage?.lasttime?.toDate();
  console.log("currdate:",curr_date);
  
  const isyesterday = getdate(curr_date) == getdate(yesterday);

  const isToday=useMemo(()=>{
   return  getdate(curr_date) == getdate(dateToday)
  },[curr_date,dateToday])
  const nodate=useMemo(()=>{
   return  getdate(curr_date) == null
  },[curr_date,dateToday])

  return (
    <View style={styles.listItem}>
          <Image source={image.profilelogo} style={styles.avatar} />
          <View style={styles.textview}>
            <AppText
              text={username}
              type={'chatpeople'}
              rest={{
                numberOfLines: 200,
              }}
            />
            <AppText text={usermessage?.lastmessage} type="500-14" />
          </View>
    <View style={styles.timeview}>
      {(curr_date)?
      isyesterday ? (
        <AppText text={'Yesterday'} type={'500-14'} />
      ) : isToday ? (
        <AppText
          text={usermessage?.lasttime
            ?.toDate()
            ?.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          type="500-14"
        />
      ):
       (
        <AppText text={getdate(curr_date)} type={'500-14'} />
      )
    :null
    }




      <View>
        {countreads === 0 ? (
          <AppText text={''} type={'LoginText'} />
        ) : (
          <AppText
            text={countreads?.toString()}
            type="unread"
            style={styles.unreadview}
          />
        )}
      </View>
    </View>
    </View>
  );
};

export default ChatHomedatewise;

const styles = StyleSheet.create({
  timeview: {
    alignItems: 'flex-end',
  },
  textview: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
    listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    // borderRadius:10,
    // marginHorizontal:10,
    // borderWidth:1,
    borderBottomWidth: 1,
    backgroundColor:Colors.white,
    // borderColor:Colors.black,
    paddingVertical:10,
    // marginVertical:5,
    borderBottomColor: '#cab6b6ff',
  },
  unreadview: {
    backgroundColor: '#8acc29ff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
