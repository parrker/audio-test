import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Button = (props) => {
  const { label, onClick, disabled, link, src } = props;

  if (link === true) {
    return (
      <a
        href={src}
        className="button"
        download="audio.webm"
        disabled={disabled}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      className="button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  link: PropTypes.bool,
  src: PropTypes.string,
};

Button.defaultProps = {
  link: false,
  src: '',
};

export default Button;
