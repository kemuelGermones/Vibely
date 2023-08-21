import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import SearchList from "./SearchList";

function SearchModal() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="card flex flex-col gap-3">
      <input
        className="search_input-primary"
        type="text"
        placeholder="Enter username"
        value={search}
        onChange={handleOnChange}
      />
      <div id="searchList" className="h-80 overflow-y-auto">
        <SearchList search={debouncedSearch} />
      </div>
    </div>
  );
}

export default SearchModal;
