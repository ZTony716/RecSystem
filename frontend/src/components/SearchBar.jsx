import React, { useState } from "react";

export default function SearchBar({ initialValue = "", onSearch }) {
  const [value, setValue] = useState(initialValue);

  function submit(e) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form className="search" onSubmit={submit}>
      <input
        className="search__input"
        placeholder="Search products (e.g., iPhone, Shoes, Code...)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn" type="submit">Search</button>
    </form>
  );
}