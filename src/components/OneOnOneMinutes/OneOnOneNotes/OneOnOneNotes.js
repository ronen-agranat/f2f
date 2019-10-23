import React from 'react';
import PropTypes from 'prop-types';
import styles from './OneOnOneNotes.module.css';

const OneOnOneNotes = (props) => {
  return (
    <div className={styles.OneOnOneNotes}>
      <textarea onChange={props.followUpsChanged} value={props.followUps} />
      <textarea onChange={props.newBusinessChanged} value={props.newBusiness} />
      <textarea onChange={props.nextTimeChanged} value={props.nextTime} />
    </div>
);
}

OneOnOneNotes.propTypes = {
  followUpsChanged: PropTypes.func.isRequired,
  newBusinessChanged: PropTypes.func.isRequired,
  nextTimeChanged: PropTypes.func.isRequired,
  followUps: PropTypes.string.isRequired,
  newBusiness: PropTypes.string.isRequired,
  nextTime: PropTypes.string.isRequired
}

export default OneOnOneNotes;
