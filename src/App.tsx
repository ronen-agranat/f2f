import React from "react";
import PersonsBrowser from './components/PersonsBrowser/PersonsBrowser';
import PersonCard from './components/Persons/PersonCard/PersonCard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import NewPersonForm from './components/Persons/NewPersonForm/NewPersonForm';

import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <nav>
          <ul>
            <li>
              <Link to="/persons">Persons</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path='/' exact component={PersonsBrowser}/>
        <Route path='/persons/' exact component={PersonsBrowser}/>
        <Route path='/persons/create' exact component={NewPersonForm}/>
        <Route path='/persons/:id' exact component={PersonCard}/>
      </Switch>
    </Router>
  );
}

export default App;
