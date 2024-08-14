import React from 'react';
import { observer } from 'mobx-react-lite';
import Table from './components/Table/Table';
import { useRootStore } from './models/RootStore';
import './styles/App.css'

const App: React.FC = observer(() => {
  const { tableStore } = useRootStore();

  React.useEffect(() => {
    tableStore.loadTableData();
  }, [tableStore]);

  return (
    <div className="body">
      <div className="page">
        {tableStore.isLoading ? (
          <div>Загрузка...</div>
        ) : (
          <Table />
        )}
      </div>
    </div>
  );
});

export default App;