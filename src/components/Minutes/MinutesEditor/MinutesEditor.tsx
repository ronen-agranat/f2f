import React, {ChangeEvent, useState} from "react";
import PropTypes from "prop-types";

import MinutesTextArea from './MinutesTextArea/MinutesTextArea';
import styles from './MinutesEditor.module.css';

import { NOTE_AREAS } from './NoteAreas';

interface IOneOnOneMinutesProps {
  date: string;
  id: number;
  notesChanged: (
    id: number,
    event: ChangeEvent<HTMLTextAreaElement>,
    textAreaName: string,
  ) => void;
  followUps: string;
  newBusiness: string;
  nextTime: string;
}

// TODO: Show time since now so that you can easily say 'we met last week' or 'its been a while'
const MinutesEditor = (props: IOneOnOneMinutesProps) => {
  const [currentNotes, setCurrentNotes] = useState("followUps");

  const textAreasToRender = [NOTE_AREAS.followUps, NOTE_AREAS.newBusiness, NOTE_AREAS.nextTime];

  const textAreas = textAreasToRender.map((textArea) => {
    return <MinutesTextArea
      title={textArea.displayName}
      notes={props.followUps}
      key={`textarea_${props.id}_${textArea.name}`}
      notesChanged={(event: ChangeEvent<HTMLTextAreaElement>) => {
        props.notesChanged(props.id, event, textArea.name);
      }}
      active={currentNotes === textArea.name}
      focused={() => {
        setCurrentNotes(textArea.name);
      }}
    />;
  });

  return (
    <div className={styles.MinutesEditor}>
      <div className={styles.dateHeader}>{props.date}</div>
      <div className={styles.Notepad}>
        {textAreas}
      </div>
    </div>
  );
};

MinutesEditor.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  notesChanged: PropTypes.func.isRequired,
  followUps: PropTypes.string.isRequired,
  newBusiness: PropTypes.string.isRequired,
  nextTime: PropTypes.string.isRequired
};

export default MinutesEditor;
