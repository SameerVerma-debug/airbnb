import { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AutoComplete } from "./AutoComplete";
import "../styles/search.css";
import axios from "axios";

export const Search = () => {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [autoCompleteValues, setAutoCompleteValues] = useState([]);
  const [autoCompleteDisplay, setAutoCompleteDisplay] = useState(true);

  const handleAutoComplete = async () => {
    setAutoCompleteDisplay(true);
    const res =
      searchRef.current.value &&
      (await axios.get(`/autocomplete/${searchRef.current.value}`));
    setAutoCompleteValues(res.data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setAutoCompleteDisplay(false);
    searchRef.current.value && navigate(`/search/${searchRef.current.value}`);
    searchRef.current.value = "";
  };

  const handleAutoCompleteClick = (value) => {
    searchRef.current.value = value;
    setAutoCompleteDisplay(false);
    navigate(`/search/${value}`);
  };

  return (
    <div className="search-autocomplete">
      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search Location"
            ref={searchRef}
            onChange={handleAutoComplete}
          />
          <button className="search-button">
            <IoIosSearch size={20} color="white" />
          </button>
        </form>
      </div>
      {autoCompleteValues?.length > 0 && (
        <AutoComplete
          values={autoCompleteValues}
          handleClick={handleAutoCompleteClick}
          display={autoCompleteDisplay}
          setDisplay={setAutoCompleteDisplay}
        />
      )}
    </div>
  );
};
