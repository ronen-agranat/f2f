import React from 'react';

import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <h1>Page not found</h1>
      <p>
        Please check the link provided or return to the main menu.
      </p>
    </div>
  );
};

NotFound.propTypes = {};
