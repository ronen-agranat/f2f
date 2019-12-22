import React, { ChangeEvent, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

import styles from './PersonFinder.module.css';
import { Person } from '../../interfaces/person.interface';
import FaceToFace from '../../services/FaceToFace';
import { AxiosError, AxiosResponse } from 'axios';
import PersonHeader from '../Persons/PersonHeader/PersonHeader';

interface PersonFinderProps {
}

export const PersonFinder = (props: PersonFinderProps) => {
  const [personsLoaded, setPersonsLoaded] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [searchForName, setSearchForName] = useState('');

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

  let personCards: React.ReactNode[] = [];

  if (searchForName) {
    personCards = persons
      .filter(person => {
        let name = person.name;
        if (!name) {
          return false;
        }
        name = name.toLowerCase();
        return name.startsWith(searchForName.toLowerCase());
      })
      .map(person => (
        <PersonHeader
          imageUrl={person.imageUrl}
          role={person.role}
          name={person.name}
          key={person.id}
          id={person.id}
        />
      ));
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchForName(event.target.value);
  };

  return (
    <>
      <div className={styles.PersonFinder}>
        <input type="text" value={searchForName} onChange={onChangeHandler}/>
      </div>
      {personCards.length ? (
        <div className={styles.PersonsBrowser}>{personCards}</div>
      ) : (
        <p>
          <strong>No results</strong>
        </p>
      )}
    </>
  );
};

PersonFinder.propTypes = {};
