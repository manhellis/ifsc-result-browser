"use client";
import React, { useState, useEffect } from "react";
import EventCard from "./eventCard";
import LeagueDropdown from "./leagueDropdown";
// import { data } from "autoprefixer";


const API_URL = "http://127.0.0.1:8000/current/2023"

const YearBrowser = () => {
    // States for managing fetched data and loading state
    const [data, setData] = useState({ events: [], leagues: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for selected league ID
    const [selectedLeagueId, setSelectedLeagueId] = useState(null);

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
    }, []);
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
