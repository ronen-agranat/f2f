import React from 'react';

import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className={styles.NavBar}>
      <nav>
        <ul>
          <li>
            <Link to="/persons">People</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
