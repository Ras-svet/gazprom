import Papa from 'papaparse';

interface CsvData {
  columns: string[];
  data: Record<string, any>[];
}

export const parseCsv = (filePath: string): Promise<CsvData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('CSV Parsing Complete:', results);
        if (results.errors.length) {
          console.error('Errors:', results.errors);
          reject(results.errors);
        } else {
          const allColumns = results.meta.fields || [];
          const columnsToKeep = allColumns.slice(0, 5);
          const filteredData = (results.data as Record<string, any>[]).map((row) => {
            const filteredRow: Record<string, any> = {};
            columnsToKeep.forEach(column => {
              filteredRow[column] = row[column];
            });
            return filteredRow;
          });

          resolve({ columns: columnsToKeep, data: filteredData });
        }
      },
      error: (error) => {
        console.error('CSV Parsing Error:', error);
        reject(error);
      },
    });
  });
};
