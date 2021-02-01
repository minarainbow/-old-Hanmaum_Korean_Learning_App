import React, { Component } from 'react';
import Speech from './Speech';
import Tts from './Tts';
import Permissions from 'react-native-permissions';

import styled from 'styled-components/native';
const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #f5fcff;
`;
import { ScrollView } from "react-native";
import { COLOR, ThemeContext, getTheme, Toolbar } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
  fontFamily: 'System',
  palette: {
    primaryColor: COLOR.blue800,
  },
  toolbar: {
    container: {
      height: 80,
      paddingTop: 30,
      marginBottom: 30
    },
  }
};

export default class Main extends Component {
  componentDidMount () {
    // this.loadInitialState();
    console.log('PerMission Check')
    this._requestPermission();
  }
    // Request permission to access photos
  _requestPermission = async () => {
    await Permissions.request('microphone').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({microphonePermission: response});
    });
    await Permissions.request('storage').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({storagePermission: response});
    });
  };
    
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Container>
        <Toolbar
          centerElement="Korean Language"
        />
        <ScrollView 
        horizontal={false}
        >
          <Speech />
          <Tts />
          </ScrollView>
        </Container>
      </ThemeContext.Provider>
    );
  }
}