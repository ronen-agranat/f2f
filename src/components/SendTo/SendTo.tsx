import React from 'react';
import PropTypes from 'prop-types';

import styles from './SendTo.module.css';

interface SendToProps {
  show: boolean;
}

export const SendTo = (props: SendToProps) => {
  return props.show ?
    <div className={styles.SendTo}>
      <p>
        Send To:
      </p>
      <div>
        <input type="text"/>
      </div>
    </div> : null;
};

SendTo.propTypes = {
  show: PropTypes.bool.isRequired,
};
