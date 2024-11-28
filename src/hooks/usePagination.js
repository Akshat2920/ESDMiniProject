import { useState, useEffect } from 'react';

export function usePagination(initialRowsPerPage, dataLength) {
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem('currentPage'), 10) || 1;
  });

  const [rowsPerPage, setRowsPerPage] = useState(() => {
    const savedRowsPerPage = localStorage.getItem('rowsPerPage');
    return savedRowsPerPage === "All" ? "All" : parseInt(savedRowsPerPage, 20) || initialRowsPerPage;
  });

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('rowsPerPage', rowsPerPage);
  }, [rowsPerPage]);

  const totalPages = rowsPerPage === "All" ? 1 : Math.ceil(dataLength / rowsPerPage);
  const indexLastRow = rowsPerPage === "All" ? dataLength : currentPage * rowsPerPage;
  const indexFirstRow = rowsPerPage === "All" ? 0 : indexLastRow - rowsPerPage;

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowsPerPage = (e) => {
    const value = e.target.value === "All" ? "All" : parseInt(e.target.value, 20);
    setRowsPerPage(value);
    setCurrentPage(1); // Reset to first page when rowsPerPage changes
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