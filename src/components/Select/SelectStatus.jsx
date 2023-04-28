
import React from "react";

const SelectStatus = ({ status, setStatus }) => {
  const handleSelectChange = (event) => {
    setStatus(event?.target?.value);
  };

  return (
    <div>
      <select value={status} onChange={handleSelectChange}>
        <option value="">All</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  );
};

export default SelectStatus;