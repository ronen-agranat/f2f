import React, { ChangeEvent, createRef, RefObject, useEffect, useState } from 'react';
import PropTypes from "prop-types";

import MinutesTextArea from './MinutesTextArea/MinutesTextArea';
import styles from './MinutesEditor.module.css';

class NoteArea {
  constructor(name: string, displayName: string) {
    this.name = name;
    this.displayName = displayName;
    this.ref = createRef<HTMLTextAreaElement>();
  }

  readonly name: string;
  readonly displayName: string;
  readonly ref: RefObject<HTMLTextAreaElement>;
}

const noteAreas = new Map<string, NoteArea>();
const followUps = new NoteArea('followUps', 'Follow-ups');
const nextTime = new NoteArea('nextTime', 'Next time');
const newBusiness = new NoteArea('newBusiness', 'New business');
noteAreas.set('followUps', followUps);
noteAreas.set('nextTime', nextTime);
noteAreas.set('newBusiness', newBusiness);

interface IOneOnOneMinutesProps {
  date: string;
  id: number;
  notesChanged: (
    id: number,
    event: ChangeEvent<HTMLTextAreaElement>,
    textAreaName: string,
  ) => void;
  values: Map<string, string>;
}

// TODO: Show time since now so that you can easily say 'we met last week' or 'its been a while'
const MinutesEditor = (props: IOneOnOneMinutesProps) => {
  const [currentNotes, setCurrentNotes] = useState<NoteArea>(followUps);

  const textAreasToRender = [followUps, newBusiness, nextTime];

  // When the selected text area changes ...
  useEffect(() => {
    const current = currentNotes.ref.current;
    if (current) {
      // Focus the text area
      current.focus();

      // Move caret to end
      let selectionPosition = 0;
      const currentNotesValue = props.values.get(currentNotes.name);
      if (currentNotesValue) {
        selectionPosition = currentNotesValue.length;
      }
      current.selectionStart = selectionPosition;
      current.selectionEnd = selectionPosition;

      // Scroll to bottom
      current.scrollTop = current.scrollHeight;
    }
  }, [currentNotes, props.values]);

  const textAreas = textAreasToRender.map((textArea) => {
    return <MinutesTextArea
      ref={textArea.ref}
      title={textArea.displayName}
      notes={props.values.get(textArea.name) || ''}
      key={`textarea_${props.id}_${textArea.name}`}
      notesChanged={(event: ChangeEvent<HTMLTextAreaElement>) => {
        props.notesChanged(props.id, event, textArea.name);
      }}
      active={currentNotes === textArea}
      focused={() => {
        setCurrentNotes(textArea);
      }}
    />;
  });

  return (
    <div className={styles.MinutesEditor}>
      <h3 className={styles.dateHeader}>{props.date}</h3>
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
  values: PropTypes.object.isRequired,
};

export default MinutesEditor;
