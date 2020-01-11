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

function App() {
  const [showSendTo, setShowSendTo] = useState(true);

  const hideSendTo = () => {
    setShowSendTo(false);
  };

  const sendTo = (
    <>
      <Backdrop/>
      <SendTo textToSend='Hello, world' close={hideSendTo}/>
    </>
  );

  const openSendTo = () => {
    setShowSendTo(true);
  };

  return (
    <Router>
      <NavBar/>
      {showSendTo ? sendTo : null}
      <Switch>
        <Route path='/' exact component={PersonsBrowser}/>
        <Route path='/persons/' exact component={PersonsBrowser}/>
        <Route path='/persons/create' exact component={NewPersonForm}/>
        <Route path='/persons/:id/edit' exact component={NewPersonForm}/>
        <Route path='/persons/:id' exact>
          <PersonCard openSendTo={openSendTo}/>
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
