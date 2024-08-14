import React from 'react';
import RootStore from './RootStore';

const RootStoreContext = React.createContext<RootStore | null>(null);

export default RootStoreContext;