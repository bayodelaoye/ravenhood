import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaMagnifyingGlass } from "react-icons/fa6";
import * as spotsActions from '../../../spots'
import { useNavigate } from 'react-router-dom';

import './SearchBar.css';

function SearchBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [where, setWhere] = useState("Search destinations");
  const [checkIn, setCheckIn] = useState("Add dates");
  const [checkOut, setCheckOut] = useState("Add dates");
  const [who, setWho] = useState("Add guests");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!where || where === "Search destinations") setWhere("*");
    if(!checkIn || checkIn === "Add dates") setCheckIn("");
    if(!checkOut || checkOut === "Add dates") setCheckOut("");
    if(!who || who === "Add guests") setWho(1);

    setErrors({});

    dispatch(spotsActions.search({where, checkIn, checkOut, who}));

    console.log('HANDLE SUBMIT SEARCH RAN WITH: ', {where, checkIn, checkOut, who});

    navigate('/results');
    return

};



  return (
    <form id="SearchBarForm" onSubmit={handleSubmit}>
      <label className="SearchBarLabel">Where
        <input
          className="SearchBarInput"
          type="text"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
        />
      </label>
      {errors.where && <p>{errors.where}</p>}


      <label className="SearchBarLabel">Check in
        <input
          className="SearchBarInput"
          type="text"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </label>
      {errors.checkIn && <p>{errors.checkIn}</p>}


      <label className="SearchBarLabel">Check out
        <input
          className="SearchBarInput"
          type="text"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </label>
      {errors.checkOut && <p>{errors.checkOut}</p>}


      <label className="SearchBarLabel">Who
        <input
          className="SearchBarInput"
          type="text"
          value={who}
          onChange={(e) => setWho(e.target.value)}
        />
      </label>
      {errors.who && <p>{errors.who}</p>}



      <FaMagnifyingGlass id="FaMagnifyingGlass">

      </FaMagnifyingGlass>
      <button type="submit">Search</button>


    </form>
  )
}

export default SearchBar;
