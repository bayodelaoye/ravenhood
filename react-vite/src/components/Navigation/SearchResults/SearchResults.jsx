import { useSelector } from "react-redux";
import Spot from "../../Spot";
import './SearchResults.css';


const SearchResults = () => {

    const searchResults = useSelector(state => state.spots.allSpots);
    // console.log("searchReasults=========", searchResults)


    // console.log("SEARCH RESULTS COMPONENT RAN");
    return (
    <>
    <h1 id="searchResultsH1">All Spots</h1>
    <div id="searchResults">

        {searchResults ?
        searchResults.map(result => <Spot key={result.id} spot={result} />) :
        <p>sorry, no results</p> }

    </div>
    </>
    );
}

export default SearchResults;
