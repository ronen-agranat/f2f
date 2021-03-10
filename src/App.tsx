import React, { useState } from 'react';
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
import { Backdrop } from './components/UI/Backdrop/Backdrop';
import { SendTo } from './components/SendTo/SendTo';
import { PersonSwitcherContext } from './contexts/PersonSwitcherContext';
import { UserContext } from './contexts/UserContext';
import { LoginForm } from './components/Auth/LoginForm';
import { CreateUserForm } from './components/Auth/CreateUserForm';

function App() {
  // Authentication
  const [bearerToken, setBearerToken] = useState('');

  // Person switcher

  // TODO: Move into context
  const [showSendTo, setShowSendTo] = useState(false);
  const [selectedText, setSelectedText] = useState('');

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

  // User context; see ./contexts/UserContext.tsx
  const userContextValue = {
    setBearerToken
  }

  if (!Boolean(bearerToken)) {
    console.log('Bearer token is not set');
  }

  const isAuthenticated = Boolean(bearerToken);

  const authenticatedRouter = <Router>
    <NavBar />
    {/* Move into component that is powered by context provider */}
    {showSendTo ? sendTo : null}
    <Switch>
      <Route path='/' exact component={PersonsBrowser} />
      <Route path='/persons/' exact component={PersonsBrowser} />
      <Route path='/persons/create' exact component={NewPersonForm} />
      <Route path='/persons/:id/edit' exact component={NewPersonForm} />
      <Route path='/persons/:id' exact component={PersonCard} />
      <Route path='/users/create' exact component={CreateUserForm} />
      <Route component={NotFound} />
    </Switch>
  </Router>;
  
  const unauthenticatedRouter = <Router>
    <Switch>
      <Route path='/users/create' exact component={CreateUserForm} />
      <Route component={LoginForm} />
    </Switch>
  </Router>;

  // Outermost application
  return (
    <PersonSwitcherContext.Provider value={personSwitcherContextValue}>
      <UserContext.Provider value={userContextValue}>
        { isAuthenticated ? authenticatedRouter : unauthenticatedRouter }
      </UserContext.Provider>
    </PersonSwitcherContext.Provider>
  );
}

export default App;
