"use client";
import React, { useState } from "react";
import YearBrowser from "./components/yearBrowser";
import YearEventDropdown from "./components/yearEventDropdown";
// import data from "../data/yearEventData.json";

const Page = () => {
    const [selectedYear, setSelectedYear] = useState(2023); // Default year
    // or useState(new Date().getFullYear()) to default to current year

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row ">
                {/* <h1 className="text-4xl">{selectedYear}</h1> */}
                <YearEventDropdown
                    className=""
                    selectedYear={selectedYear}
                    onYearChange={handleYearChange}
                />
            </div>
            <YearBrowser year={selectedYear} />
        </div>
    );
};

export default Page;
