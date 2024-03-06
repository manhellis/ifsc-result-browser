"use client";
import React, { useState, useEffect } from "react";
import EventCard from "./eventCard";
import LeagueDropdown from "./leagueDropdown";
// import { data } from "autoprefixer";


const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/current/`


const YearBrowser = ({ year }) => { // i guess if this was typescript it would be working already
    // States for managing fetched data and loading state
    const [data, setData] = useState({ events: [], leagues: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);
    
    let API_URL = API_BASE + String(year);
    console.log(API_URL)
    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData); // Assuming the JSON structure matches your data variable
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [year]); // include year in dependency array to refetch when it changes ?? wizard 
    // Handler for league selection change
    const handleLeagueChange = (leagueId) => {
        setSelectedLeagueId(Number(leagueId));
    };
    

    // Process leagues data to add season_id
    // This operation should now be done after data is fetched and only if data.leagues is populated
    data.leagues.forEach((league) => {
        league.season_id = Number(league.url.split("/")[4]);
    });
    

    // Filter events based on selected league
    const filteredEvents = selectedLeagueId
        ? data.events.filter(event => event.league_season_id === selectedLeagueId)
        : data.events;

    // Conditional rendering based on loading state or error
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <LeagueDropdown leagues={data.leagues} onChange={handleLeagueChange} />
            <div className="flex flex-wrap items-center justify-center">
                {filteredEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </>
    );
};

export default YearBrowser;
