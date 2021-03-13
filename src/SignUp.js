import React, {Component} from 'react';
import {View, Text, StyleSheet,TextInput} from 'react-native';
import CustomButton from './CustomButton';

export default class SignUp extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}
                    >반갑습니다</Text></View>
                <View style={styles.inputs}>
                    <TextInput 
                    placeholder={"아이디"}
                    style={styles.input}></TextInput>
                    <TextInput 
                    placeholder={"비밀번호"}
                    style={styles.input}></TextInput>
                    <TextInput 
                    placeholder={"비밀번호 확인"}
                    style={styles.input}></TextInput>
                    <View style={styles.block}></View>
                </View>
                <View style={styles.buttons}>
                    <CustomButton
                        title={"가입"}
                        titleColor={"white"}
                        buttonColor="#578CEB"
                        onPress={()=>alert('가입 버튼')}
                    />
                    <CustomButton
                        title={"취소"}
                        titleColor={"white"}
                        buttonColor="#578CEB"
                        onPress={()=>alert('취소 버튼')}
                    />
                </View>
                <View style={styles.footer}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    },
    title:{
        flex:3,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'

    },
    titleText:{
        fontSize:70,
        color:'#578CEB',
        fontWeight:'bold',
    },
    inputs:{
        flex:3,
        justifyContent:'center',
        alignItems:'center',
        width:"80%",
        backgroundColor:'white',
    },
    input:{
        flex:1,
        borderColor:'#578CEB',
        borderWidth:1,
        margin:5,
        width:"100%",
    },
    block:{
        flex:1,
    },
    buttons:{
        flex:2,
        backgroundColor:'white',
        width:"80%",
        justifyContent:'center',
        alignItems:'center',
    },
    footer:{
        flex:1,
        backgroundColor:'white',
    }

})