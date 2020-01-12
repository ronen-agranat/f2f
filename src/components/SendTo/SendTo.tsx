import React, { KeyboardEvent, useContext } from 'react';
import PropTypes from 'prop-types';

import styles from './SendTo.module.css';
import { PersonFinder } from '../PersonFinder/PersonFinder';
import { PersonSwitcherContext } from '../../contexts/PersonSwitcherContext';
import FaceToFace from '../../services/FaceToFace';
import { AxiosError } from 'axios';

interface SendToProps {
  textToSend: string;
}

export const SendTo = (props: SendToProps) => {
  const personSwitcherContext = useContext(PersonSwitcherContext);


  const personSelected = (id: number) => {
    // TODO: Add textToSend to most recent 'nextTime' minutes for user
    console.debug('SendTo.tsx: Sending text', props.textToSend, 'to user', id);

    FaceToFace.post(`/persons/${id}/minutes/latest/next-time/append`, {
      textToAppend: props.textToSend,
    })
      .then(() => {
        // TODO update some kind of dirty flag / 'saved' indicator
        // TODO: Show a toast 'success' message
        console.debug('SendTo.tsx: Sending text', props.textToSend, 'to user', id);
      })
      .catch((error: AxiosError) => {
        console.error('SendTo.tsx: Something went wrong with updating the minutes', error);
      });

    hidePersonSwitcher();
  };

  const hidePersonSwitcher = () => {
    if (personSwitcherContext.hidePersonSwitcher) {
      personSwitcherContext.hidePersonSwitcher();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'Escape':
        hidePersonSwitcher();
        break;
      case 'Enter':
        hidePersonSwitcher();
        break;
      default:
        break;
    }
  };

  return <div className={styles.SendTo} onKeyDown={handleKeyDown}>
    <p>
      Send To:
    </p>
    <PersonFinder personSelected={personSelected}/>
  </div>;
};

SendTo.propTypes = {
  textToSend: PropTypes.string.isRequired,
};
