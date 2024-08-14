import React from 'react';
import TableStore from './TableStore';
import RootStoreContext from './RootStoreContext';

class RootStore {
  tableStore: TableStore;

  constructor() {
    this.tableStore = new TableStore();
  }
}

export const RootStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const rootStore = new RootStore();
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  const context = React.useContext(RootStoreContext);

  if (context === null) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }

  return context;
};

export default RootStore