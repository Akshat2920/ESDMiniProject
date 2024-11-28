import React from 'react';

const Dropdown = ({ id, name, label, options, value, onChange }) => {
  return (
    <div className="col-md-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <select
        id={id}
        name={name}
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;