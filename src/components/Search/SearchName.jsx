import React from "react";
import Form from 'react-bootstrap/Form'

const SearchName = ({ nameFilter, setNameFilter }) => {
  const handleNameFilterChange = (event) => {
    event.preventDefault();
    setNameFilter(event?.target?.value);
  };

  return (
    <div className="col-4">
      <Form.Control
        className="bg-dark text-white"
        type="text"
        placeholder="Character Name"
        value={nameFilter}
        onChange={handleNameFilterChange}
      />
    </div>
  );
};

export default SearchName;