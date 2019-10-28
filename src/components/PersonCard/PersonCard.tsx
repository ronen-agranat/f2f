import React from "react";
import PersonHeader from "../PersonHeader/PersonHeader";
import OneOnOneBrowser from "../OneOnOneBrowser/OneOnOneBrowser";

import styles from "./PersonCard.module.css";

const PersonCard = () => {
  return (
    <div className={styles.PersonCard}>
      <PersonHeader name="Tamzon Agranat" role="Fraud Analyst"/>
      <OneOnOneBrowser />
    </div>
  );
};

export default PersonCard;
