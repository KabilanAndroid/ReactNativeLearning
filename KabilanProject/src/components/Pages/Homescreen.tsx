import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../../redux/slice/userActions';

const DATA = [
  { id: '1', title: 'First Item' },
  { id: '2', title: 'Second Item' },
  { id: '3', title: 'Third Item' },
  { id: '4', title: 'Fourth Item' },
  { id: '5', title: 'Fifth Item' },
  { id: '6', title: 'Sixth Item' },
  { id: '7', title: 'Seventh Item' },
  { id: '8', title: 'Eighth Item' },
  { id: '9', title: 'Ninth Item' },
  { id: '10', title: 'Tenth Item' },
  { id: '11', title: 'Eleventh Item' },
  { id: '12', title: 'First Item' },
  { id: '21', title: 'Second Item' },
  { id: '31', title: 'Third Item' },
  { id: '41', title: 'Fourth Item' },
  { id: '51', title: 'Fifth Item' },
  { id: '61', title: 'Sixth Item' },
  { id: '71', title: 'Seventh Item' },
  { id: '81', title: 'Eighth Item' },
  { id: '91', title: 'Ninth Item' },
  { id: '110', title: 'Tenth Item' },
  { id: '111', title: 'First Item' },
];

const Item = ({ title }: any) => (
  <View style={[styles.item]}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Homescreen = () => {
  // const { userData } = useContext<any>(UserContext);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  // const route = useRoute();
  const navigation = useNavigation();
  // const { user } = route.params;
  const filteredData = DATA.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#5C5C99',
      },
      headerSearchBarOptions: {
        headerIconColor: 'white',
        textColor: 'white',
        hintTextColor: 'white',
        placeholder: 'Search...',
        onChangeText: (event: any) => {
          const text = event.nativeEvent.text;
          setSearchText(text);
        },
        onSearchButtonPress: (event: any) => {
          const text = event.nativeEvent.text;
          setSearchText(text);
        },
        onCancelButtonPress: () => setSearchText(''),
      },
    });
  }, [navigation]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: selectedValue.includes(item.id) ? '#A3A3CC' : 'white',
      }}
      onPress={() => {
        if (selectedValue.includes(item.id)) {
          const newArray = selectedValue.filter(id => id !== item.id);
          setSelectedValue(newArray);
        } else {
          setSelectedValue([...selectedValue, item.id]);
        }
      }}
    >
      <Item title={item.title} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        {userData && (
          <View>
            <Text>Username: {userData.username}</Text>
            <Text>Email: {userData.email}</Text>
          </View>
        )}
      </View> */}
      {/* <Text>itemId: {JSON.stringify(user)}</Text> */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 2,
          paddingHorizontal: 2,
          rowGap: 10,
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          padding: 5,
          backgroundColor: '#CCCCFF',
          borderRadius: 20,
        }}
      />
      <TouchableOpacity onPress={() => dispatch(setLoginStatus(false))}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#CCCCFF',
    rowGap: 10,
  },
  item: {
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
  },
});

export default Homescreen;
