import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaMagnifyingGlass } from "react-icons/fa6";
// import * as spotsActions from '../../../spots'
import { useNavigate } from 'react-router-dom';

import './SearchBar.css';

function SearchBar() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("Search");

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!search || search === "Search") setSearch("*");
    setErrors({});

    // dispatch(spotsActions.search({search}));

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
          value={""}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      {errors.search && <p>{errors.search}</p>}


      <button type="submit">Search</button>


    </form>
  )
}

export default SearchBar;
