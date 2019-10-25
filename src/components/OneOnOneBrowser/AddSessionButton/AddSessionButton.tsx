import React, { MouseEvent } from 'react';
import PropTypes from 'prop-types';

interface AddSessionProps {
  onSessionAdded: (event: MouseEvent) => void;
}

const AddSessionButton = (props: AddSessionProps) => {
  return (
    <button onClick={props.onSessionAdded}>+</button>
  );
};

AddSessionButton.propTypes = {
  onSessionAdded: PropTypes.func.isRequired
}

export default AddSessionButton;