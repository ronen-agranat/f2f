import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './PersonHeader.module.css';
import { Link } from 'react-router-dom';
import FaceToFace from '../../../services/FaceToFace';

interface IPersonHeaderProps {
  name?: string;
  role?: string;
  imageUrl?: string;
  id: number;
  // TODO: These need to move out of here to edit controls for person / list of persons
  showDeletePerson?: boolean;
  personDeleted?: (id: number) => void;
}

const PersonHeader = (props: IPersonHeaderProps) => {
//  const imageAltText = 'Profile image';

  const deletePerson = useCallback(() => {
    if (
      window.confirm(`Are you sure you want to remove person: ${props.name}?`)
    ) {
      FaceToFace.delete(`persons/${props.id}`)
        .then(() => {
          if (props.personDeleted) {
            props.personDeleted(props.id);
          }
        })
        .catch(() => {
          console.error(
            `Something went wrong when deleting person ${props.id}`,
          );
        });
    }
  }, [props]);

  const deletePersonButton = props.showDeletePerson ? (
    <button onClick={deletePerson}>Delete person</button>
  ) : null;

  return (
    <div className={styles.PersonHeader}>
      <div className={styles.title}>
        {/*Boolean(props.imageUrl) ? (
          <img src={props.imageUrl} alt={imageAltText}/>
        ) : null*/}
        <div className={styles.title__name}>
          <Link to={`/persons/${props.id}`}>
            {Boolean(props.name) ? <div>{props.name}</div> : null}
          </Link>
        </div>
        {Boolean(props.role) ? <div>{props.role}</div> : null}
      </div>
      {deletePersonButton}
    </div>
  );
};

PersonHeader.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  imageUrl: PropTypes.string,
  id: PropTypes.number,
  showDeletePerson: PropTypes.bool,
  personDeleted: PropTypes.func,
};

export default PersonHeader;
