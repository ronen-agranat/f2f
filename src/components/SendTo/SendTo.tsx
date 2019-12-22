import React from 'react';
import PropTypes from 'prop-types';

import styles from './SendTo.module.css';
import { PersonFinder } from '../PersonFinder/PersonFinder';

interface SendToProps {
  show: boolean;
}

export const SendTo = (props: SendToProps) => {
  return props.show ?
    <div className={styles.SendTo}>
      <h3>
        Send To:
      </h3>
      <PersonFinder/>
    </div> : null;
};

SendTo.propTypes = {
  show: PropTypes.bool.isRequired,
};
