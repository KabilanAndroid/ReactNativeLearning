import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AppRadio = ({ option , selectedValue, onPress }: any) => {
  const isSelected = option.value === selectedValue;

  return (
    <TouchableOpacity onPress={() => onPress(option.value)}>
      <View style={styles.container}>
        <View style={[styles.outerCircle, isSelected && styles.outerCircleSelected]}>
          {isSelected && <View style={styles.innerCircle} />}
        </View>
        <Text>{option.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  outerCircleSelected: {
    borderColor: 'blue', // Style for the selected state
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'blue', // Color of the inner circle when selected
  },
  text: {
    fontSize: 42,
    padding: 12,
    alignContent: 'center',
  },
});

export default AppRadio;
