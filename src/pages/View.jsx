import React, { useEffect, useState } from 'react';
import { fetchStudentsData } from '../utils/httputil';
import { useFilters } from '../hooks/useFilters';
import { usePagination } from '../hooks/usePagination';
import { sortData } from '../utils/sortData';
import Dropdown from '../components/Dropdown';

function View() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const initialFilters = {
    Programme: 'All',
    Qualification: 'All',
    Batch: 'All',
    Specialization: 'All',
  };

  const { filters, handleFilterChange, resetFilters, filteredData } = useFilters(initialFilters, students);
  const { currentPage, rowsPerPage, totalPages, currentRowsStart, currentRowsEnd, handlePageChange, handleRowsPerPage } =
    usePagination(20, filteredData.length);

  const sortedData = sortData(filteredData);
  const currentRows = rowsPerPage === "All" 
    ? sortedData 
    : sortedData.slice(currentRowsStart, currentRowsEnd);

  // Fetch student data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await fetchStudentsData();
        setStudents(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const programmeOptions = ['All', 'B.Tech', 'M.Tech', 'iM.Tech'];
  const qualificationOptions = ['All', 'CSE', 'ECE'];
  const specializationOptions = ['All', 'ML', 'AI', 'DevOps', 'None'];
  const batchOptions = ['All', '2020', '2021', '2022', '2023', '2024'];
  const pagesOption = ['20', '50', '100', 'All'];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student Specialization Details</h2>

      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <>
          {/* Filters */}
          <div className="row mb-3">
            <Dropdown
              id="programme"
              name="Programme"
              label="Programme"
              options={programmeOptions}
              value={filters.Programme}
              onChange={handleFilterChange}
            />
            <Dropdown
              id="batch"
              name="Batch"
              label="Batch"
              options={batchOptions}
              value={filters.Batch}
              onChange={handleFilterChange}
            />
            <Dropdown
              id="qualification"
              name="Qualification"
              label="Qualification"
              options={qualificationOptions}
              value={filters.Qualification}
              onChange={handleFilterChange}
            />
            <Dropdown
              id="specialization"
              name="Specialization"
              label="Specialization"
              options={specializationOptions}
              value={filters.Specialization}
              onChange={handleFilterChange}
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div>
              <label htmlFor="pagePerRow" className="form-label me-2">Rows per page</label>
              <select id="pagePerRow" className="form-select d-inline w-auto" value={rowsPerPage} onChange={handleRowsPerPage}>
                {pagesOption.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Display total entries */}
            <div className="align-self-center">
              <strong>Total entries: {filteredData.length}</strong>
            </div>

            <button className="btn btn-secondary" onClick={resetFilters}>Reset All Filters</button>
          </div>

          {/* Table */}
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Roll No</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Programme</th>
                <th>Batch</th>
                <th>Qualification</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? currentRows.map((student) => (
                <tr key={student.rollNo}>
                  <td>{student.rollNo}</td>
                  <td>{student.firstName} {student.lastName || ''}</td>
                  <td>{student.email}</td>
                  <td>{student.domain.program}</td>
                  <td>{student.domain.batch}</td>
                  <td>{student.domain.qualification}</td>
                  <td>{student.specialization ? student.specialization.name : 'None'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="d-flex justify-content-center mt-3">
            <nav>
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

export default View;