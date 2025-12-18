import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert, NativeModules } from "react-native";
import AppText from "../atoms/AppText";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScreenType } from "../utils/Types";

const { CameraModule } = NativeModules;

type CameraResult = {
  uri: string;
  type: string;
};

export default function CameraGalleryScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<ScreenType>>();

  const handleCapture = async (crop = false) => {
    console.log("Camera pressed");
    try {
      const result: CameraResult = await CameraModule.captureImage({ crop });
      setImageUri(result.uri);
      console.log("Camera URI:", result.uri);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error?.message ?? "Could not capture image");
    }
  };

  const handleGallery = async (crop = false) => {
    console.log("Gallery pressed");
    try {
      const result: CameraResult = await CameraModule.pickImage({ crop });
      setImageUri(result.uri);
      console.log("Gallery URI:", result.uri);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error?.message ?? "Could not pick image");
    }
  };

  const name = "kabilan";

  return (
    <View style={styles.container}>
      <AppText style={styles.text}>
        {imageUri ? "Selected Image:" : "Pick an image from Camera or Gallery"}
      </AppText>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <View style={styles.buttons}>
        <Button title="Open Camera" onPress={() => handleCapture(false)} />
        <Button title="Open Gallery" onPress={() => handleGallery(false)} />
        <Button
          title="Zoom"
          onPress={() =>
            navigation.navigate("zoom", {
              id: imageUri,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 12,
  },
  buttons: {
    width: "100%",
    justifyContent: "space-around",
    gap: 10,
  },
});
