import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppText from '../atoms/AppText';
import { Apicall } from '../utils/Types';
import customdata from '../atoms/Customdata';
import AppButton from '../atoms/AppButton';

const renderdata = ({ item, index }: { item: Apicall; index: number }) => {
  return (
    <AppText
      text={item?.flag_img}
      type={'logoutbtn'}
      style={{ color: 'black' }}
      rest={{ numberOfLines: 0 }}
    />
  );
};
const Api = () => {
  const [message, setmessage] = useState<Apicall[]>();

  const hook = customdata();

  const baseurl = 'http://172.21.4.102/medicallink/api';
  const handlePress = () => {
    hook.fetchData(`${baseurl}/countries/list`);
  };

  useEffect(() => {
    if (hook?.data) {
      setmessage(hook?.data?.data);
    }
  }, [hook?.data]);

  return (
    <View>
      <AppButton text={'click'} Onpress={() => handlePress()} />
      {/* {hook.loading && <ActivityIndicator size="large" color="#ff0000ff" />} */}
      <FlatList
        data={message}
        renderItem={renderdata}
        keyExtractor={(item, index) => `${item.id}`}
      />
    </View>
  );
};

export default Api;
