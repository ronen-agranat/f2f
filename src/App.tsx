import React, { useState } from 'react';
import PersonsBrowser from './components/PersonsBrowser/PersonsBrowser';
import PersonCard from './components/Persons/PersonCard/PersonCard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import NewPersonForm from './components/Persons/NewPersonForm/NewPersonForm';

import NavBar from './components/NavBar/NavBar';
import { NotFound } from './components/ErrorPages/NotFound/NotFound';
import { Backdrop } from './components/UI/Backdrop/Backdrop';
import { SendTo } from './components/SendTo/SendTo';
import { PersonSwitcherContext } from './contexts/PersonSwitcherContext';
import { LoginForm } from './components/Auth/LoginForm';
import { CreateUserForm } from './components/Auth/CreateUserForm';

import { isLoggedIn } from 'axios-jwt'

export const App = () => {
  // Person switcher

  // TODO: Move into context
  const [showSendTo, setShowSendTo] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

  const personSwitcherContextValue = {
    // Expose state via context to all context consumers.
    // Enables attributes to be read and modified directly without 'threading'
    // through multiple components via props
    selectedText,
    setSelectedText,
    showSendTo,
    setShowSendTo,
    // Wrap React-provided state-setters with regular functions
    hidePersonSwitcher: () => {
      setShowSendTo(false);
    },
    showPersonSwitcher: () => {
      setShowSendTo(true);
    },
    isPersonSwitcherVisible: showSendTo,
  };

  // TODO: Move to dedicated component that is powered by context provider
  const sendTo = (
    <>
      <Backdrop clicked={personSwitcherContextValue.hidePersonSwitcher}/>
      <SendTo textToSend={selectedText}/>
    </>
  );

  return (
    <PersonSwitcherContext.Provider value={personSwitcherContextValue}>
      <Router>
        <NavBar setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
        {/* Move into component that is powered by context provider */}
        {showSendTo ? sendTo : null}
        <Switch>
          <Route path='/' exact>
            { isAuthenticated ? <PersonsBrowser/> : <Redirect to='/login' /> }
          </Route>
          <Route path='/persons/' exact>
            { isAuthenticated ? <PersonsBrowser/> : <Redirect to='/login' /> }
          </Route>
          <Route path='/persons/create' exact>
            { isAuthenticated ? <NewPersonForm/> : <Redirect to='/login' /> }
          </Route>
          <Route path='/persons/:id/edit' exact>
            { isAuthenticated ? <NewPersonForm/> : <Redirect to='/login' /> }
          </Route>
          <Route path='/persons/:id' exact>
            { isAuthenticated ? <PersonCard/> : <Redirect to='/login' /> }
          </Route>
          <Route path='/users/create' exact component={CreateUserForm} />
          <Route path='/login/' exact>
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>;
    </PersonSwitcherContext.Provider>
  );
}
