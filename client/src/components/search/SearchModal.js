import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import SearchList from "./SearchList";

function SearchModal() {
  const [username, setUsername] = useState("");
  const debouncedUsername = useDebounce(username);

  const handleOnChangeUsername = (event) => {
    setUsername(event.target.value.trim());
  };

  return (
    <div className="card flex flex-col gap-3">
      <input
        className="search_input-primary"
        type="text"
        placeholder="Enter username"
        onChange={handleOnChangeUsername}
      />
      <div id="searchList" className="h-80 overflow-y-auto">
        <SearchList username={debouncedUsername} />
      </div>
    </div>
  );
}

export default SearchModal;
