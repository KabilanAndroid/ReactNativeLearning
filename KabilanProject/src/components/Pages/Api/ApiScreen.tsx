import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AppFormButton from '../../atoms/AppFormButton';

type ApiStateType = {
  id: string;
  text: string;
  postId?: string;
};

export const instance = axios.create({
  baseURL: 'http://172.21.4.200:3000/',
  timeout: 3000,
});

const MyComponent = () => {
  const [data, setData] = useState<ApiStateType[]>([]);
  const [postText, setPostText] = useState('');
  const [nextId, setNextId] = useState([]);
 
  const [editingItem, setEditingItem] = useState<ApiStateType>();
  console.log(data);

  const getData = async () => {
    try {
      console.log('Fetching data...');
      const response = await instance.get('comments');
      const data1 = response.data;
      setData(data1);

      const validIds = data1
        // eslint-disable-next-line radix
        .map((item: { id: any }) => parseInt(item.id))
        .filter((id: number) => !isNaN(id));

      if (validIds.length > 0) {
        const maxId = Math.max(...validIds);
        setNextId(maxId + 1);
      } else {
        setNextId(1);
        console.log('No valid IDs found. Setting nextId to 1.');
      }
      console.log('Success fetching data:', data1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const postData = async () => {
    try {
      if (editingItem) {
        const updatedComment = { ...editingItem, text: postText };
        const response = await instance.put(
          `comments/${editingItem.id}`,
          updatedComment,
        );
        console.log('Update successful:', response.data);
        setData(prevData =>
          prevData.map(item =>
            item.id === editingItem.id ? response.data : item,
          ),
        );
        setEditingItem(null);
      } else {
        console.log({ nextId });

        const newComment = {
          text: postText,
          id: String(nextId),
          postId: String(1),
        };
        const response = await instance.post('comments', newComment);
        console.log('Post successful:', response.data);
        setData(prevData => [...prevData, response.data]);
        setNextId(prevId => prevId + 1);
      }
      setPostText('');
    } catch (error) {
      console.error('Error posting/updating data:', error);
    }
  };

  const startEditing = (item: ApiStateType) => {
    setEditingItem(item);
    setPostText(item.text);
  };
  const deleteData = (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteItem(id) },
      ],
      { cancelable: true },
    );
  };

  const deleteItem = async (id: string) => {
    await instance.delete(`comments/${id}`);
    setData(prevData => prevData.filter(item => item.id !== id));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>{item.id}</Text>
              <Text>{item.text}</Text>
              <Text>{item.postId}</Text>
              <View style={styles.buttonGroup}>
                <Button title="Edit" onPress={() => startEditing(item)} />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => deleteData(item.id)}
                />
              </View>
            </View>
          )}
        />
        <AppFormButton
          style={styles.input}
          placeholder={editingItem ? 'Edit comment' : 'Add new text'}
          value={postText}
          onChangeText={setPostText}
        />
        <Button
          title={editingItem ? 'Update text' : 'Add text'}
          onPress={postData}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,

  },
  input: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#7800b3ff',
  },
  itemText: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default MyComponent;
