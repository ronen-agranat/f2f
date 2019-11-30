import React, { MouseEvent } from 'react';
import PropTypes from 'prop-types';
import styles from './NewMinutesButton.module.css';

interface AddSessionProps {
  onSessionAdded: (event: MouseEvent) => void;
}

const NewMinutesButton = (props: AddSessionProps) => {
  return <div
    className={styles.NewMinutesButton}
    onClick={props.onSessionAdded}>+ Add Minutes</div>;
};

NewMinutesButton.propTypes = {
  onSessionAdded: PropTypes.func.isRequired,
};

export default NewMinutesButton;
