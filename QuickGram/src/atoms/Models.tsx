import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import AppText from './AppText';
import CommentHeader from './CommentHeader';

type ModelsType = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  item: string;
  selectedItem: string;
};
const Models: FC<ModelsType> = ({
  modalVisible,
  setModalVisible,
  item,
  selectedItem,
}) => {
  const renderitem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View>
        
        <AppText text={item} type={'lastmessage'} />
      </View>
    );
  };
  return (
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // presentationStyle="overFullScreen"
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{ flex: 1 }}
            ></TouchableOpacity>
          </View>
          

          <View style={styles.modalView}>
            <CommentHeader
              callback={() => setModalVisible(!modalVisible)} text={'Likes'}        />
            <FlatList
              data={[selectedItem]}
              renderItem={renderitem}
              keyExtractor={item => item}
            />
          </View>
        </View>
      </Modal>
    // </View>
  );
};

export default Models;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#00000040',
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
    paddingTop: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
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
