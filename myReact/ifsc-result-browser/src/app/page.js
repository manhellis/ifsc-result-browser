"use client";
import React, { useState } from "react";
import EventCard from "./components/eventCard";
import LeagueDropdown from "./components/leagueDropdown";
import data from "../data/yearEventData.json";

const eventsData = data.events;
const leagues = data.leagues;

leagues.forEach((league) => {
  league.season_id = Number(league.url.split("/")[4]);
});

// const leagueId = leagues.filter((league) => league.name === leagueName)[0]
//     .season_id;

const Page = () => {
    const [filter, setFilter] = useState(eventsData);
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);

    const handleLeagueChange = (leagueId) => {
        setSelectedLeagueId(Number(leagueId));
        // console.log(leagueId)
    };

    const filteredEvents = selectedLeagueId
      ? eventsData.filter(event => event.league_season_id === selectedLeagueId)
      : eventsData;


    return (
        <> 
            <LeagueDropdown leagues={leagues} onChange={handleLeagueChange}/>
            <div className="flex flex-wrap">
                {filteredEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </>
    );
};

export default Page;
