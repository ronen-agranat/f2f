import React from 'react';

// Used in case provider not specified in React node tree
type TPersonSwitcherContextValue = {
  selectedText: string,
  // TODO: Wrap this function with a regular function instead of using any
  setSelectedText: any,
  showPersonSwitcher: () => void,
  hidePersonSwitcher: () => void,
  isPersonSwitcherVisible: boolean,
};

export const PersonSwitcherContext = React.createContext<Partial<TPersonSwitcherContextValue>>({});
