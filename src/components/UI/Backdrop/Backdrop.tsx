import React from 'react';
// import PropTypes from 'prop-types';

import styles from './Backdrop.module.css';

interface OverlayProps {
}

export const Backdrop = (props: OverlayProps) => {
  return <div className={styles.Overlay}></div>;
};

Backdrop.propTypes = {
};
