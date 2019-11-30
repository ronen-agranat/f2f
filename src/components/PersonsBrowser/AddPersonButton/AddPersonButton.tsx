import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'
//interface AddPersonButtonProps = {}
import styles from './AddPersonButton.module.css';

export const AddPersonButton = (/* props: AddPersonButtonProps */) => {
  return <div className={styles.AddPersonButton}>
    <Link to="persons/create">Add person</Link>
  </div>;
};

// AddPersonButton.PropTypes = {}
