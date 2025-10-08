/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import { useEffect, useState } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import AppButton from '../atoms/AppButton';
import { Colors } from '../../utils/colors';

type DataTyp = {
  email?: string;
  password?: string;
  selectedValue?: string;
};

export default function App() {
  const options = [
    { name: 'kabilan', id: '1' },
    { name: 'rohit', id: '2' },
    { name: 'surya', id: '3' },
    { name: 'bruce ', id: '4' },
  ];

  const [loginData, setLoginData] = useState<DataTyp>({
    email: '',
    password: '',
    selectedValue: '',
  });

  useEffect(() => {
    console.log('test');
  }, [loginData.password]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={
          // eslint-disable-next-line react-native/no-inline-styles
          {
            flexGrow: 1,
            alignItems: 'center',
            alignContent: 'center',
          }
        }
      >
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>

        <View style={styles.questionContainer}>
          {options.map(option => {
            return (
              <TouchableOpacity
                key={option.id}
                style={styles.singleOptionContainer}
                onPress={() =>
                  setLoginData(state => ({
                    ...state,
                    selectedValue: option.id,
                  })) 
                }
              >
                <View style={styles.outerCircle}>
                  {loginData.selectedValue === option.id ? (
                    <View style={styles.innerCircle} />
                  ) : null}
                </View>
                <Text>{option.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Image
          source={{ uri: 'https://reactjs.org/logo-og.png' }}
          style={styles.image}
        />

        <Text style={styles.title}>{loginData.email}</Text>
        <TextInput
          value={loginData.email!!}
          mode="outlined"
          label="email"
          placeholder="Type email"
          // right={<TextInput.Affix text="/100"/>}
          onChangeText={text =>
            setLoginData(pre => ({
              ...pre,
              email: text,
            }))
          }
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          value={loginData.password!!}
          mode="outlined"
          label="password"
          placeholder="Type password"
          onChangeText={text =>
            setLoginData(pre => ({
              ...pre,
              password: text,
            }))
          }
          keyboardType="visible-password"
          secureTextEntry
          style={styles.input}
        />
        <AppButton
          text={'Submit'}
          callBack={(data: any) => {
            if (data) {
              setLoginData(pre => ({
                ...pre,
                selectedValue: data,
              }));
            }
            console.log('click', data);
          } }
          buttonStyle={{}}
          buttonBg={Colors.grey} theme={'primary'} />
        <Button onPress={() => {}} title="Login" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffefeff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 80,
  },
  title: {
    fontSize: 40,
    color: '#ffffffff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#ffffffff',
    padding: 10,
    width: '80%',
    marginTop: 15,
    color: '#e7e4e4ff',
    textAlign: 'center',
  },
  scrollview: {
    backgroundColor: 'skyblue',
  },
  questionContainer: {
    width: '30%',
  },

  singleOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'yellow',
    padding: 16,
    elevation: 5,
    shadowColor: '#241fa9ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 11,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 42,
    padding: 12,
    alignContent: 'center',
  },
});
