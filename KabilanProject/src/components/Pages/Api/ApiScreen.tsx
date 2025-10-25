import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AppFormButton from '../../atoms/AppFormButton';

export const instance = axios.create({
  baseURL: 'http://172.21.4.200:3000/',
  timeout: 3000,
});

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [postText, setPostText] = useState('');
  
  const getData = async () => {
    try {
      console.log('coming...');
      const response = await instance.get('comments');
      const data1 = response.data;
      setData(data1);
      console.log('Success:', data1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const postData = async () => {
    try {
      const response = await instance.post('comments', { text: postText }); 
      console.log('Post successful:', response.data);
      getData(); 
      setPostText(''); 
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.text}</Text>
            <Text>Post ID: {item.postId}</Text>
          </View>
        )}
      />
      <View style={styles.formContainer}>
        <AppFormButton 
          placeholder="enter a text" 
          value={postText} 
          onChangeText={setPostText} 
        />
        <Button 
          title="submit" 
          onPress={postData} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  formContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  }
});

export default MyComponent;
