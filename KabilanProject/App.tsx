import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button } from 'react-native';
import {  UpdateAddress,updateGeo,UpdateCompany} from './src/redux/slice/counterSlice'; 
import { RootState } from './src/redux/store'; 

const App = () => {
  
  const name = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  console.log(name);

  useEffect(()=>{
    console.log('test-->',name)
  },[name])

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Redux Example</Text>
      
      <Button
        title="Update company"
        onPress={() => dispatch(updateGeo ({
          lat:"1234"
        }))}
      />
    </View>
  );
};

export default App;