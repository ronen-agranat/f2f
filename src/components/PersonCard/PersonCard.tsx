import React, { useEffect, useState } from 'react';
import PersonHeader from '../PersonHeader/PersonHeader';
import OneOnOneBrowser from '../OneOnOneBrowser/OneOnOneBrowser';
import FaceToFace from '../../services/FaceToFace';
import { Person } from '../../interfaces/person.interface';

import styles from './PersonCard.module.css';
import { AxiosError, AxiosResponse } from 'axios';

export default function() {
  const [person, setPersonState] = useState<Person>({
    id: 1,
  });

  const [personLoaded, setPersonLoaded] = useState(false);

  useEffect(() => {
    if (!personLoaded) {
      FaceToFace.get(`/people/${person.id}`)
        .then((response: AxiosResponse<Person>) => {
          setPersonState(response.data);
          setPersonLoaded(true);
        })
        .catch((error: AxiosError) => {
          console.error('Something went wrong with fetching data', error);
        });
    }
  }, [personLoaded, person.id]);

  return (
    <div className={styles.PersonCard}>
      <PersonHeader name={person.name} role={person.role} imageUrl={person.imageUrl}/>
      <OneOnOneBrowser personId={person.id}/>
    </div>
  );
}
