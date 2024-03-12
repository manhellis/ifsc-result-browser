import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const YearEventDropdown = ({ selectedYear, onYearChange }) => {
    const currentYear = new Date().getFullYear(); // Get the current year
    const startYear = 2000; // Set the earliest year you want to include
    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (v, k) => currentYear - k
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <DropdownMenuLabel>Select a year</DropdownMenuLabel>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {years.map((year) => (
                    <DropdownMenuItem
                        key={year}
                        value={year}
                        onClick={() => onYearChange(year)}
                    >
                        {year}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        // <div>
        //     <label htmlFor="year">Select a year: </label>
        //     <select
        //         value={selectedYear}
        //         onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
        //     >
        //         {years.map((year) => (
        //             <option key={year} value={year}>
        //                 {year}
        //             </option>
        //         ))}
        //     </select>
        // </div>
    );
};

export default YearEventDropdown;
