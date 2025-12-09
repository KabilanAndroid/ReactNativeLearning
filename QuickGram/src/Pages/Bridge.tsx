import 'react-native-gesture-handler';
import { runOnJS, scheduleOnRN } from 'react-native-worklets';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withClamp,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import AppText from '../atoms/AppText';
import AppButton from '../atoms/AppButton';

export default function App() {
  const pressed = useSharedValue(false);
  const LOWER_BOUND = -160;
  const UPPER_BOUND = 160;

  const savedX = useSharedValue(-160.0);
  const translateX = useSharedValue(-160.0);
  const [getval, setval] = useState(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      pressed.value = true;
    })
    .onUpdate(event => {
      // 'worklet';
      translateX.value = savedX.value + event.translationX;
      if (translateX.value >= -160 && translateX.value <= 160) {
        const percentage = ((translateX.value + 160) / 320) * 100;
        runOnJS(setval)(Math.round(percentage));
      }
    })

    .onEnd(event => {
      savedX.value = translateX.value;
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? '#FFE04B' : '#B58DF1',
    transform: [
      {
        translateX: withClamp(
          { min: LOWER_BOUND, max: UPPER_BOUND },
          withSpring(translateX.value),
        ),
      },
    ],
  }));
  console.log('vall->>', getval.toString());
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{alignSelf:'flex-end',marginEnd:10,marginTop:10}}>
        <AppButton text={'open'}  Style={{backgroundColor:'black'}} Onpress={()=>console.log('')}/>
      </View>
      <View>
        <AppText text={getval?.toFixed(0)} type={'edittext'} style={{fontSize:30}}/>
      </View>
      <View style={styles.container}>
        <View style={{ backgroundColor: 'red', height: 10, width: 350 }}></View>
        <GestureDetector gesture={pan}>
          
          <Animated.View style={[styles?.circle, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: 40,
    borderWidth: 2,
    position: 'absolute',
    borderColor: 'black',
    width: 40,
    borderRadius: 30,
  },
});



