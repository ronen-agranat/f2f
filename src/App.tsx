import React from "react";
import PersonsBrowser from './components/PersonsBrowser/PersonsBrowser';
import PersonCard from './components/PersonCard/PersonCard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
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
        <Route path='/persons/:id' exact component={PersonCard}/>
      </Switch>
    </Router>
  );
}

export default App;
