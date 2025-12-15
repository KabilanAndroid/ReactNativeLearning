import React, { useRef } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
  StatusBar,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ITEM_WIDTH = SCREEN_WIDTH * 0.72;
const ITEM_SPACING = 20;
const CARD_HEIGHT = 420;

const swipe =()=> {

  const scrollX = useRef(new Animated.Value(0)).current;

  const originalItems = ["orange", "purple", "red", "blue", "green"];

  const items = [...originalItems];

  const snapToInterval = ITEM_WIDTH + ITEM_SPACING;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <Animated.FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapToInterval}
        // decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2.32,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        // scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * snapToInterval,
            index * snapToInterval,
            (index + 1) * snapToInterval,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.86, 1, 0.86],
            // extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            // extrapolate: "clamp",
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [20, 0, 20],
            // extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.card,
                {
                  width: ITEM_WIDTH,
                  height: CARD_HEIGHT,
                  marginHorizontal: ITEM_SPACING / 2,
                  transform: [{ scale }, { translateY }],
                  opacity,
                  backgroundColor: item,
                },
              ]}
            >
              <Text style={styles.cardText}>{item?.toLocaleUpperCase()}</Text>
            </Animated.View>
          );
        }}
      />

      {}
      <View style={styles.dotsWrapper}>
        {items.map((_, i) => {
          const inputRange = [
            (i - 1) * snapToInterval,
            i * snapToInterval,
            (i + 1) * snapToInterval,
          ];

          const dotScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            // extrapolate: "clamp",
          });

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            // extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${i}`}
              style={[
                styles.dot,
                {
                  transform: [{ scale: dotScale }],
                  opacity: dotOpacity,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingTop: 120,
  },
  card: {
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  cardText: {
    fontSize: 22,
    color: "#ffffffff",
    fontWeight: "700",
  },
  dotsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#888",
    marginHorizontal: 6,
  },
});

export default swipe;
