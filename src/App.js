import React, { Component } from 'react';

import SentencesList from './components/SentencesList/SentencesList';
import Controls from './containers/Controls/Controls';
import sentences from './assets/text/sentences';

const timePerSentence = 10000; // milliseconds

class App extends Component {
  constructor(props) {
    super(props);

    this.highlightNextSentence = this.highlightNextSentence.bind(this);

    this.state = {
      highlightedIndex: -1,
    };
  }

  highlightNextSentence(onComplete = null) {
    let i = this.state.highlightedIndex + 1;
    this.setState({ highlightedIndex: i });

    i += 1;

    if (i <= sentences.length) {
      setTimeout(() => this.highlightNextSentence(onComplete), timePerSentence);
    } else {
      this.setState({ highlightedIndex: -1 });

      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  }

  render() {
    const { highlightedIndex } = this.state;

    return (
      <div className="app">
        <p>Time per sentence: {timePerSentence / 1000} sec.</p>
        <SentencesList highlightedIndex={highlightedIndex} sentences={sentences} />
        <Controls highlightNextSentence={this.highlightNextSentence} />
      </div>
    );
  }
}

export default App;
