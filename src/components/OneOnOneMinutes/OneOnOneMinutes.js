import React from 'react';
import PropTypes from 'prop-types';

import OneOnOneNotes from "./OneOnOneNotes/OneOnOneNotes";
import styles from './OneOnOneMinutes.module.css'

const OneOnOneMinutes = (props) => {
  return (
    <div className={styles.OneOnOneMinutes}>
      <div>{props.date}</div>
      <OneOnOneNotes followUps={props.followUps} followUpsChanged={(event) => props.followUpsChanged(props.id, event)}
                     newBusiness={props.newBusiness} newBusinessChanged={(event) => props.newBusinessChanged(props.id, event)}
                     nextTime={props.nextTime} nextTimeChanged={(event) => props.nextTimeChanged(props.id, event)} />
    </div>
  );
}

OneOnOneMinutes.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  followUpsChanged: PropTypes.func.isRequired,
  newBusinessChanged: PropTypes.func.isRequired,
  nextTimeChanged: PropTypes.func.isRequired,
  followUps: PropTypes.string.isRequired,
  newBusiness: PropTypes.string.isRequired,
  nextTime: PropTypes.string.isRequired
}

export default OneOnOneMinutes;