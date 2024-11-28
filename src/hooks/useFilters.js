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

  const filteredData = initialData.filter((student) => {
    const { domain, specialization } = student;

    return (
      (filters.Programme === 'All' || domain.program?.toLowerCase() === filters.Programme.toLowerCase()) &&
      (filters.Batch === 'All' || domain.batch === filters.Batch) &&
      (filters.Qualification === 'All' || domain.qualification === filters.Qualification) &&
      (
        filters.Specialization === 'All' ||
        (filters.Specialization === 'None' && specialization.name === null) ||
        specialization.name === filters.Specialization
      )
    );
  });

  return { filters, handleFilterChange, resetFilters, filteredData };
}