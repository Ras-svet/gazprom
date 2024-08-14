import React from 'react';

interface TableHeaderProps {
  columns: string[];
  onSortChange: (columnIndex: number, direction: 'asc' | 'desc' | null) => void;
  sortConfig: { columnIndex: number | null; direction: 'asc' | 'desc' | null };
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, onSortChange, sortConfig }) => {

  const handleSortClick = () => {
    let newDirection: 'asc' | 'desc' | null;
    if (sortConfig.direction === 'asc') {
      newDirection = 'desc';
    } else if (sortConfig.direction === 'desc') {
      newDirection = null;
    } else {
      newDirection = 'asc';
    }
    
    if (newDirection !== null) {
      onSortChange(2, newDirection);
    } else {
      onSortChange(2, null);
    }
  };

  const sortArrow = sortConfig.direction === 'asc' ? '▼' :
                     sortConfig.direction === 'desc' ? '▲' :
                     '►';

  return (
    <tr className="table__header">
      {columns.map((column, index) => (
        <th key={index} className="table__header-cell">
          {column}
          {index === 2 && (
            <div className="table__header-sort">
              <button
                onClick={handleSortClick}
                aria-label="Сортировать"
                className="sort-button"
              >
                {sortArrow}
              </button>
            </div>
          )}
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
