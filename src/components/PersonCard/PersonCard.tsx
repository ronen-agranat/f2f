import React, {useEffect, useState} from "react";
import PersonHeader from "../PersonHeader/PersonHeader";
import OneOnOneBrowser from "../OneOnOneBrowser/OneOnOneBrowser";
import FaceToFace from '../../services/FaceToFace';

import styles from "./PersonCard.module.css";
import {AxiosError, AxiosResponse} from "axios";

interface IPersonState {
  id: number;
  role: string;
  name: string;
}

const PersonCard = () => {
  const [personState, setPersonState] = useState<IPersonState>({
    id: 1,
    name: '',
    role: '',
  });

  const [personLoaded, setPersonLoaded] = useState(false);

  useEffect(() => {
    if (!personLoaded) {
      FaceToFace.get(`/people/${personState.id}`)
        .then((response: AxiosResponse<IPersonState>) => {
          setPersonState(response.data);
          setPersonLoaded(true);
        })
        .catch((error: AxiosError) => {
          console.error('Something went wrong with fetching data', error);
        })
    }
  }, [personLoaded, personState.id]);

  return (
    <div className={styles.PersonCard}>
      <PersonHeader name={personState.name} role={personState.role}/>
      <OneOnOneBrowser personId={personState.id}/>
    </div>
  );
};

export default PersonCard;
