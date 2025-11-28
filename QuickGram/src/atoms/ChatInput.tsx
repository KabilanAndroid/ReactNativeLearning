import { StyleSheet, View } from 'react-native'
import React, { Dispatch, FC, memo, SetStateAction } from 'react'
import AppTextInput from './AppTextInput'
import Appbackbtn from './Appbackbtn'
import { Colors } from '../utils/Colors'
import { image } from '../utils/Images'

type ChatInputType ={
    setNewMessage:Dispatch<SetStateAction<string>>;
    newMessage:string;
    editing:boolean;
    sendMessage:() => Promise<void>;
    calltwo:()=>void;
}

const ChatInput:FC<ChatInputType> = ({setNewMessage,newMessage,editing,sendMessage,calltwo}) => {
  return (
    <View style={styles.view2}>
        <View style={styles.textinputview}>
          <AppTextInput
            onChangeText={setNewMessage}
            value={newMessage}
            placeholder={'Message...'}
            style={styles.textinput}
          />
          <Appbackbtn
            Onpress={editing ? sendMessage : calltwo}
            source={image.sendicon}
            style={styles.sendiconstyle}
          />
        </View>
      </View>
  )
}

export default memo(ChatInput);

const styles = StyleSheet.create({
     view2: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textinputview: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 10,
      backgroundColor: Colors.textinputcolor,
      shadowColor: '#1e1b1bff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      borderBottomWidth: 0,
      shadowRadius: 3,
      justifyContent: 'space-around',
    },
     textinput: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginStart: 10,
    height: 55,
    width: 320,
    borderColor: '#90988dff',
    borderWidth: 1,
  },
  sendiconstyle: {
    height: 32,
    transform: [{ rotate: '330deg' }],
    width: 32,
  },
})