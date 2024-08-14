import React from 'react';

interface TableRowProps {
  row: Record<string, any>;
  onCellChange: (column: string, value: string, rowIndex: number) => void;
  rowIndex: number;
}

const TableRow: React.FC<TableRowProps> = ({ row, onCellChange, rowIndex }) => {
  return (
    <tr className="table__body-row">
      {Object.keys(row).map((column, colIndex) => (
        <td key={colIndex} className="table__body-cell">
          <input
            type="text"
            value={row[column] || ''}
            onChange={(e) => onCellChange(column, e.target.value, rowIndex)}
            className="table__body-input"
          />
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
