import React, { ChangeEvent } from "react";
import PropTypes from "prop-types";
import styles from "./OneOnOneNotes.module.css";

interface IOneOnOneProps {
  followUpsChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  newBusinessChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  nextTimeChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  followUps: string;
  newBusiness: string;
  nextTime: string;
}

const OneOnOneNotes = (props: IOneOnOneProps) => {
  return (
    <div className={styles.OneOnOneNotes}>
      <div>
        <p>Follow-ups</p>
        <textarea onChange={props.followUpsChanged} value={props.followUps} />
      </div>
      <div>
        <p>New business</p>
        <textarea
          onChange={props.newBusinessChanged}
          value={props.newBusiness}
        />
      </div>
      <div>
        <p>Next time</p>
        <textarea onChange={props.nextTimeChanged} value={props.nextTime} />
      </div>
    </div>
  );
};

OneOnOneNotes.propTypes = {
  followUpsChanged: PropTypes.func.isRequired,
  newBusinessChanged: PropTypes.func.isRequired,
  nextTimeChanged: PropTypes.func.isRequired,
  followUps: PropTypes.string.isRequired,
  newBusiness: PropTypes.string.isRequired,
  nextTime: PropTypes.string.isRequired
};

export default OneOnOneNotes;
