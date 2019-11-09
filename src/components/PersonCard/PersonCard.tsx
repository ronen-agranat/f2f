import React, {useEffect, useState} from "react";
import PersonHeader from "../PersonHeader/PersonHeader";
import OneOnOneBrowser from "../OneOnOneBrowser/OneOnOneBrowser";
import FaceToFace from '../../services/FaceToFace';

import styles from "./PersonCard.module.css";
import {AxiosError, AxiosResponse} from "axios";

interface IPersonState {
  id: number;
  loaded: boolean;
  role: string;
  name: string;
}

const PersonCard = () => {
  const [personState, setPersonState] = useState<IPersonState>({
    id: 1,
    name: '',
    role: '',
    loaded: false
  });

  useEffect(() => {
    if (!personState.loaded) {
      FaceToFace.get(`/people/${personState.id}`)
        .then((response: AxiosResponse<IPersonState>) => {
          setPersonState(response.data);
        })
        .catch((error: AxiosError) => {
          console.error('Something went wrong with fetching data', error);
        })
    }
  }, [personState.loaded, personState.id]);

  return (
    <div className={styles.PersonCard}>
      <PersonHeader name={personState.name} role={personState.role}/>
      <OneOnOneBrowser />
    </div>
  );
};

export default PersonCard;
