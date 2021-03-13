import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CustomButton from './CustomButton';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.title}><Text style={styles.titleText}>한이음</Text></View>
        <View style={styles.content}></View>
        <View style={styles.footer}>
        <CustomButton
            buttonColor = {'#578CEB'}
            title = {'로그인'}
            onPress={()=>alert('로그인 버튼')}
        />  
        <CustomButton
            buttonColor = {'#578CEB'}
            title = {'회원가입'}
            onPress={()=>alert('회원가입 버튼')}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '9%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleText: {
    color: '#578CEB',
    fontSize: 60,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footer: {
    width: '100%',
    height: '20%',
    backgroundColor: 'white',
  },
});