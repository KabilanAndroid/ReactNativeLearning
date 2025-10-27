
import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<any>({
    username: 'SUGAN',
    email: 'sugan@yopmail.com',
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
