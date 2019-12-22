import React from 'react';
import PropTypes from 'prop-types';

import styles from './Backdrop.module.css';

interface OverlayProps {
  show: boolean;
}

export const Backdrop = (props: OverlayProps) => {
  return props.show ? <div className={styles.Overlay}></div> : null;
};

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
};
