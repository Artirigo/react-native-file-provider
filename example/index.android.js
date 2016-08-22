import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {
  downloadFile,
  mkdir,
  DocumentDirectoryPath,
} from 'react-native-fs';

import FileProvider from 'react-native-file-provider';
import Share from 'react-native-share';

const IMAGES_PATH = `${DocumentDirectoryPath}/images`;

class FileProviderExample extends Component {

  _click = () => {
    const targetFile = `${IMAGES_PATH}/image.jpg`;

    Promise.resolve()
    // create directory
      .then(() => mkdir(IMAGES_PATH))
      // download test image to target directory
      .then(() => downloadFile({
        fromUrl: 'http://lorempicsum.com/futurama/350/200/1',
        toFile: targetFile,
      }).promise)
      // get content-uri for the file
      .then(() => (
        FileProvider.getUriForFile('com.artirigo.fileproviderexample.fileprovider', targetFile)
      ))
      // call sharing with content-uri
      .then((contentUri) => {
        console.log('contentUri', contentUri);
        Share.open({ url: contentUri });
      });
  };

  render() {
    return (
      <View style={styles.container} >
        <TouchableHighlight
          style={styles.btn}
          onPress={this._click}
        >
          <Text style={styles.label} >Download & Share</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#ec6608',
    borderRadius: 4,
    padding: 10,
  },
  btnLabel: {
    fontSize: 14,
  },
});

AppRegistry.registerComponent('FileProviderExample', () => FileProviderExample);
