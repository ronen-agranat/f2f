import React, { ChangeEvent } from "react";
import PropTypes from "prop-types";

interface IOneOnOneProps {
  notesChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  notes: string;
  title: string;
}

const OneOnOneNotes = (props: IOneOnOneProps) => {
  return (
    <div>
      <p>{props.title}</p>
      <textarea onChange={props.notesChanged} value={props.notes}/>
    </div>
  );
};

OneOnOneNotes.propTypes = {
  notesChanged: PropTypes.func.isRequired,
  notes: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default OneOnOneNotes;
