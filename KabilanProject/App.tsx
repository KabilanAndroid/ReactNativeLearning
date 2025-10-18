import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button } from 'react-native';
import {  updateGeo, UpdateName} from './src/redux/slice/counterSlice'; 
import { RootState } from './src/redux/store'; 
import { updategeo, Updatename } from './src/redux/slice/TempCounterSlice';

const App = () => {
  
  const name = useSelector((state: RootState) => state.Counter);
  const tempname = useSelector((state: RootState) => state.tempcounter);
  const dispatch = useDispatch();


  console.log(name);
  
  

  useEffect(()=>{
    console.log('test-->',name,tempname)
  },[name,tempname])



  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1,gap:20,justifyContent:'center', alignItems: 'center' }}>
      <Text>Redux Example</Text>
      
      <Button
        title="Update permanent name"
        onPress={() => dispatch(UpdateName ({
          name:"kabilan"
        }))}
      />

      <Button
        title="Update temporary name"
        onPress={() => dispatch(Updatename ({
          name:'Thiru'
        }))}
      />
    </View>
  );
};

export default App;