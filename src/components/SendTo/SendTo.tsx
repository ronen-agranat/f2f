import React, { KeyboardEvent } from 'react';
import PropTypes from 'prop-types';

import styles from './SendTo.module.css';
import { PersonFinder } from '../PersonFinder/PersonFinder';

interface SendToProps {
  textToSend: string;
  close: () => void;
}

export const SendTo = (props: SendToProps) => {
  const personSelected = (id: number) => {
    // TODO: Add textToSend to most recent 'nextTime' minutes for user
    props.close();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'Escape':
        props.close();
        break;
      case 'Enter':
        props.close();
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
  close: PropTypes.func.isRequired,
};
