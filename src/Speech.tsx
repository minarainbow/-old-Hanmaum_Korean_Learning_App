import * as React from "react";
import Voice from "@react-native-community/voice";
import Tts from "react-native-tts";
import Diff from "text-diff";

import { View, StyleSheet, Text } from "react-native";
import { Card, Button } from "react-native-material-ui";
import { Dropdown } from "react-native-material-dropdown";

import AudioRecorderPlayer from 'react-native-audio-recorder-player';


interface Props {}
interface State {
  isRecord: boolean;
  isRecordB: boolean;
  voice: string;
  question: string;
  total: number;
  selectedSpeed: number;
  recordSecs: any; 
  recordTime: any;
  currentPositionSec: any;
  currentDurationSec: any;
}
export default class App extends React.Component<Props, State> {
  audioRecorderPlayer = new AudioRecorderPlayer();

  constructor(props: Props) {
    super(props);

    this.state = {
      isRecord: false,
      isRecordB: false,
      voice: "",
      question: "",
      total: 0,
      selectedSpeed: 0.6,
      recordSecs: 0,
      recordTime: 0,
      currentPositionSec: 0,
      currentDurationSec: 0
    };

    Voice.onSpeechStart = this._onSpeechStart;
    Voice.onSpeechEnd = this._onSpeechEnd;
    Voice.onSpeechResults = this._onSpeechResults;
    Voice.onSpeechError = this._onSpeechError;
  }

  componentWillMount() {
    this.setState({
      question:
        "1947년 사해 두루마리가 발견되었을 때 고고학자들은 새 문서가 발견될 때마다 발견자에게 보상을 주기 시작했습니다"
    });
  }

  render() {
    const { isRecord, isRecordB, question, voice, total, selectedSpeed } = this.state;
    const buttonLabel = isRecord ? "중지" : "읽기평가";
    const buttonIcon = isRecord ? "mic-off" : "mic";
    const buttonLabelB = isRecordB ? "중지" : "녹음";
    const buttonIconB = isRecordB ? "mic-off" : "mic";
    const eventB = isRecordB ? this.onStartRecord : this.onStopRecord; 
    const voiceLabel = voice
      ? voice
      : isRecord
      ? "무엇이든 말해보세요..."
      : "press Start button";
    const totalLabel = Number(total.toFixed(1));
    let speed = [{
      label: 'x0.5',
      value: 0.4
    }, {
      label: 'x1.0',
      value: 0.6
    }, {
      label: 'x1.5',
      value: 0.7
    }, {
      label: 'x2.0',
      value: 0.8
    }];
    return (
      <Card>
        <Text style={styles.titleStyle}>
          [ 한국어 읽기(올바르게 발음하기) 평가 ]
        </Text>
        <Text style={styles.subTtitleStyle}>
          1. 아래의 한국어 문장을 (필요하면 몇 번 들어본 후) 올바르게 발음하면서
          큰소리로 읽으시오.
        </Text>
        <Text style={styles.contentStyle}>{question}</Text>
        <Text style={styles.resultStyle}>
          <ResultRender question={question} voice={voice} />
        </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.scoreStyle}>{(voice !== "") ? Math.round(total)+" 점" : ""}</Text>
        </View>
        <View style={styles.rowContainer}>
        <View style={styles.dropdown}>
          <Dropdown
            label='Speed'
            data={speed}
            value={selectedSpeed}
            onChangeText={this._onChangeText}
          />
          </View>
          <View style={styles.button}>
            <Button
              primary
              icon="radio"
              onPress={this._onOriginListen}
              text="원본 듣기연습"
            />
          </View>
          <View style={styles.button}>
            <Button
              primary
              icon={buttonIcon}
              onPress={this._onRecordVoice}
              text={buttonLabel}
            />
          </View>
          <View style={styles.button}>
            <Button
              primary
              icon={buttonIconB}
              onPress={this.onRecordButton}
              text={buttonLabelB}
            />
          </View>
          <View style={styles.button}>
            <Button
              primary
              icon="radio"
              onPress={this.onStartPlay}
              text="녹음듣기"
            />
          </View>

        </View>
      </Card>
    );
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  private _onSpeechStart = event => {
    console.log("onSpeechStart");
    this.setState({
      voice: ""
    });
  };
  private _onSpeechEnd = event => {
    console.log("onSpeechEnd");
  };
  private _onSpeechResults = event => {
    console.log("onSpeechResults");
    const diff = new Diff();
    var result = "";
    var total = 0;
    const textDiff = diff.main(this.state.question, event.value[0]);
    const wordScore = 100 / this.state.question.length;
    console.log("question", this.state.question);
    console.log("voice", event.value[0]);
    textDiff.forEach(element => {
      if (element[0] === 0) {
        result += element[1];
        total += wordScore * element[1].length;
      }
    });
    console.log("total", total);
    this.setState({
      total: total,
    });
    this.setState({
      voice: event.value[0]
    });
  };
  private _onSpeechError = event => {
    console.log("_onSpeechError");
    console.log(event.error);
  };

  private _onChangeText = (value) => {
    this.setState({
      selectedSpeed: value
    });
  }

  private _onRecordVoice = () => {
    const { isRecord } = this.state;
    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start("ko-KR");
    }
    this.setState({
      isRecord: !isRecord
    });
  };

  private _onOriginListen = () => {
    Tts.stop();
    console.log(this.state.selectedSpeed);
    Tts.setDefaultRate(this.state.selectedSpeed);
    Tts.setDefaultLanguage("ko-KR");
    Tts.getInitStatus().then(() => {
      Tts.speak(this.state.question);
    });
    Tts.addEventListener("tts-start", event => console.log("start", event));
    Tts.addEventListener("tts-finish", event => console.log("finish", event));
    Tts.addEventListener("tts-cancel", event => console.log("cancel", event));
  };

  private onRecordButton = async () => {
    const { isRecordB } = this.state;
    if (isRecordB) {
      this.onStopRecord();
    } else {
     this.onStartRecord();
    }
    this.setState({
      isRecordB: !isRecordB
    });
  }
  onStartRecord = async () => {
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
      return;
    });
    console.log(result);
  }
  
  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);

  }
  
  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await this.audioRecorderPlayer.startPlayer();
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration
      });
      return;
    });
  }
  
  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  }
  
  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
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

const styles = StyleSheet.create({
  successText: {
    color: "#2196f3"
  },
  errorText: {
    color: "#f44336"
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "700",
    margin: 20,
    marginBottom: 10
  },
  subTtitleStyle: {
    fontSize: 14,
    fontWeight: "700",
    margin: 20,
    marginTop: 0
  },
  contentStyle: {
    fontSize: 14,
    padding: 20,
    margin: 20,
    marginTop: 0,
    backgroundColor: "#e0e0e0"
  },
  rowContainer: {
    margin: 8,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    marginHorizontal: 5
  },
  dropdown: {
    width: 80,
    bottom: 25,
    marginLeft: 15
  },
  resultStyle: {
    margin: 20,
    marginTop: 0,
  },
  scoreStyle: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 32,
    fontWeight: "700",
  }
});
