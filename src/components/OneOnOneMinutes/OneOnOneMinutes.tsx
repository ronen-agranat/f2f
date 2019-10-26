import React, {ChangeEvent, useState} from "react";
import PropTypes from "prop-types";

import OneOnOneNotes from "./OneOnOneNotes/OneOnOneNotes";
import styles from "./OneOnOneMinutes.module.css";

interface IOneOnOneMinutesProps {
  date: string;
  id: number;
  followUpsChanged: (
    id: number,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  nextTimeChanged: (
    id: number,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  newBusinessChanged: (
    id: number,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  followUps: string;
  newBusiness: string;
  nextTime: string;
}

const NOTE_AREAS = {
  followUps: 'followUps',
  newBusiness: 'newBusiness',
  nextTime: 'nextTime'
};

// TODO: Show time since now so that you can easily say 'we met last week' or 'its been a while'
const OneOnOneMinutes = (props: IOneOnOneMinutesProps) => {
  const [currentNotes, setCurrentNotes] = useState("followUps");

  return (
    <div className={styles.OneOnOneMinutes}>
      <div className={styles.dateHeader}>{props.date}</div>
      <div className={styles.Notepad}>
        <OneOnOneNotes
          title="Follow-ups"
          notes={props.followUps}
          notesChanged={(event: ChangeEvent<HTMLTextAreaElement>) => {
            props.followUpsChanged(props.id, event);
          }}
          active={currentNotes === NOTE_AREAS.followUps}
          focused={() => {
            setCurrentNotes(NOTE_AREAS.followUps);
          }}
        />
        <OneOnOneNotes
          title="New Business"
          notes={props.newBusiness}
          notesChanged={(event: ChangeEvent<HTMLTextAreaElement>) => {
            props.newBusinessChanged(props.id, event);
          }}
          active={currentNotes === NOTE_AREAS.newBusiness}
          focused={() => {
            setCurrentNotes(NOTE_AREAS.newBusiness);
          }}
        />
        <OneOnOneNotes
          title="Next time"
          notes={props.nextTime}
          notesChanged={(event: ChangeEvent<HTMLTextAreaElement>) => {
            props.nextTimeChanged(props.id, event);
          }}
          active={currentNotes === NOTE_AREAS.nextTime}
          focused={() => {
            setCurrentNotes(NOTE_AREAS.nextTime);
          }}
        />
      </div>
    </div>
  );
};

OneOnOneMinutes.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  followUpsChanged: PropTypes.func.isRequired,
  newBusinessChanged: PropTypes.func.isRequired,
  nextTimeChanged: PropTypes.func.isRequired,
  followUps: PropTypes.string.isRequired,
  newBusiness: PropTypes.string.isRequired,
  nextTime: PropTypes.string.isRequired
};

export default OneOnOneMinutes;
