import React from 'react';
import PersonHeader from "../PersonHeader/PersonHeader";
import OneOnOneBrowser from "../OneOnOneBrowser/OneOnOneBrowser";

import styles from './PersonCard.module.css';

const PersonCard = () => {
  return (
    <div className={styles.PersonCard}>
      <PersonHeader/>
      <OneOnOneBrowser/>
    </div>
  )
};

export default PersonCard;