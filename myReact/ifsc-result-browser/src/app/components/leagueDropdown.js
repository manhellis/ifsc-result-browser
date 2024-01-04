'use client'
import React, { useState } from 'react';


const LeagueDropdown = ({leagues, onChange}) => { // pass in leagues object from page.js
  const [selectedLeague, setSelectedLeague] = useState('');

  const handleSelectChange = (e) => {
    setSelectedLeague(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <select value={selectedLeague} onChange={handleSelectChange}>
        <option value="">Select a league</option>
        {leagues.map((league, index) => (
          <option key={index} value={league.season_id}>
            {league.name}
          </option>
        ))}
      </select>
      <p>Selected League ID: {selectedLeague}</p>
    </div>
  );
};

export default LeagueDropdown;
