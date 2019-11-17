import React from "react";
import PersonsBrowser from './components/PersonsBrowser/PersonsBrowser';
import PersonCard from './components/PersonCard/PersonCard';

function App() {
  return (
    <>
      <PersonsBrowser/>;
      <PersonCard personId={1}/>
    </>
  );
}

export default App;
