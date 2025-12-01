import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { MessageseenType } from '../utils/Types';
import { Chip } from 'react-native-paper';


type ChatDateWiseType = {
  item: MessageseenType;
  previousItem: MessageseenType;
};
const getdate = (date: {
  getFullYear: () => any;
  getMonth: () => any;
  getDate: () => any;
}) => {
  return `${date?.getFullYear()}-${date?.getMonth()}-${date?.getDate()}`;
};
const ChatDateWise:FC<ChatDateWiseType> = ({ item, previousItem }) => {
var dateToday = new Date();
  var yesterday = new Date();
  yesterday.setDate(dateToday?.getDate() - 1);

  const curr_date = item?.timestamp?.toDate();
  const previous = previousItem?.timestamp?.toDate();
  return (
    <View style={styles.container}>
            {(curr_date)&&
             getdate(curr_date) !== getdate(previous) ? (
              getdate(curr_date) === getdate(dateToday) ? (
                <Chip mode="outlined">Today</Chip>
                
              ) : getdate(curr_date) === getdate(yesterday) ? (
                <Chip mode="outlined">Yesterday</Chip>
              ) : (
                <Chip mode="outlined">{getdate(curr_date)}</Chip>
              
              )
            ) : null
            }
            </View>
  )
}

export default ChatDateWise

const styles = StyleSheet.create({
    container:{alignSelf:'center',marginVertical:3}
})