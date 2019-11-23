import React from 'react';
import PropTypes from 'prop-types';
import styles from './PersonHeader.module.css';
import { Link } from 'react-router-dom';

interface IPersonHeaderProps {
  name?: string;
  role?: string;
  imageUrl?: string;
  id?: number;
}

const PersonHeader = (props: IPersonHeaderProps) => {
  const imageAltText = 'Profile image';

  return (
    <div className={styles.PersonHeader}>
      {Boolean(props.imageUrl) ? (
        <img src={props.imageUrl} alt={imageAltText}/>
      ) : null}
      <Link to={`/persons/${props.id}`}>
        {Boolean(props.name) ? <div>{props.name}</div> : null}
      </Link>
      {Boolean(props.role) ? <div>{props.role}</div> : null}
    </div>
  );
};

PersonHeader.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  imageUrl: PropTypes.string,
  id: PropTypes.number,
};

export default PersonHeader;
