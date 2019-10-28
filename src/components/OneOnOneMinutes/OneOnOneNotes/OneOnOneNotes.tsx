import React, { ChangeEvent } from "react";
import PropTypes from "prop-types";

import styles from "./OneOnOneNotes.module.css";

interface IOneOnOneProps {
  notesChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  notes: string;
  title: string;
  active: boolean;
  focused: () => void;
}

const OneOnOneNotes = (props: IOneOnOneProps) => {
  const noteArea = props.active ? (
    <textarea
      className={styles.NoteAreaEdit}
      onChange={props.notesChanged}
      value={props.notes}
      placeholder={props.title}
    />
  ) : (
    <div className={styles.NoteAreaShow} onClick={props.focused}>
      {Boolean(props.notes.length) ? props.notes : props.title}
    </div>
  );

  return (
    <div>
      <p>{props.title}</p>
      <div className={styles.OneOnOneNotes}>
        {noteArea}
      </div>
    </div>
  );
};

OneOnOneNotes.propTypes = {
  notesChanged: PropTypes.func.isRequired,
  notes: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  focused: PropTypes.func.isRequired
};

export default OneOnOneNotes;
