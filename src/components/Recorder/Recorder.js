import React from 'react';
import PropTypes from 'prop-types';

const Recorder = props => <audio src={props.src} id="audio" />;

Recorder.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Recorder;
