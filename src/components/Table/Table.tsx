import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';
import { useRootStore } from '../../models/RootStore';
import '../../styles/TableStyle.css'

const Table: React.FC = observer(() => {
  const { tableStore } = useRootStore();
  const [sortConfig, setSortConfig] = useState<{ columnIndex: number | null; direction: 'asc' | 'desc' | null }>({
    columnIndex: null,
    direction: null,
  });

  const handleSortChange = (columnIndex: number, direction: 'asc' | 'desc' | null) => {
    setSortConfig({ columnIndex, direction });
    tableStore.setSortConfig(columnIndex, direction);
  };

  const handleCellChange = (column: string, value: string, rowIndex: number) => {
    tableStore.updateCell(rowIndex, column, value);
  };

  return (
    <div>
      <table className="table">
        <thead className="table__header">
        <TableHeader
            columns={tableStore.columns}
            onSortChange={handleSortChange}
            sortConfig={sortConfig}
          />
        </thead>
        <tbody className="table__body">
          {tableStore.currentPageData.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              rowIndex={index}
              onCellChange={handleCellChange}
            />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
});

export default Table;