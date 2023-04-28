
import React from "react";
import Form from 'react-bootstrap/Form'

const options = [
  { value: '', label: 'All' },
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];

const SelectStatus = ({ statusFilter, setStatusFilter }) => {
  const handleSelectChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <div className="col-4">
      <Form.Select className="bg-dark text-white" value={statusFilter} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default SelectStatus;