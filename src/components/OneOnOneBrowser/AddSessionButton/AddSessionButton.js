import React from 'react';
import PropTypes from 'prop-types';

const AddSessionButton = (props) => {
  return (
    <button onClick={props.onSessionAdded}>+</button>
  );
};

AddSessionButton.propTypes = {
  onSessionAdded: PropTypes.func.isRequired
}

export default AddSessionButton;