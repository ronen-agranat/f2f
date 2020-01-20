import React from 'react';
import PropTypes from 'prop-types';

import styles from './Backdrop.module.css';

interface OverlayProps {
  clicked: () => void;
}

export const Backdrop = (props: OverlayProps) => {
  return <div className={styles.Overlay} onClick={props.clicked}></div>;
};

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired,
};
