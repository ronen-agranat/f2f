import React, { ChangeEvent } from "react";
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

const OneOnOneMinutes = (props: IOneOnOneMinutesProps) => {
  return (
    <div className={styles.OneOnOneMinutes}>
      <div>{props.date}</div>
      <div className={styles.Notepad}>
        <OneOnOneNotes
          title="Follow-ups"
          notes={props.followUps}
          notesChanged={(event: ChangeEvent<HTMLTextAreaElement>) => {
            props.followUpsChanged(props.id, event);
          }}
        />
        <OneOnOneNotes
          title="New Business"
          notes={props.newBusiness}
          notesChanged={(event: ChangeEvent<HTMLTextAreaElement>) => {
            props.newBusinessChanged(props.id, event);
          }}
        />
        <OneOnOneNotes
          title="Next time"
          notes={props.nextTime}
          notesChanged={(event: ChangeEvent<HTMLTextAreaElement>) => {
            props.nextTimeChanged(props.id, event);
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
