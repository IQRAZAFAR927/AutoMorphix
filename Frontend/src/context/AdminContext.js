// src/context/AdminContext.js
import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext(null);

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const login = (adminData) => {
    setAdmin(adminData);
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
