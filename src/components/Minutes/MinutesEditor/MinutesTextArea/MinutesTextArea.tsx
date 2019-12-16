import React, { ChangeEvent, forwardRef, Ref, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './MinutesTextArea.module.css';

import { parseInputText } from '../../../../lib/TextUtils';

interface IOneOnOneProps {
  notesChanged: (text: string) => void;
  notes: string;
  title: string;
  active: boolean;
  focused: () => void;
}

const BULLET_CHARACTERS = ['-', '•', '*'];

// Parse text before output (div)
// Given notes text, render a markdown-like rendition
// "Output filter"
const parseNotesText = (text: string): string => {
  let newText = text;
  newText = newText.replace(/^(\s*)[-*]/mg, `$1${BULLET_CHARACTERS[0]}`);
  return newText;
};

const MinutesTextArea = forwardRef((props: IOneOnOneProps, ref: Ref<HTMLTextAreaElement>) => {
  const [notesValue, setNotesValue] = useState(props.notes);

  const noteArea = props.active ? (
    <textarea
      ref={ref}
      className={styles.TextAreaEdit}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
        // Indent level

        // Only maintain indent if string is getting longer (enter not backspace)
        if (event.target.value > notesValue) {
          props.notesChanged(parseInputText(event.target.value));
          setNotesValue(parseInputText(event.target.value));
        } else {
          props.notesChanged(event.target.value);
          setNotesValue(event.target.value);
        }
      }}
      value={notesValue}
      placeholder={props.title}
    />
  ) : (
    <div className={styles.TextAreaShow} onClick={props.focused}>
      {Boolean(notesValue.length) ? parseNotesText(notesValue) : props.title}
    </div>
  );

  return (
    <div>
      <h4>{props.title}</h4>
      <div className={styles.MinutesTextArea}>{noteArea}</div>
    </div>
  );
});

MinutesTextArea.propTypes = {
  notesChanged: PropTypes.func.isRequired,
  notes: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  focused: PropTypes.func.isRequired,
};

export default MinutesTextArea;
