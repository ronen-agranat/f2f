import React from 'react';

// Used in case provider not specified in React node tree
type TPersonSwitcherContextValue = {
  selectedText: string,
  setSelectedText: any,
};

export const PersonSwitcherContext = React.createContext<Partial<TPersonSwitcherContextValue>>({});
