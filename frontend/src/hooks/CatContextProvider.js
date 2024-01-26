import React, { useState } from 'react';
import CatContext from './CatContext';

const CatContextProvider = ({ children }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const [generalError, setGeneralError] = useState('');

  return (
    <div>
      <CatContext.Provider
        value={{
          filter,
          setFilter,
          search,
          setSearch,
          generalError,
          setGeneralError,
        }}
      >
        {children}
      </CatContext.Provider>
    </div>
  );
};

export default CatContextProvider;
