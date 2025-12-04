import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import AppText from './AppText';
import { RenderPost } from '../utils/Types';

type ModelsType = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  item:string
};
const Models: FC<ModelsType> = ({ modalVisible, setModalVisible,item }) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>  
          <View style={styles.modalView}>
            <AppText text={item} type={'lastmessage'}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
          
        </View>
      </Modal>
    </View>
  );
};

export default Models;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor:'#0000040',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  modalView: {
     flex: 1,
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    maxHeight: '60%',
    // minHeight: '10%',
    paddingTop:30,
    paddingHorizontal:20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
