import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button/Button';
import './styles.css';

const Controls = (props) => {
  const { buttons, downloadUrl } = props;

  return (
    <div className="controls">
      {buttons.map(b => (
        <Button key={b.label} {...b} src={downloadUrl} />
      ))}
    </div>
  );
};

Controls.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  downloadUrl: PropTypes.string.isRequired,
};

export default Controls;
