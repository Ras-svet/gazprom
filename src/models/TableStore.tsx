import { makeAutoObservable } from 'mobx';
import { parseCsv } from '../services/CsvParser';

const CSV_FILE_PATH = '/data/article_def_v_orig.csv';

class TableStore {
  data: Record<string, any>[] = [];
  columns: string[] = [];
  currentPage: number = 1;
  rowsPerPage: number = 100;
  isLoading: boolean = false;
  sortConfig: { columnIndex: number | null; direction: 'asc' | 'desc' | null } = {
    columnIndex: null,
    direction: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Метод загрузки данных таблицы
  loadTableData = async () => {
    this.isLoading = true;
    try {
      const { columns, data } = await parseCsv(CSV_FILE_PATH);
      this.columns = columns;
      this.data = data;
    } catch (error) {
      console.error('Failed to load table data', error);
    } finally {
      this.isLoading = false;
    }
  };

  // Метод для получения данных текущей страницы
  get currentPageData() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    let pageData = this.data.slice(start, end);

    // Применение сортировки
    if (this.sortConfig.columnIndex !== null && this.sortConfig.direction) {
      pageData = this.sortData(pageData, this.sortConfig.columnIndex, this.sortConfig.direction);
    }

    return pageData;
  }

  // Метод для получения общего количества страниц
  get totalPages() {
    return Math.ceil(this.data.length / this.rowsPerPage);
  }

  // Метод для установки текущей страницы
  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  sortData(data: Record<string, any>[], columnIndex: number, direction: 'asc' | 'desc') {
    const collator = new Intl.Collator('ru-RU', { sensitivity: 'base' });

    return [...data].sort((a, b) => {
      const aValue = a[this.columns[columnIndex]];
      const bValue = b[this.columns[columnIndex]];

      if (aValue === undefined || bValue === undefined) return 0;

      const comparison = collator.compare(aValue, bValue);
      return direction === 'asc' ? comparison : -comparison;
    });
  }

  // Метод для изменения настроек сортировки
  setSortConfig(columnIndex: number, direction: 'asc' | 'desc' | null) {
    this.sortConfig = { columnIndex, direction };
  }

  //Метод изменения данных
  updateCell(rowIndex: number, column: string, value: string) {
    this.data[rowIndex] = { ...this.data[rowIndex], [column]: value };
  }
}

export default TableStore;
