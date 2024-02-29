import React from "react";
import EventCard from "./eventCard";
import LeagueDropdown from "./leagueDropdown";

const YearBrowserServer = ({ events, leagues, error }) => {
    const [selectedLeagueId, setSelectedLeagueId] = React.useState(null);

    // Handler for league selection change
    const handleLeagueChange = (leagueId) => {
        setSelectedLeagueId(Number(leagueId));
    };

    leagues.forEach((league) => {
        league.season_id = Number(league.url.split("/")[4]);
    });

    // Filter events based on selected league
    const filteredEvents = selectedLeagueId
        ? events.filter(event => event.league_season_id === selectedLeagueId)
        : events;

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <LeagueDropdown leagues={leagues} onChange={handleLeagueChange} />
            <div className="flex flex-wrap items-center justify-center">
                {filteredEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </>
    );
};

export default YearBrowserServer;
