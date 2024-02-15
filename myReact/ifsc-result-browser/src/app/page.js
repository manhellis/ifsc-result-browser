"use client";
import React, { useState } from "react";
import YearBrowser from "./components/yearBrowser";
import YearEventDropdown from "./components/yearEventDropdown";
// import data from "../data/yearEventData.json";



// const text = "season_2023.json";



const Page = () => {
    // const [filter, setFilter] = useState(eventsData);
    // console.log(data);
    // pass link to data to object
    return (
        <>

            <YearEventDropdown />
            <YearBrowser  />
        </>
    );
};

export default Page;
