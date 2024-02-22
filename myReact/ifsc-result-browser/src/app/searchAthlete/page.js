"use client";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="container w-6/12">
                <h1 className="p-4 text-xl">Search for an Athlete</h1>
                <SearchBar className=""onSearch={handleSearch} />
                {/* {searchQuery && <SearchResults searchQuery={searchQuery} />} */}
                <SearchResults searchQuery={searchQuery} />
            </div>
        </main>
    );
};

export default Page;
