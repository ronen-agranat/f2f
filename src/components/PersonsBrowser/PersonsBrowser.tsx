import React, { useEffect, useState } from 'react';

import styles from './PersonsBrowser.module.css';
import FaceToFace from '../../services/FaceToFace';
import { AxiosError, AxiosResponse } from 'axios';
import { Person } from '../../interfaces/person.interface';
import PersonHeader from '../Persons/PersonHeader/PersonHeader';
import { AddPersonButton } from './AddPersonButton/AddPersonButton';

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

  const personDeleted = (id: number) => {
    // Update local persons state when person deleted
    const newPersons = [...persons].filter((p: Person) => {
      return p.id !== id;
    });
    setPersons(newPersons);
  };

  const personCards = persons.map(person => (
    <PersonHeader
      imageUrl={person.imageUrl}
      role={person.role}
      name={person.name}
      key={person.id}
      id={person.id}
      showDeletePerson={true}
      personDeleted={personDeleted}
    />
  ));

  return (
    <>
      <div className={styles.PersonsBrowser}>{personCards}</div>
      <AddPersonButton/>
    </>
  );
};

export default PersonsBrowser;
