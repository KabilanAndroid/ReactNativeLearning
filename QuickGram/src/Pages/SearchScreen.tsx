import { FlatList, Image, StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import ChatSearch from '../atoms/ChatSearch';
import { Colors } from '../utils/Colors';
import AppText from '../atoms/AppText';
import { image } from '../utils/Images';
import Appbackbtn from '../atoms/Appbackbtn';

type ChatType = {
  title: string;

};

const ChatListItem: FC<ChatType> = ({ title }) => {
  // const [iconstate,seticonstate] = useState(false)
  return (
    <View style={styles.listItem}>
      <Image source={image.profilelogo} style={styles.avatar} />
      <View style={styles.textview}>
        <AppText text={title} type={'chatpeople'} />
      </View>
      <View style={styles.addfriendview}>
        <Appbackbtn
          //   Onpress={seticonstate(true)}
          source={ image.addedfrnicn}
          style={styles.iconstyle}
          Onpress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </View>
    </View>
  );
};

const SearchScreen = () => {
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
    <ChatListItem title={item.title}  />
  );
  return (
    <View style={styles.container}>
      <AppText
        text={'Search'}
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
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconstyle: {
    height: 28,
    width: 28,
  },
  textview: {
    flex: 1,
    flexDirection: 'row',
  },
  addfriendview: {
    alignItems: 'flex-end',
  },
  headertextstyle: {
    padding: 10,
    backgroundColor: Colors.introbg,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.introbg,
  },
});
