import * as React from 'react';
import Tts from 'react-native-tts';
import Diff from "text-diff";

import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Card, Button } from 'react-native-material-ui';

interface Props {}
interface State {
  isRecord: boolean;
  voice: string;
  question: string;
  text: string;
  total: number;
  inputText: string;
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isRecord: false,
      voice: undefined,
      question: '',
      text: '',
      total: 0,
      inputText: '',
    };
  }

  componentWillMount() {
    this.setState({
      question: '수 천년간 사람들은 자신들이 살고있는 세계에 대해 거의 알지 못했다'
    });
  }

  render() {
    const { isRecord, total, question, text, inputText } = this.state;
    const buttonLabel = isRecord ? '중지' : '읽기평가';
    return (
      <Card>
        <Text style={styles.titleStyle}>[ 한국어 받아쓰기 평가 ]</Text>
        <Text style={styles.subTtitleStyle}>1. 다음 녹음을 들으면서 그 내용을 입력(타이핑)하시오.</Text>
        <View style={styles.rowContainer}>
        <Button primary icon="radio" onPress={this._onOriginListen} text="듣기평가" />
        <Button primary icon="radio" onPress={this._onResult} text="듣기제출" />
        </View>
        <Text style={styles.resultStyle}>
          <ResultRender question={question} voice={text} />
        </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.scoreStyle}>{(text !== "") ? Math.round(total)+" 점" : ""}</Text>
        </View>
        
        <View style={styles.uselessTextInput}
     >
       <TextInput
         onChangeText={(inputText) => this.setState({inputText})}
       />
     </View>
      </Card>
    );
  }
  
  private _onResult = () => {
    const diff = new Diff();
    var result = "";
    var total = 0;
    const textDiff = diff.main(this.state.question, this.state.inputText);
    console.log(this.state.question);
    console.log(this.state.inputText);
    const wordScore = 100 / this.state.question.length;
    textDiff.forEach(element => {
      if (element[0] === 0) {
        result += element[1];
        total += wordScore * element[1].length;
      }
    });
    console.log("total", total);
    this.setState({
      text: this.state.inputText,
      total: total,
    });
  }
  private _onOriginListen = () => {
    Tts.stop();
    Tts.setDefaultLanguage('ko-KR');
    // Tts.setDefaultRate(0.5);
    Tts.getInitStatus().then(() => {
      Tts.speak(this.state.question);
    });
    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
  }
}

function ResultRender({question, voice}) {
  const diff = new Diff();
  const textDiff = (voice !== "") ? diff.main(question, voice) : [];
  return (
    <Text>{
      textDiff.map((item, idx) => {
          if (item[0] === 0) {
            return <Text key={idx} style={styles.successText}>{item[1]}</Text>
          } else if (item[0] === 1) {
            return <Text key={idx} style={styles.errorText}>{item[1][1]}</Text> 
          }else {
            return <Text key={idx} style={styles.errorText}>{item[1]}</Text> 
          }
        }
      )
    }</Text>
  );
}

class UselessTextInput extends React.Component {
  render() {
    return (
      <TextInput
        {...this.props}
        editable = {true}
        maxLength = {120}
      />
    );
  }
}

class UselessTextInputMultiline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  // If you type something in the text box that is a color, the background will change to that
  // color.
  render() {
    return (
     <View style={styles.uselessTextInput}
     >
       <TextInput
         onChangeText={(text) => this.setState({text})}
       />
     </View>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
      fontSize: 20,
      fontWeight: '700',
      margin: 20,
      marginBottom: 10,
  },
  subTtitleStyle: {
      fontSize: 14,
      fontWeight: '700',
      margin: 20,
      marginTop: 0,
  },
  uselessTextInput: {
      fontSize: 14,
      margin: 20,
      borderBottomColor: '#000000',
      borderBottomWidth: 2
  },
  rowContainer: {
    margin: 8,
    flexDirection: "row",
    justifyContent: "center"
  }, 
  scoreStyle: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 32,
    fontWeight: "700",
  },
  resultStyle: {
    margin: 20,
    marginTop: 0,
  },
  successText: {
    color: "#2196f3"
  },
  errorText: {
    color: "#f44336"
  },
});