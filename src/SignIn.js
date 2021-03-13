import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';

export default class SignIn extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        안녕하세요
                    </Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput 
                    style={styles.input}
                    placeholder = {"아이디"}></TextInput>
                    <TextInput 
                    style={styles.input}
                    placeholder = {"비밀번호"}></TextInput>
                </View>
                <View style={styles.buttons}>
                    <CustomButton
                        buttonColor = {'#578CEB'}
                        title = {'로그인'}
                        onPress={()=>alert('로그인 버튼')}
                    />
                    <CustomButton
                        buttonColor = {'#578CEB'}
                        title = {'취소'}
                        onPress={()=>alert('취소 버튼')}
                    />
                </View>
                <View style={styles.footer}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    title:{
        flex:5,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
    },
    titleText:{
        fontSize: 70,
        color:'#578CEB',
        fontWeight:'bold',
    },
    inputs:{
        flex:3,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
    },
    input:{
        borderColor:'#5BBAF5',
        borderWidth:1,
        width:'80%',
        margin:10,
    },
    buttons:{
        flex:3,
        backgroundColor:'white',
        margin:50,
    },
    footer:{
        flex:1,
        backgroundColor:'white',
    }
});
