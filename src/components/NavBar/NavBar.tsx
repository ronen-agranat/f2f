import React, { useCallback } from 'react';

import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { clearAuthTokens } from 'axios-jwt';

interface INavBarProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isAuthenticated: boolean;
}

const NavBar = (props: INavBarProps) => {
  const { setIsAuthenticated } = props;

  const logout = useCallback(() => {
    clearAuthTokens();
    setIsAuthenticated(false);
  }, [setIsAuthenticated])

  if (!props.isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.NavBar}>
      <nav>
        <ul>
          <li>
            <Link to="/persons">People</Link>
          </li>
          <li>
            <Link to="/login" onClick={logout}>Log Out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
