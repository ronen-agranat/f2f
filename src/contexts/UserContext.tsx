/////////////////////////////////////////////////////////////////////////////
//
// Context for currently-authenticated user
//
// Makes attributes of current user easily accessible throughout application.
//

import React from 'react';

type TUserContextValue = {
  bearerToken: string,
  setBearerToken: (token: string) => void,
};

export const UserContext = React.createContext<Partial<TUserContextValue>>({});
