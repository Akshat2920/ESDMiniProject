import React, { useEffect, useState } from 'react';
import { fetchStudentsData } from '../utils/httputil';
import { useFilters } from '../hooks/useFilters';
import { usePagination } from '../hooks/usePagination';
import { sortData } from '../utils/sortData';

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
    usePagination(10, filteredData.length);

  const sortedData = sortData(filteredData);
  const currentRows = sortedData.slice(currentRowsStart, currentRowsEnd);

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
  const specializationOptions = ['All', 'ML', 'DevOps', 'None'];
  const batchOptions = ['All', '2020', '2021', '2022', '2023', '2024'];
  const pagesOption = ['5', '10', '20', '50', '100', 'All'];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student Specialization Details</h2>

      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <>
          {/* Dropdowns */}
          <div className="row mb-3">
            {/* Filters */}
            <div className="col-md-3">
              <label htmlFor="programme" className="form-label">Programme</label>
              <select id="programme" name="Programme" className="form-select" value={filters.Programme} onChange={handleFilterChange}>
                {programmeOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="batch" className="form-label">Batch</label>
              <select id="batch" name="Batch" className="form-select" value={filters.Batch} onChange={handleFilterChange}>
                {batchOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="qualification" className="form-label">Qualification</label>
              <select id="qualification" name="Qualification" className="form-select" value={filters.Qualification} onChange={handleFilterChange}>
                {qualificationOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="specialization" className="form-label">Specialization</label>
              <select id="specialization" name="Specialization" className="form-select" value={filters.Specialization} onChange={handleFilterChange}>
                {specializationOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
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
                <tr key={student.studentId}>
                  <td>{student.rollNo}</td>
                  <td>{student.firstName} {student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.programme}</td>
                  <td>{student.batch}</td>
                  <td>{student.qualification}</td>
                  <td>{student.specialization || 'None'}</td>
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