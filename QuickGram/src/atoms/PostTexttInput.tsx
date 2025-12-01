import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Dispatch, FC, SetStateAction } from 'react'


type posttextinputType ={
   settweet:Dispatch<SetStateAction<string>>;
   tweet:string;
}
const PostTexttInput:FC <posttextinputType> = ({settweet,tweet}) => {
  return (
     <View style={styles.textinputviewstyle}>
              <TextInput
                onChangeText={settweet}
                value={tweet}
                placeholder={'Type something ........'}
                multiline
                numberOfLines={40}
                maxLength={1000}
                style={styles.textinputstyle}
              />
            </View>
  )
}

export default PostTexttInput

const styles = StyleSheet.create({
    textinputviewstyle:{padding:10},
    textinputstyle: {
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    margin: 12,
  },
})