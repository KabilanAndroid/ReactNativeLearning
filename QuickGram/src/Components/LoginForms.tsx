/* eslint-disable react-native/no-inline-styles */
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet,  View } from 'react-native'
import React from 'react'
import Apptextbutton from '../atoms/Apptextbutton';
import AppText from '../atoms/AppText';
import AppTextInput from '../atoms/AppTextInput';
import LoginButton from '../atoms/LoginButton';
import { Colors } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const LoginForms = () => {
  const navigation = useNavigation()
  return (
    
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.cardinsidecard}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
              <AppText text={'Login'} type={'LoginText'} />
              <View style={styles.textinsideview1}>
                <AppText text={'User name'} type={'userText'} />
              </View>
              <View style={styles.textinput1}>
                <AppTextInput
                  onChangeText={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  value={''}
                  placeholder={'Username'}
                  style={styles.textinput}
                />
              </View>
              <View style={styles.textinsideview2}>
                <AppText text={'Password'} type={'userText'} />
              </View>
              <View style={styles.textinput2}>
                <AppTextInput
                  onChangeText={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  value={''}
                  placeholder={'Password'}
                  style={styles.textinput}
                />
              </View>
              <View style={styles.forgetpass}>
                <Apptextbutton
                  text={'Forget password'}
                  Style={{}}
                  Onpress={function (): void {
                    console.log('hello');
                  }}
                />
              </View>
              <View style={styles.loinbtnview}>
                <LoginButton
                  text={'Login'}
                  Style={styles.loginButton}
                  Onpress={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </View>
              <View style={styles.imageviewinsideview}>
                      <View style={{ flexDirection: 'row', gap: 5 }}>
                        <AppText text={`Don't have an account?`} type={'donthave'} />
                        <Apptextbutton
                          text={'Sign up'}
                          textType="signupfont"
                          Onpress={function (): void {
                            navigation.navigate('SignUp'as never);
                          }}
                        />
                      </View>
                    </View>
              </ScrollView>
            </KeyboardAvoidingView>
         
  )
}

export default LoginForms

const styles = StyleSheet.create({
    forgetpass: {
        alignSelf: 'flex-end',
      },
      imageviewinsideview: {
        paddingVertical:20,
        alignSelf:'center'
      },
    
      loinbtnview: {
        marginTop: 30,
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
        paddingHorizontal: 10,
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
        paddingVertical: 120,
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
        justifyContent: 'center',
        alignItems: 'center',
      },
})