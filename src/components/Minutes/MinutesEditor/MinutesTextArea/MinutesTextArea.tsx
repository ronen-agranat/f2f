import React, { ChangeEvent, forwardRef, Ref } from 'react';
import PropTypes from 'prop-types';

import styles from './MinutesTextArea.module.css';

interface IOneOnOneProps {
  notesChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  notes: string;
  title: string;
  active: boolean;
  focused: () => void;
}

// Given notes text, render a markdown-like rendition
const parseNotesText = (text: string): string => {
  let newText = text;
  newText = newText.replace(/^(\s*)[-*]/mg, '$1•');
  return newText;
};

const MinutesTextArea = forwardRef((props: IOneOnOneProps, ref: Ref<HTMLTextAreaElement>) => {
  const noteArea = props.active ? (
    <textarea
      ref={ref}
      className={styles.TextAreaEdit}
      onChange={props.notesChanged}
      value={props.notes}
      placeholder={props.title}
    />
  ) : (
    <div className={styles.TextAreaShow} onClick={props.focused}>
      {Boolean(props.notes.length) ? parseNotesText(props.notes) : props.title}
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
