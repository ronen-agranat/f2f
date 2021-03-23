import React, { useCallback } from 'react';

import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { clearAuthTokens } from 'axios-jwt';

const NavBar = () => {
  const logout = useCallback(() => {
    clearAuthTokens();
  }, [])

  return (
    <div className={styles.NavBar}>
      <nav>
        <ul>
          <li>
            <Link to="/persons">People</Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>Log Out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
