/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import RNFS from 'react-native-fs'

// import SoundPlayer from 'react-native-sound-player';
import Sound from 'react-native-sound';
import * as DocumentPicker from 'expo-document-picker';
import Video from 'react-native-video';

function App(): JSX.Element {
  Sound.setCategory('Playback');

  const whoosh = new Sound('file:///data/user/0/com.test/cache/DocumentPicker/537b420a-c311-4486-964f-083bb6476af6.aac', Sound.LIBRARY ,(error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
  
    // Play the sound with an onEnd callback
    whoosh.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });

  const handlePlay = async () => {
  //   try {
  //     // SoundPlayer.playSoundFile('test', 'mp3')
  //     SoundPlayer.playUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
  // } catch (e) {
  //     console.log(`cannot play the sound file`, e)
  // }
  whoosh.play();
  }
  whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));

  const handleSeek = () => {
    // const a = 15 + Math.random()*1
    // console.log(a)
    // SoundPlayer.seek(a)
    whoosh.setCurrentTime(2.5);
  }

  const handleStop = () => {
    // SoundPlayer.stop()
    whoosh.pause();
  }

  const handleChooseFile = async () => {
    const file = await DocumentPicker.getDocumentAsync()
    console.log(file)
  }
  useEffect(() => {
    console.log(RNFS.ExternalStorageDirectoryPath)
    RNFS.readDir(RNFS.ExternalStorageDirectoryPath)
    .then((result) => {
      // const audioFiles = result.filter((item) => item.isFile() );
      // console.log('Audio files:', result);
    })
    .catch((error) => {
      console.log('Error reading directory:', error);
    });
  }, [])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Video
          source={{uri: 'file:///data/user/0/com.test/cache/DocumentPicker/b21f1239-0b32-4817-83c0-8e19084ab357.mp4'}}
          style={{
            position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
          }}
        />
        <TouchableOpacity style={{
          borderWidth: 1,
          borderColor: 'black',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10
        }}
          onPress={handlePlay}
        >
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          borderWidth: 1,
          borderColor: 'black',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10
        }}
          onPress={handleSeek}
        >
          <Text>Seek</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          borderWidth: 1,
          borderColor: 'black',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10
        }}
          onPress={handleStop}
        >
          <Text>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          borderWidth: 1,
          borderColor: 'black',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10
        }}
          onPress={handleChooseFile}
        >
          <Text>Get File</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
