import { NativeModules, Platform } from 'react-native';

const { VoiceToText } = NativeModules;

export const Voice = async () => {
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