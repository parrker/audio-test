import React from 'react';
import PropTypes from 'prop-types';

import Sentence from './Sentence/Sentence';

const SentencesList = (props) => {
  const { sentences, highlightedIndex } = props;

  return (
    <div className="sentences">
      {sentences.map((text, order) => (
        <Sentence
          key={order}
          order={order}
          text={text}
          highlightedIndex={order === highlightedIndex}
        />
      ))}
    </div>
  );
};

SentencesList.propTypes = {
  sentences: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlightedIndex: PropTypes.number.isRequired,
};

export default SentencesList;
