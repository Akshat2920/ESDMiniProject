import { useState, useEffect } from 'react';

export function useFilters(initialFilters, initialData) {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  const saveFiltersToLocalStorage = (filters) => {
    localStorage.setItem('filters', JSON.stringify(filters));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    saveFiltersToLocalStorage(updatedFilters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    localStorage.removeItem('filters');
  };

  const filteredData = initialData.filter((item) => {
    return (
      (filters.Programme === 'All' || item.Programme === filters.Programme) &&
      (filters.Batch === 'All' || item.Batch === filters.Batch) &&
      (filters.Qualification === 'All' || item.Qualification === filters.Qualification) &&
      (
        filters.Specialization === 'All' ||
        (filters.Specialization === 'None' && item.Specialization === null) ||
        item.Specialization === filters.Specialization
      )
    );
  });

  return { filters, handleFilterChange, resetFilters, filteredData };
}