import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
            <div className="flex items-center border-b border-sky-500 py-2">
                <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search athletes..."
                    aria-label="Search athletes"
                />
                <button
                    className="flex-shrink-0 bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="submit"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
