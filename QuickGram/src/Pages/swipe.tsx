import React from 'react';
import {
  NativeModules,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { VoiceToText } = NativeModules;

const startVoice = async () => {
  if (Platform.OS !== 'android') return '';

  if (!VoiceToText || !VoiceToText.startVoiceSearch) {
    console.error('Native bridge not linked');
    return '';
  }
  try {
    return await VoiceToText.startVoiceSearch();
  } catch (e) {
    console.error(e);
    return '';
  }
};

export default function Voice() {
  const [text, setText] = React.useState('');

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={async () => {
          const result = await startVoice();
          setText(result);
          console.log(result);
        }}
        style={{
          padding: 12,
          backgroundColor: '#1976D2',
          borderRadius: 20,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>🎤 Speak</Text>
      </TouchableOpacity>

      {text ? (
        <Text style={{ marginTop: 16, fontSize: 16 }}>{text}</Text>
      ) : null}
    </View>
  );
}


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const swipe = () => {
//   return (
//     <View>
//       <Text>swipe</Text>
//     </View>
//   )
// }

// export default swipe

// const styles = StyleSheet.create({})