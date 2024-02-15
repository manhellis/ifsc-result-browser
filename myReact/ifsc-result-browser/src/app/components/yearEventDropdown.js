import React from 'react';

const YearEventDropdown = ({ selectedYear, onYearChange }) => {
    const currentYear = new Date().getFullYear(); // Get the current year
    const startYear = 2000; // Set the earliest year you want to include
    const years = Array.from({ length: currentYear - startYear + 1 }, (v, k) => currentYear - k);


    return (
        <select value={selectedYear} onChange={(e) => onYearChange(parseInt(e.target.value, 10))}>
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
};

export default YearEventDropdown;
