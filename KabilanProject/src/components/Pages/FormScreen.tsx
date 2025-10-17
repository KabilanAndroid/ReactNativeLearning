import {
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import AppFormButton from '../atoms/AppFormButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const FormScreen = () => {
    const count = useSelector((state:RootState)=>state.counter.address.city)
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Form submission</Text>
        
<AppFormButton placeholder="Name" />
        <AppFormButton placeholder="Email" keyboardType="email-address" />

        <AppFormButton placeholder="Location" />
        <AppFormButton placeholder="Phone" />
        <AppFormButton placeholder="street" />
        <AppFormButton placeholder="zip code" />
        <AppFormButton placeholder="latitude" />
        <TouchableOpacity onPress={() => console.log('Form submitted')}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#CCCCFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#5C5C99',
    paddingVertical: 15,
    borderRadius: 6,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
