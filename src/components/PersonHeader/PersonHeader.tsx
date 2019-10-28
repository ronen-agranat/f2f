import React from "react";
import styles from "./PersonHeader.module.css";

interface IPersonHeaderProps {
  name: string;
  role: string;
}

const PersonHeader = (props: IPersonHeaderProps) => {
  return (
    <div className={styles.PersonHeader}>
      <div>ProfilePic</div>
      <div>{props.name}</div>
      <div>{props.role}</div>
    </div>
  );
};

export default PersonHeader;
