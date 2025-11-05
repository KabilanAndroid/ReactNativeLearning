/* eslint-disable react-native/no-inline-styles */
import {  Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '../utils/Colors';
import { image } from '../utils/Images';

import SignupForms from '../Components/SignupForms';

const SignupScreen = () => {
  
     
  return (
    <View style={styles.container}>
      <View style={styles.imageview}>
        <Image source={image.loginbg} style={styles.images} />
      </View>

      <View style={styles.whiteview} >
        <Image source={image.logo} style={{height:90,width:90}}/>
      </View>
      <View style={styles.card}>
        <SignupForms />
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.loginbg,
  },
  forgetpass: {
    alignSelf: 'flex-end',
  },
  imageviewinsideview: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },

  loinbtnview: {
    marginTop: 60,
  },
  textinput1: {
    paddingVertical: 15,
    width: '100%',
  },
  textinput2: {
    paddingVertical: 15,
  },
  textinsideview1: {
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  textinsideview2: {
    paddingTop: 5,
    paddingHorizontal: 16,
  },
  loginButton: {
    backgroundColor: Colors.loginclr,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 45,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 30,
  },

  cardinsidecard: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    shadowColor: '#000000ff',
    paddingHorizontal: 30,
    paddingVertical: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  imageview: {
    flex: 1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#d7d7d746',
  },
  images: {
    height: '100%',
    width: '100%',
  },
  card: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    paddingVertical: 100,
    paddingHorizontal: 20,
    backgroundColor: '#f6f1f146',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  whiteview: {
    flex: 1,
    backgroundColor: Colors.loginbg,
    justifyContent: 'flex-end',
    alignItems:'center',
    paddingBottom:5,
  },
});
