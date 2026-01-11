import React, { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <CursorContext.Provider value={{ showSplash, setShowSplash }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);