import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [showIndicator, setShowIndicator] = useState(true);
  const [error, setError] = useState(null);

    const fetchData =  () => {
fetch('https://jsonplaceholder.typicode.com/posts')
      .then(Response => {
        return Response.json();
      })
      .then(apiData => {
        setData(apiData.slice(0,5));
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setShowIndicator(false));
  //       const data1 = await response.json();
  //       console.log(data1);

  //       setData(data1.slice(0,5));
  //       setShowIndicator(false);
  //     // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
  //     } catch (error) {
  //       console.error('Fetch error: ', error);
  //       setError(error.message);
  //       setShowIndicator(false);
  //     }
    };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, paddingTop: 20 }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          // eslint-disable-next-line react-native/no-inline-styles
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          >
            <Text>{item.id}</Text>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MyComponent;
