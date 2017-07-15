import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecordRTC from 'recordrtc';

import Button from '../../components/Button/Button';
import captureAudio from '../../utils/audio';
import './styles.css';
import Recorder from '../../components/Recorder/Recorder';

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.startRecording = this.startRecording.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.play = this.play.bind(this);
    this.enableButtons = this.enableButtons.bind(this);

    this.state = {
      buttons: [
        { label: 'Record', onClick: this.startRecording, disabled: false },
        { label: 'Play', onClick: this.play, disabled: true },
        { label: 'Save', onClick: this.save, disabled: true, link: true },
      ],
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

    this.props.highlightNextSentence(this.stopRecord);

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

    this.enableButtons();
  }

  play(e) {
    this.handleClick(e);
    this.props.highlightNextSentence(this.enableButtons);
    document.getElementById('audio').play();
  }

  save(e) {
    this.handleClick(e);

    // TODO: Save to server
  }

  render() {
    const { downloadUrl, buttons, src } = this.state;

    return (
      <div className="controls">
        {buttons.map(b => (
          <Button key={b.label} {...b} src={downloadUrl} />
        ))}
        <Recorder src={src} />
      </div>
    );
  }
}

Controls.propTypes = {
  highlightNextSentence: PropTypes.func.isRequired,
};
