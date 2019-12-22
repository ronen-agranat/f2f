import React, { ChangeEvent, KeyboardEvent, forwardRef, Ref, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './MinutesTextArea.module.css';

import {
  parseInputText,
  positionOfLineStart,
} from '../../../../lib/TextUtils';

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
  newText = newText.replace(/^(\s*)[-*]/gm, `$1${BULLET_CHARACTERS[0]}`);
  return newText;
};

const MinutesTextArea = forwardRef(
  (props: IOneOnOneProps, ref: Ref<HTMLTextAreaElement>) => {
    const [notesValue, setNotesValue] = useState(props.notes);

    const onKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Tab') {
        event.preventDefault();

        if (ref && typeof ref === 'object') {
          if (ref.current) {
            // Handling keypress goes here
            let text = ref.current.value;
            const selectionStart = ref.current.selectionStart;

            const lineStart = positionOfLineStart(text, selectionStart);

            let prefix = text.slice(0, lineStart);
            prefix = prefix.concat('  ');
            const suffix = text.slice(lineStart);
            const newText = prefix.concat(suffix);

            updateNoteValue(newText);

            ref.current.value = newText;
            ref.current.selectionStart = ref.current.selectionEnd =
              selectionStart + 2;
          }
        }

      }
    };

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      // Indent level
      let text = event.target.value;

      const selectionStart = event.target.selectionStart;
      let indentLevel = 0;
      let addedIndent = false;
      // Only maintain indent if string is getting longer (enter not backspace)
      if (text.length > notesValue.length) {
        // Only the part of the text up until the cursor should be processed
        let prefix = text.slice(0, selectionStart);
        let suffix = text.slice(selectionStart);
        [text, indentLevel, addedIndent] = parseInputText(prefix);
        text = text.concat(suffix);
      }

      updateNoteValue(text);

      if (addedIndent) {
        // Restore caret position
        if (ref && typeof ref === 'object') {
          if (ref.current) {
            ref.current.value = text;
            ref.current.selectionStart = ref.current.selectionEnd =
              selectionStart + indentLevel;
          }
        }
      }
    };

    const updateNoteValue = (text: string) => {
      // Invoke outer component's change handler
      props.notesChanged(text);
      // Update internal state (controlled component)
      setNotesValue(text);
    };

    const noteArea = props.active ? (
      <textarea
        ref={ref}
        className={styles.TextAreaEdit}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
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
  },
);

MinutesTextArea.propTypes = {
  notesChanged: PropTypes.func.isRequired,
  notes: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  focused: PropTypes.func.isRequired,
};

export default MinutesTextArea;
