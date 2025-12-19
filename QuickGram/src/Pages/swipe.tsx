import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  PanResponder,
  StyleSheet,
} from "react-native";

const ITEM_HEIGHT = 70;

export default function DraggableFlatList() {
  const [data, setData] = useState([
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    { id: "5", title: "Item 5" },
  ]);

  const draggingIndex = useRef(null);
  const dragY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: (_, gesture) => {
        dragY.setOffset(gesture.y0);
        dragY.setValue(0);
      },

      onPanResponderMove: Animated.event(
        [null, { moveY: dragY }],
        { useNativeDriver: false }
      ),

      onPanResponderRelease: (_, gesture) => {
        dragY.flattenOffset();

        const newIndex = Math.floor(gesture.moveY / ITEM_HEIGHT);

        if (
          newIndex >= 0 &&
          newIndex < data.length &&
          newIndex !== draggingIndex.current
        ) {
          const updated = [...data];
          const movedItem = updated.splice(draggingIndex.current, 1)[0];
          updated.splice(newIndex, 0, movedItem);
          setData(updated);
        }

        draggingIndex.current = null;
        dragY.setValue(0);
      },
    })
  ).current;

  const renderItem = ({ item, index }:{item:string,index:number}) => {
    const isDragging = index === draggingIndex.current;

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.item,
          isDragging && {
            position: "absolute",
            width: "100%",
            zIndex: 10,
            transform: [{ translateY: dragY }],
          },
        ]}
        onTouchStart={() => {
          draggingIndex.current = index;
        }}
      >
        <Text style={styles.text}>{item.title}</Text>
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    height: ITEM_HEIGHT,
    backgroundColor: "#f31c1cff",
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
