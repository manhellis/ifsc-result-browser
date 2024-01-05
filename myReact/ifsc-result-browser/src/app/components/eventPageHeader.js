import React from "react";

const EventPageHeader = ({ eventPage }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
            <div className="font-bold text-xl mb-2">{eventPage.name}</div>
            <p>ID: {eventPage.id}</p>
            <p>Starts at: {new Date(eventPage.starts_at).toLocaleString()}</p>
            <p>Location: {eventPage.location}</p>
        </div>
    );
};

export default EventPageHeader;
