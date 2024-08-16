import { useSelector } from "react-redux";
// import Stock from "../../Stock";
import './SearchResults.css';


const SearchResults = () => {

    // const searchResults = useSelector(state => state.search.results);
    // console.log("searchReasults=========", searchResults)


    console.log("SEARCH RESULTS COMPONENT RAN");
    return (
    <>
        <main id="SearchResultsMain">
            <h1 id="SearchResultsH1">Search Results</h1>
            <div id="SearchResults">

                {/* {searchResults ?
                searchResults.map(result => <Stock key={result.id} spot={result} />) :
                <p>sorry, no results</p> } */}

            </div>
        </main>
    </>
    );
}

export default SearchResults;
