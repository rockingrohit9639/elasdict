import React, { useState } from "react";
import "./Home.css";

import * as ElasticAppSearch from "@elastic/app-search-javascript";

import { FaSearch } from "react-icons/fa";

var client = ElasticAppSearch.createClient({
    searchKey: "search-nwcc11fmbe5x8wrw7ompyrbu",
    endpointBase:
        "https://elastic-hackathon-f00014.ent.asia-south1.gcp.elastic-cloud.com",
    engineName: "dictionary-english",
});

var options = {
    result_fields: {
        word: {
            raw: {},
        },
        meaning: {
            raw: {},
        },
        example: {
            raw: {},
        },
    },
};

function Home()
{
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // const [finalQuery, setFinalQuery] = useState("");
    // const [finalResults, setFinalResults] = useState([]);

    const handleSearches = () =>
    {
        // if (finalQuery !== "")
        // {
        //     setResults([]);

        //     client
        //         .search(finalQuery, options)
        //         .then((resultList) => setFinalResults(resultList.rawResults));
        // }
        // else if (query !== "")
        // {
        
        if (query !== "")
        {
            client
            .search(query, options)
            .then((resultList) => setResults(resultList.rawResults));
        }
        
        // }
    }

    // useEffect(() =>
    // {
    //     handleSearches();

    // }, [query, finalQuery]);

    return (
        <>
            <div className="header">
                <h1 className="heading"> Elasdict </h1>

                <div className="input">

                    <input
                        type="text"
                        placeholder="Query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}

                    />
                    <FaSearch className="cursor" onClick={handleSearches}/>
                </div>

                {/* <div className="suggestions">
                    {results
                        ? results?.map((item, ind) => (
                            <p
                                key={ind}
                                className="suggestion"
                                onClick={() => setFinalQuery(item.word.raw)}
                            >
                                {item.word.raw}
                            </p>
                        ))
                        : null}
                </div> */}

            </div>

            {results.length > 0 ?
                (
                    <div className="results">
                        <h3 className="word">{results[0]?.word.raw}</h3>
                        <div className="style">
                            <h6>Meaning</h6>
                            <p>{results[0]?.meaning.raw}</p>
                        </div>
                        <div className="style">
                            <h6>Example</h6>
                            <p>{results[0]?.example.raw}</p>
                        </div>
                    </div>
                )
                :
                null}
        </>
    );
}

export default Home;
