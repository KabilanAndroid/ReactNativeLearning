import React from 'react';
import {  StyleSheet, View } from 'react-native';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import { useAppRoute } from '../navigation/NavigationHook';
import AppImage from '../atoms/AppImage';


const Zoom = () => {
  const route = useAppRoute<'zoom'>();
  const imageUri = route.params?.id;

  /* ------------------ Shared Values ------------------ */
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  /* ------------------ Pinch Gesture ------------------ */
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = clamp(savedScale.value * e.scale, 1, 4);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  /* ------------------ Pan Gesture ------------------ */
  const panGesture = Gesture.Pan()
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((e) => {
      const maxTranslateX = (300 * scale.value) / 2;
      const maxTranslateY = (300 * scale.value) / 2;

      translationX.value = clamp(
        prevTranslationX.value + e.translationX,
        -maxTranslateX,
        maxTranslateX
      );

      translationY.value = clamp(
        prevTranslationY.value + e.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    });

  /* ------------------ Combine Gestures ------------------ */
  const combinedGesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture
  );

  /* ------------------ Animated Style ------------------ */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={{flex:1}}>
        <View style={{flex:1}}></View>
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={[styles.imageContainer, animatedStyle]}>
          <AppImage
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView> 
     <View style={{flex:1}}></View>
    </View>

  );
};

export default Zoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});
