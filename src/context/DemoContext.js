import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

const DemoContext = createContext();

export const useDemoMode = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoProvider');
  }
  return context;
};

export const DemoProvider = ({ children }) => {
  const [demoMode, setDemoMode] = useState(false);

  const enableDemoMode = () => {
    setDemoMode(true);
  };

  const disableDemoMode = () => {
    setDemoMode(false);
  };

  const showDemoAlert = () => {
    Alert.alert(
      'Demo Mode',
      'This feature is disabled in demo mode.',
      [{ text: 'OK' }]
    );
  };

  return (
    <DemoContext.Provider
      value={{
        demoMode,
        enableDemoMode,
        disableDemoMode,
        showDemoAlert,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};
