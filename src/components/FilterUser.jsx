import React, { useState } from "react";

export default function FilterUser({ fetchData }) {
  const [filterValue, setFilterValue] = useState("");
  return (
    <div className="filter-container">
      <p>Filter Users: </p>
      <input
        type="number"
        className="filter"
        min={1}
        max={100}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <button
        className="filter-btn"
        onClick={() => filterValue !== null && fetchData(filterValue)}
      >
        Filter
      </button>
      <button className="filter-btn" onClick={() => fetchData(null)}>
        Reset Filter
      </button>
    </div>
  );
}
