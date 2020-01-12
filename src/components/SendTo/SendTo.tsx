import React, { KeyboardEvent, useContext } from 'react';
import PropTypes from 'prop-types';

import styles from './SendTo.module.css';
import { PersonFinder } from '../PersonFinder/PersonFinder';
import { PersonSwitcherContext } from '../../contexts/PersonSwitcherContext';

interface SendToProps {
  textToSend: string;
}

export const SendTo = (props: SendToProps) => {
  const personSwitcherContext = useContext(PersonSwitcherContext);

  const personSelected = (id: number) => {
    // TODO: Add textToSend to most recent 'nextTime' minutes for user
    hidePersonSwitcher();
  };

  const hidePersonSwitcher = () => {
    console.log('In SendTo: Hiding the person switcher');
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
