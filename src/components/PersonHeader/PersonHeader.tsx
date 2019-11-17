import React from 'react';
import PropTypes from 'prop-types';
import styles from './PersonHeader.module.css';

interface IPersonHeaderProps {
  name?: string;
  role?: string;
  imageUrl?: string;
}

const PersonHeader = (props: IPersonHeaderProps) => {
  const imageAltText = 'Profile image';

  return (
    <div className={styles.PersonHeader}>
      {Boolean(props.imageUrl) ? <img src={props.imageUrl} alt={imageAltText}/> : null}
      {Boolean(props.name) ? <div>{props.name}</div> : null}
      {Boolean(props.role) ? <div>{props.role}</div> : null}
    </div>
  );
};

PersonHeader.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default PersonHeader;
