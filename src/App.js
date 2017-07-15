import React, { Component } from 'react';
import RecordRTC from 'recordrtc';

import SentencesList from './containers/SentensesList/SentencesList';
import Controls from './containers/Controls/Controls';
import sentences from './assets/text/sentences';
import Recorder from './components/Recorder/Recorder';
import captureAudio from './utils/audio';

const timePerSentence = 10000;

class App extends Component {
  constructor(props) {
    super(props);

    this.startRecording = this.startRecording.bind(this);
    this.stopRecord = this.stopRecord.bind(this);

    this.highlightNextSentence = this.highlightNextSentence.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.play = this.play.bind(this);

    this.state = {
      highlightedIndex: -1,
      buttons: [
        { label: 'Record', onClick: this.startRecording, disabled: false },
        { label: 'Play', onClick: this.play, disabled: true },
        { label: 'Save', onClick: this.save, disabled: true, link: true },
      ],
      recording: null,
      src: '#',
      recordAudio: null,
    };
  }

  componentDidMount() {
    this.requestUserMedia();
  }

  requestUserMedia() {
    captureAudio((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }

  handleClick(e) {
    e.preventDefault();

    const buttons = this.state.buttons.map(b => ({ ...b, disabled: true }));

    this.setState({ buttons });
  }

  enableButtons() {
    const buttons = this.state.buttons.map(b => ({ ...b, disabled: false }));

    this.setState({ buttons });
  }

  startRecording(e) {
    this.handleClick(e);

    this.highlightNextSentence(this.stopRecord);

    captureAudio((stream) => {
      const recordAudio = RecordRTC(stream, { type: 'audio' });
      recordAudio.startRecording();

      this.setState({ recordAudio });
    });
  }

  stopRecord() {
    const { recordAudio } = this.state;

    recordAudio.stopRecording(() => {
      recordAudio.getDataURL((dataUrl) => {
        this.setState({ src: dataUrl });
      });
    });
  }

  highlightNextSentence(onComplete = null) {
    let i = this.state.highlightedIndex + 1;
    this.setState({ highlightedIndex: i });

    i += 1;

    if (i <= sentences.length) {
      setTimeout(() => this.highlightNextSentence(onComplete), timePerSentence);
    } else {
      this.enableButtons();
      this.setState({ highlightedIndex: -1 });

      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  }

  play(e) {
    this.handleClick(e);
    this.highlightNextSentence();
    document.getElementById('audio').play();
  }

  save(e) {
    this.handleClick(e);

    // TODO: Save to server
  }

  render() {
    const { highlightedIndex, buttons, src } = this.state;

    return (
      <div className="app">
        <p>Time per sentence: {timePerSentence / 1000} sec.</p>
        <SentencesList highlightedIndex={highlightedIndex} sentences={sentences} />
        <Controls buttons={buttons} record={this.record} downloadUrl={src} />
        <Recorder src={src} />
      </div>
    );
  }
}

export default App;
