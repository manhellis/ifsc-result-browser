import React from 'react';

const YearEventDropdown = () => {
    const years = [2022, 2023, 2024, 2025]; // Replace with your desired range of years

    return (
        <select>
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
};

export default YearEventDropdown;
