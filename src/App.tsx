import React from "react";
import PersonsBrowser from './components/PersonsBrowser/PersonsBrowser';
import PersonCard from './components/Persons/PersonCard/PersonCard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NewPersonForm from './components/Persons/NewPersonForm/NewPersonForm';

import NavBar from './components/NavBar/NavBar';
import { NotFound } from './components/ErrorPages/NotFound/NotFound';

function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path='/' exact component={PersonsBrowser}/>
        <Route path='/persons/' exact component={PersonsBrowser}/>
        <Route path='/persons/create' exact component={NewPersonForm}/>
        <Route path='/persons/:id/edit' exact component={NewPersonForm}/>
        <Route path='/persons/:id' exact component={PersonCard}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
