import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppImage from './AppImage';
import AppText from './AppText';
import { image } from '../utils/Images';
import { useAppSelector } from '../redux/ReduxHook';

const Postusername = () => {
  const user = useAppSelector(state => state.auth);
  return (
    <View style={styles.usernameview}>
      <AppImage source={image.profilelogo} style={styles.logo} />
      <AppText
        text={user.username}
        style={styles.usernametext}
        type={'logoutbtn'}
      />
    </View>
  );
};

export default Postusername;

const styles = StyleSheet.create({
  usernameview: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  usernametext: { color: 'black' },
});
