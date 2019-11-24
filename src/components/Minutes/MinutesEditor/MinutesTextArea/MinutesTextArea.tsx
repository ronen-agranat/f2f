import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';

import styles from './MinutesTextArea.module.css';

interface IOneOnOneProps {
  notesChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  notes: string;
  title: string;
  active: boolean;
  focused: () => void;
}

const MinutesTextArea = (props: IOneOnOneProps) => {
  const noteArea = props.active ? (
    <textarea
      className={styles.TextAreaEdit}
      onChange={props.notesChanged}
      value={props.notes}
      placeholder={props.title}
    />
  ) : (
    <div className={styles.TextAreaShow} onClick={props.focused}>
      {Boolean(props.notes.length) ? props.notes : props.title}
    </div>
  );

  return (
    <div>
      <p>{props.title}</p>
      <div className={styles.MinutesTextArea}>{noteArea}</div>
    </div>
  );
};

MinutesTextArea.propTypes = {
  notesChanged: PropTypes.func.isRequired,
  notes: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  focused: PropTypes.func.isRequired,
};

export default MinutesTextArea;
