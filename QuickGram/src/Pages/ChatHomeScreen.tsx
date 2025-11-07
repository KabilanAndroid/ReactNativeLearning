import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AppText from '../atoms/AppText';
import ChatSearch from '../atoms/ChatSearch';
import { image } from '../utils/Images';
import { Colors } from '../utils/Colors';

const ChatListItem = ({ title }: { title: string }) => (
  <View style={styles.listItem}>
    <Image source={image.profilelogo} style={styles.avatar} />
    <View style={styles.textview}>
      <AppText text={title} type={'chatpeople'} />
      <AppText text="message hi hello how are you yh uhhio " type='lastmessage' />
    </View>
    <View style={styles.timeview}>
      <AppText text="12.00 Am" type="500-14" />
      <View style={styles.unreadview}>
        <AppText text="unread" type="500-14" />
      </View>
    </View>
  </View>
);

const ChatHomeScreen = () => {
  const [searchitem, setSearchitem] = useState('');

  const DATA = [
    { id: '1', title: 'First Item' },
    { id: '2', title: 'Second Item' },
    { id: '3', title: 'Third Item' },
    { id: '1', title: 'Fourth Item' },
    { id: '2', title: 'Fifth Item' },
    { id: '3', title: 'Sixth Item' },
    { id: '1', title: 'Seventh Item' },
    { id: '2', title: 'Eighth Item' },
    { id: '3', title: 'Nineth Item' },
    { id: '1', title: 'Tenth Item' },
    { id: '2', title: 'Eleventh Item' },
    { id: '3', title: 'tweleth Item' },
  ];
  const filteredData = DATA.filter(item =>
    item.title.toLowerCase().includes(searchitem.toLowerCase()),
  );

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <ChatListItem title={item.title} />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <AppText
        text={'Chat'}
        type={'LoginText'}
        style={styles.headertextstyle}
      />
      <ChatSearch
        onChangeText={setSearchitem}
        value={searchitem}
        placeholder={'search'}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.loginbg
  },
  unreadview: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  textview: {
    flex: 1,
  },
  timeview: {
    alignItems: 'flex-end',
  },
  headertextstyle: {
    padding:10,
    backgroundColor:Colors.introbg
  },
  searchbar: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 45,
    borderColor: Colors.black,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 30,
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.introbg,
  },
});
