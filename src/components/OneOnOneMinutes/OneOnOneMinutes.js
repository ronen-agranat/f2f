import React from 'react';
import PropTypes from 'prop-types';

import styles from './OneOnOneMinutes.module.css'

const OneOnOneMinutes = (props) => {
  const notesChanged = React.useCallback((event) => {
    props.notesChanged(props.id, props.date, event.target.value);
  }, [props]);

  return (
    <div className={styles.OneOnOneMinutes}>
      <p>{props.date}</p>
      <textarea onChange={notesChanged} value={props.notes} />
    </div>
  );
}

OneOnOneMinutes.propTypes = {
  date: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  notesChanged: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default OneOnOneMinutes;