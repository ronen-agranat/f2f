import React, { useEffect, useState } from 'react';
import PersonHeader from '../PersonHeader/PersonHeader';
import OneOnOneBrowser from '../OneOnOneBrowser/OneOnOneBrowser';
import FaceToFace from '../../services/FaceToFace';
import { Person } from '../../interfaces/person.interface';

import styles from './PersonCard.module.css';
import { AxiosError, AxiosResponse } from 'axios';

interface IPersonCardProps {
  personId: number;
}

const PersonCard = (props: IPersonCardProps) => {
  const [person, setPersonState] = useState<Person | undefined>();

  const [personLoaded, setPersonLoaded] = useState(false);

  useEffect(() => {
    if (!personLoaded) {
      FaceToFace.get(`/persons/${props.personId}`)
        .then((response: AxiosResponse<Person>) => {
          setPersonState(response.data);
          setPersonLoaded(true);
        })
        .catch((error: AxiosError) => {
          console.error('Something went wrong with fetching data', error);
        });
    }
  }, [personLoaded, props.personId]);

  let personContent = null;

  if (person) {
    personContent = (
      <>
        <PersonHeader name={person.name} role={person.role} imageUrl={person.imageUrl}/>
        <OneOnOneBrowser personId={person.id}/>
      </>
    );
  }
  ;

  return (
    <div className={styles.PersonCard}>
      {personContent}
    </div>
  );
}

export default PersonCard;
