// components/EventCard.js

import React from "react";
const leagueName = "World Cups and World Championships";
const leagueColor = "blue";

const EventCard = ({ event, index }) => {
    // pass in a single event to be turned into a
    // const { events } = eventData;
    // const { leagues } = eventData;

    // leagues.map((league, index) => {
    //     league.season_id = Number(league.url.split("/")[4]);
    //     // const leagueEvents = league.events;
    // }, []);

    // const leagueId = leagues.filter((league) => league.name === leagueName)[0]
    //     .season_id;

    // console.log(leagues);
    const startsAt = new Date(event.starts_at);
    const day = startsAt.getDate();
    const month = startsAt.getMonth() + 1;
    const year = startsAt.getFullYear();

    // const isLeagueMatch = event.league_season_id === leagueId;
    // if (isLeagueMatch)
    //     console.log(event.league_season_id, leagueId, event.location);
    
    // const cardClasses = `w-36 h-36 border border-gray-200 p-2 m-2 flex flex-col justify-center items-center rounded shadow-sm text-center overflow-hidden ${isLeagueMatch ? "bg-blue-500" : "bg-white"}`;
    const cardClasses = `w-36 h-36 border border-gray-200 p-2 m-2 flex flex-col justify-center items-center rounded shadow-sm text-center overflow-hidden bg-white hover:bg-sky-200 transition-all`;

    return (
        <div key={index} className={cardClasses}>
            <h3 className="text-sm font-semibold truncate">{event.location}</h3>
            <p className="text-xs mt-1">{event.event}</p>
            <p className="text-xs mt-1">{event.url}</p>
            <p className="text-xs mt-1">{`${day}/${month}/${year}`}</p>
        </div>
    );
};

export default EventCard;
