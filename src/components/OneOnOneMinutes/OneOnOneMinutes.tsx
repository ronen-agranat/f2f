import React, {ChangeEvent} from 'react';
import PropTypes from 'prop-types';

import OneOnOneNotes from "./OneOnOneNotes/OneOnOneNotes";
import styles from './OneOnOneMinutes.module.css'

interface OneOnOneMinutesProps {
  date: string;
  id: number;
  followUpsChanged: (id: number, event: ChangeEvent<HTMLTextAreaElement>) => void;
  nextTimeChanged: (id: number, event: ChangeEvent<HTMLTextAreaElement>) => void;
  newBusinessChanged: (id: number, event: ChangeEvent<HTMLTextAreaElement>) => void;
  followUps: string;
  newBusiness: string;
  nextTime: string;
}

const OneOnOneMinutes = (props: OneOnOneMinutesProps) => {
  return (
    <div className={styles.OneOnOneMinutes}>
      <div>{props.date}</div>
      <OneOnOneNotes followUps={props.followUps} followUpsChanged={(event: ChangeEvent<HTMLTextAreaElement>) => { props.followUpsChanged(props.id, event)} }
                     newBusiness={props.newBusiness} newBusinessChanged={(event: ChangeEvent<HTMLTextAreaElement>) => { props.newBusinessChanged(props.id, event)} }
                     nextTime={props.nextTime} nextTimeChanged={(event: ChangeEvent<HTMLTextAreaElement>) => { props.nextTimeChanged(props.id, event) }} />
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