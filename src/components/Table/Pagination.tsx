import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../models/RootStore';
import '../../styles/Pagination.css';

const Pagination: React.FC = observer(() => {
  const { tableStore } = useRootStore();

  const handlePageChange = (newPage: number) => {
    tableStore.setPage(newPage);
    window.scrollTo(0, 0);
  };

  const goToPreviousPage = () => {
    if (tableStore.currentPage > 1) {
      handlePageChange(tableStore.currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (tableStore.currentPage < tableStore.totalPages) {
      handlePageChange(tableStore.currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={goToPreviousPage}
        disabled={tableStore.currentPage === 1}
        aria-label="Предыдущая страница"
      >
        &lt;
      </button>
      <span className="pagination__span">
        Страница {tableStore.currentPage} из {tableStore.totalPages}
      </span>
      <button
        className="pagination__button"
        onClick={goToNextPage}
        disabled={tableStore.currentPage === tableStore.totalPages}
        aria-label="Следующая страница"
      >
        &gt;
      </button>
    </div>
  );
});

export default Pagination;
