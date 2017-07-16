import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Sentence = (props) => {
  const { order, text, highlightedIndex } = props;

  return (
    <div className="sentence">
      <h2>Sentence {order + 1}</h2>
      <p className={highlightedIndex ? 'highlighted' : ''}>
        {text}
      </p>
    </div>
  );
};

Sentence.propTypes = {
  order: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  highlightedIndex: PropTypes.bool.isRequired,
};

export default Sentence;
