import React, { useState } from "react";
import { View, Button, Text, NativeModules } from "react-native";
import AppText from "../atoms/AppText";

const { RandomModule } = NativeModules;

export default function RandomNumberScreen() {
  const [number, setNumber] = useState(null);

  const generate = async () => {
    try {
      const value = await RandomModule.generateRandom('1', '100');
      setNumber(value);
    } catch (e) {
      console.log("Error:", e);   
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Generate Random Number" onPress={generate} />

      {number !== null && (
        <AppText text={number} type={"lastmessage"}/>
      )}
    </View>
  );
}
