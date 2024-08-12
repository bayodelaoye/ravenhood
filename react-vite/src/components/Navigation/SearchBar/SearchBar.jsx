import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaMagnifyingGlass } from "react-icons/fa6";
// import * as searchActions from '../../../search'
import { useNavigate } from 'react-router-dom';

import './SearchBar.css';

const searchables = [{"AAPL": "Apple Inc."}, {"AMZN": "Amazon"}, {"ZOOZ": "Zoo Zoo Inc"}]

function SearchBar() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("Search");

  const [searchSuggestions, setSearchSuggestions] = useState("");

  const [errors, setErrors] = useState({});



  useEffect(() => {
    const suggestions = searchables.filter(searchable =>
      searchable.toLowerCare().includes(search)
    )
    setSearchSuggestions(suggestions);
    console.log("searchSuggestions: ", searchSuggestions)

  }, [search])

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!search || search === "Search") setSearch("*");
    setErrors({});

    // dispatch(searchActions.search({search}));

    console.log('HANDLE SUBMIT SEARCH RAN WITH: ', {search});
    navigate('/results');
    return
};



  return (
    <form id="SearchBarForm" onSubmit={handleSubmit}>

        <label id="SearchBarLabel">
          <FaMagnifyingGlass id="FaMagnifyingGlass" />
          <input
            id="SearchBarInput"
            type="text"
            placeholder='Search'
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        {errors.search && <p>{errors.search}</p>}
      <button type="submit" id="SearchBarButton">submit
      </button>
    </form>
  )
}

export default SearchBar;
