import { useState, useEffect } from 'react';

export function usePagination(initialRowsPerPage, dataLength) {
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem('currentPage'), 10) || 1;
  });

  const [rowsPerPage, setRowsPerPage] = useState(() => {
    return parseInt(localStorage.getItem('rowsPerPage'), 10) || initialRowsPerPage;
  });

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('rowsPerPage', rowsPerPage);
  }, [rowsPerPage]);

  const totalPages = Math.ceil(dataLength / rowsPerPage);
  const indexLastRow = currentPage * rowsPerPage;
  const indexFirstRow = indexLastRow - rowsPerPage;

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return {
    currentPage,
    rowsPerPage,
    totalPages,
    currentRowsStart: indexFirstRow,
    currentRowsEnd: indexLastRow,
    handlePageChange,
    handleRowsPerPage,
  };
}