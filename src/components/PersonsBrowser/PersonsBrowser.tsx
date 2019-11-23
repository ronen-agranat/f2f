import React, { useEffect, useState } from 'react';

import styles from './PersonsBrowser.module.css';
import FaceToFace from '../../services/FaceToFace';
import { AxiosError, AxiosResponse } from 'axios';
import { Person } from '../../interfaces/person.interface';
import PersonHeader from '../PersonHeader/PersonHeader';
import { Link } from 'react-router-dom';

const PersonsBrowser = () => {
  const [personsLoaded, setPersonsLoaded] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    if (!personsLoaded) {
      FaceToFace.get(`/persons/`)
        .then((response: AxiosResponse<Person[]>) => {
          setPersons(response.data);
          setPersonsLoaded(true);
        })
        .catch((error: AxiosError) => {
          console.error('Something went wrong with fetching data', error);
        });
    }
  }, [personsLoaded]);

  const personCards = persons.map(person => (
    <PersonHeader
      imageUrl={person.imageUrl}
      role={person.role}
      name={person.name}
      key={person.id}
      id={person.id}
    />
  ));

  return (
    <div className={styles.PersonsBrowser}>
      <Link to="persons/create">+ Add person</Link>
      {personCards}
    </div>
  );
};

export default PersonsBrowser;
