import React from "react";
import styles from "./PersonHeader.module.css";

const PersonHeader = () => {
  return (
    <div className={styles.PersonHeader}>
      <div>ProfilePic</div>
      <div>Biscuit McDoogle</div>
      <div>Role</div>
    </div>
  );
};

export default PersonHeader;
