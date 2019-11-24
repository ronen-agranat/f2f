import React, { MouseEvent } from 'react';
import PropTypes from 'prop-types';

interface AddSessionProps {
  onSessionAdded: (event: MouseEvent) => void;
}

const NewMinutesButton = (props: AddSessionProps) => {
  return <button onClick={props.onSessionAdded}>+ Add Minutes</button>;
};

NewMinutesButton.propTypes = {
  onSessionAdded: PropTypes.func.isRequired,
};

export default NewMinutesButton;
