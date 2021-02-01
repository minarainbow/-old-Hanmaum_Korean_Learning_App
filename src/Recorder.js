import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

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
      currentDurationSec: e.duration,
      playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
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

