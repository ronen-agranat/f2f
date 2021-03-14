import React, { useContext, useEffect, useState } from 'react';

import styles from './PersonsBrowser.module.css';
import FaceToFace from '../../services/FaceToFace';
import { AxiosError, AxiosResponse } from 'axios';
import { Person } from '../../interfaces/person.interface';
import PersonHeader from '../Persons/PersonHeader/PersonHeader';
import { AddPersonButton } from './AddPersonButton/AddPersonButton';
import { UserContext } from '../../contexts/UserContext';

const PersonsBrowser = () => {
  const [personsLoaded, setPersonsLoaded] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [error, setError] = useState<string>();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!personsLoaded) {
      FaceToFace.get(`/persons/`, { headers: { Authorization: `Bearer ${userContext.bearerToken}`}})
        .then((response: AxiosResponse<Person[]>) => {
          setPersons(response.data);
          setPersonsLoaded(true);
        })
        .catch((error: AxiosError) => {
          console.error('Something went wrong with fetching data', error);
          setError(`Could not retrieve person list: ${error.message}`);
        });
    }
  }, [personsLoaded, userContext.bearerToken]);

  if (!personsLoaded && !error) {
    return <p>
      <i>Loading...</i>
    </p>;
  }

  if (error) {
    return <p>
      <strong style={{color: 'red'}}>
        {`Error occured: ${error}`}
      </strong>
    </p>
  }

  const personDeleted = (id: number) => {
    // Update local persons state when person deleted
    const newPersons = [...persons].filter((p: Person) => {
      return p.id !== id;
    });
    setPersons(newPersons);
  };

  const personCards = persons
    .sort((a, b) => {
      return (a.name || '') <= (b.name || '') ? -1 : 1;
    })
    .map(person => (
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
      { Boolean(persons.length) ? <div className={styles.PersonsBrowser}>{personCards}</div> : <i>No people added yet -- add the first below.</i> }
      <AddPersonButton/>
    </>
  );
};

export default PersonsBrowser;
