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
  restoreSelection: (position: number) => void;
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

    const noteArea = props.active ? (
      <textarea
        ref={ref}
        className={styles.TextAreaEdit}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
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

          props.notesChanged(text);
          setNotesValue(text);

          if (addedIndent) {
            // FIXME: There is an edge case here that is not functioning correctly.
            // It is not getting invoked when on the last two lines:
            // - select last character position
            // click bullet on previous line
            // press enter
            // indent is created
            // but position is not restored

            // Restore the selection of the caret
            // props.restoreSelection(selectionStart + indentLevel);
            if (ref && typeof ref === 'object') {
              if (ref.current) {
                ref.current.value = text;
                ref.current.selectionStart = ref.current.selectionEnd =
                  selectionStart + indentLevel;
              }
            }
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
