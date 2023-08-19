import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import Card from "../ui/Card";
import SearchList from "./SearchList";

function SearchModal() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Card>
      <input
        className="w-full rounded-lg border-yellow-400 bg-[url('../public/search.svg')] bg-[length:1.7rem] bg-[left_0.5rem_center] bg-no-repeat py-3 pr-3 pl-12 shadow focus:border-yellow-400 focus:ring-yellow-400"
        type="text"
        placeholder="Enter username"
        value={search}
        onChange={handleOnChange}
      />
      <div id="searchList" className="h-80 overflow-y-auto">
        <SearchList search={debouncedSearch} />
      </div>
    </Card>
  );
}

export default SearchModal;
