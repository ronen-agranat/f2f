import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PersonHeader from '../PersonHeader/PersonHeader';
import MinutesBrowser from '../../Minutes/MinutesBrowser/MinutesBrowser';
import FaceToFace from '../../../services/FaceToFace';
import { Person } from '../../../interfaces/person.interface';

import styles from './PersonCard.module.css';
import { AxiosError, AxiosResponse } from 'axios';

import { useParams } from 'react-router-dom';

interface IPersonCardProps {
  personId?: number;
}

interface IPersonParams {
  id?: string | undefined;
}

const PersonCard = (props: IPersonCardProps) => {
  const params = useParams<IPersonParams>();

  const personId = params.id ? Number(params.id) : props.personId;
  const [person, setPersonState] = useState<Person | undefined>();
  const [personLoaded, setPersonLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!personLoaded) {
      FaceToFace.get(`/persons/${personId}`)
        .then((response: AxiosResponse<Person>) => {
          setPersonState(response.data);
          setPersonLoaded(true);
        })
        .catch((error: AxiosError) => {
          if (error.response && error.response.status === 404) {
            setError(error.response.data.message);
          }
        });
    }
  }, [personLoaded, personId]);

  let personContent = null;

  if (error) {
    personContent = <p className={styles.Error}>{error}</p>;
  } else if (personId && person) {
    personContent = (
      <>
        <PersonHeader
          name={person.name}
          role={person.role}
          imageUrl={person.imageUrl}
          id={personId}
        />
        <MinutesBrowser personId={person.id || personId}/>
      </>
    );
  }
  return <div className={styles.PersonCard}>{personContent}</div>;
};

PersonCard.propTypes = {
  personId: PropTypes.number,
};

export default PersonCard;
