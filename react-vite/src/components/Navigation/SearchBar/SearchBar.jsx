import { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
// import * as searchActions from '../../../search'
import * as navStocksActions from "../../../redux/navStocksRedux"
import { useDispatch } from 'react-redux';
import './SearchBar.css';

// NOTE: DOC STRINGS MAY NEED UPDATED SORRY!!!!!! THINGS CHANGE AND I FORGET TO UPDATE THEM...

function SearchBar()  {

  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(navStocksActions.navStocks())

  }, [])





// =======================GRABING STOCK DATA FROM STORE=======================
  const navStocks = useSelector((store) => store.navStocks.navStocks);
  // console.log("navStocks from searchBar = ", navStocks)

  const searchables = navStocks.filter(stock => stock.company_name !== null);
  // const searchables = ["AAPL", "AMZN", "BUTT"]
  // console.log("searchables from searchbar ============= ", searchables)



// =======================STATEFUL VARIABLES=======================
// some of these may not be used after all

  const [placeHolder, setPlaceHolder] = useState("Search")

  const [search, setSearch] = useState("");

  const [searchSuggestions, setSearchSuggestions] = useState([]);

  // const [selectedSuggestion, setSelectedSuggestion] = useState();

  // const [stockDetailTicker, setStockDetailTicker] = useState();

  // const [stockDetail, setStockDetail] = useState();

  const [errors, setErrors] = useState({});


// =======================GLOBAL VARIABLES (NOT STATEFUL)=======================
// some of these may not be used after all

  let displayedSuggestions = [];


// ===========================USE EFFECT FOR SEARCH===============================

  /**
   * This useEffect runs everytime there is a change in the variable search
   * It captures the search value and filters it through the stocks (aka searchables)
   * The result is the array of stock objects named suggestions
   * Then it creates an array called displaySuggestions which mirrors suggestions...
   * But it only contains a string of ticker_symbol, company_name, and ceo...
   * This is so the suggestion list is readable and helpful to the user
   */
  useEffect(() => {
    // console.log("search ===========", search, typeof search, !!search);
    if(!!search === false) return setSearchSuggestions([]);

    const suggestions = searchables.filter(searchable =>
      searchable.ticker_symbol.toLowerCase().includes(search) ||
      searchable.ticker_symbol.toUpperCase().includes(search) ||
      searchable.company_name.toUpperCase().includes(search.toUpperCase()) ||
      searchable.company_name.toLowerCase().includes(search.toLowerCase())
    )
      displayedSuggestions = suggestions.map(suggestion => `${suggestion.ticker_symbol} ${" - "} ${suggestion.company_name} ${" - "} ${suggestion.ceo}`)

    setSearchSuggestions(displayedSuggestions);
    // console.log("suggestions: ", suggestions)
    // console.log("displayedSuggestions ==== ", displayedSuggestions)
    // console.log("searchSuggestions: ", searchSuggestions)

  }, [search])



// ===========================HANDLE SUBMIT FOR SEARCH===============================
 /**
  * This handles the search when user submits.
  * User can submit by pressing maginfying glass or when input in focus pressing return.
  * If the search is empty it will change the place holder to indicate to enter a value.
  * If the search is not empty it will execute the search and redirect.
  * @param {*} e
  * @returns
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search || search === undefined || search === "") return setPlaceHolder("Enter a value to search");


    console.log("e.target.value in handlesubmit", e.target.value)
    console.log("search = ", search)

    // if(e.target.value === "" || e.target.value === undefined){
    //   setSearch("");
    //   return
    // }


    // setErrors({});

    // dispatch(searchActions.search({search}));

    console.log("THIS IS PSUEDO FOR A SEARCH RUNNING WITH: ", search)

    setSelectedSuggestion("")

    setSearch("")

    console.log('HANDLE SUBMIT SEARCH RAN');

    return navigate('/searchResults');
  };


// ===========================HANDLE SEARCH SUGGESTION BUTTON===============================

  /**
   * This handler occurs when user clicks on a selection from the dropdown suggestions.
   * It will set the search variable to the e.target.value.
   * Then is will set the selectedSuggestion to e.target.value also though this may be unnecessary.
   * Lastly it grabs the input element in the document and returns focus to it.
   * @param {*} e
   */
  const handleSearchSuggestionButton = (e) => {
    e.preventDefault();
    // console.log("e.target.value============== ", e.target.value);


    // setSelectedSuggestion(e.target.value);
    // console.log("selectedSelection", selectedSuggestion)

    let ticker = "";
    for(let i = 0; i < 6; i++) {
      if(e.target.value[i] === "" || e.target.value[i] === undefined || e.target.value[i] === "-") break;

      if (e.target.value[i] !== "" && e.target.value[i] !== undefined) {
        ticker += e.target.value[i]
      }
    }
    console.log("ticker", ticker)

    // const stockDetail = searchSuggestions.find(suggestion => suggestion.ticker_symbol = ticker.toUpperCase())

    // setSearch(ticker);
    // setStockDetailTicker(ticker);
    // setStockDetail(stockDetail)
    displayedSuggestions = [];
    console.log(displayedSuggestions);

    document.getElementById("SearchBarInput").focus();

    // console.log("handleSearchSuggestionButton ran setSearch to: ", search, "setStockDetailTicker to: ", stockDetailTicker, "setStockDetail to: ", stockDetail);

    return setSearch(ticker);
  };





// ===========================HANDLE FOCUS ===============================

  // /**
  //  * I am not using it.
  //  * It can be called when user focus on input.
  //  * @param {*} e
  //  */
  // const handleFocus = (e) => {
  //   console.log("handleFocus e: ", e.target.value)
  //   setSelectedSuggestion("")
  // }


// ===========================HANDLE CHANGE ===============================
 /**
  * This controls the value of the search variable when there is a change to input.
  * It also resets the placeholder in case that it had change to the message from if user tried empty search.
  * @param {*} e
  * @returns
  */
  const handleChange = (e) => {
    // e.preventDefault();
    setPlaceHolder("Search")
    return setSearch(e.target.value)
  }



// ===========================RETURN ===============================
  return (
    <>
    <main id="SearchBarMain">
      <form id="SearchBarForm" onSubmit={handleSubmit}>

          <label id="SearchBarLabel">
            <FaMagnifyingGlass onClick={handleSubmit} id="FaMagnifyingGlass" />
            <input
              id="SearchBarInput"
              type="text"
              value={search}
              placeholder={placeHolder}
              // onFocus={handleFocus} --ended up not needing this keep just in case
              // onChange={(e) => setSearch(e.target.value)} --this is the old version keep just in case
              onChange={(e) => handleChange(e)}
            />
          </label>
          {errors.search && <p>{errors.search}</p>}

        <button type="submit" id="SearchBarButton">submit</button>
      </form>

      <ul id="SearchBarSuggestionsUl">
        {searchSuggestions.length !== 0 ? searchSuggestions.map(ele =>
          <li key={searchSuggestions.indexOf(ele)} className='SearchBarSuggestionsUlLi'>
            <button
             onClick={handleSearchSuggestionButton}
             value={ele}
             className='SearchBarSuggestionsUlLiButton'>
              {ele}
            </button>
          </li>) : ""}
      </ul>
    </main>
    </>


  )
}

export default SearchBar;
