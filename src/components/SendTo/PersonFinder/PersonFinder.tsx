import React, { ChangeEvent, forwardRef, Ref, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './PersonFinder.module.css';
import { Person } from '../../../interfaces/person.interface';
import FaceToFace from '../../../services/FaceToFace';
import { AxiosError, AxiosResponse } from 'axios';
import PersonHeader from '../../Persons/PersonHeader/PersonHeader';
import { UserContext } from '../../../contexts/UserContext';

interface PersonFinderProps {
  personSelected: (personId: number) => void;
}

export const PersonFinder = forwardRef(
  (props: PersonFinderProps, ref: Ref<HTMLInputElement>) => {
  const [personsLoaded, setPersonsLoaded] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [searchForName, setSearchForName] = useState('');

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
        });
    }
  }, [personsLoaded, userContext.bearerToken]);

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
          clicked={props.personSelected}
        />
      ));
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchForName(event.target.value);
  };

  return (
    <>
      <div className={styles.PersonFinder}>
        <input type="text" value={searchForName} onChange={onChangeHandler} ref={ref}/>
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
  });

PersonFinder.propTypes = {
  personSelected: PropTypes.func.isRequired,
};
