import React, { useEffect, useState } from 'react';
import { Button, Image, View } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

const Profile = () => {


  const [selectedvalue, setSelectedValue] = useState<ImageOrVideo>();



 useEffect(() => {
    console.log('selectedvalue', selectedvalue);
  }, [selectedvalue]);


  const openGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image: ImageOrVideo) => {
        setSelectedValue(image);
      })
      .catch(error => {
        console.log('Image picking error:', error);
      });
  };
 
  return (
    <View>
      <Button title="Click" onPress={openGallery} />
      <Image
        source={{ uri: selectedvalue?.path }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ marginTop: 20, width: 200, height: 200, padding: 20 }}
      />
    </View>
  );
};

export default Profile;
