// components/EventCard.js
"use client";
import React from "react";
import { useRouter } from "next/navigation";
const EventCard = ({ event, index }) => {
    // pass in a single event to be turned into a
    const cardClasses = `w-36 h-36 border border-gray-200 p-2 m-2 flex flex-col justify-center items-center rounded shadow-sm text-center overflow-hidden bg-white hover:bg-sky-200 transition-all`;
    const router = useRouter();
    const startsAt = new Date(event.starts_at);
    const day = startsAt.getDate();
    const month = startsAt.getMonth() + 1;
    const year = startsAt.getFullYear();
    
    
    return (
        <div
            key={index}
            onClick={() => router.push(`/event?id=${event.event_id}`)}
            className={cardClasses}
        >
            <h3 className="text-sm font-semibold truncate">{event.location}</h3>
            <p className="text-xs mt-1">{event.event}</p>
            {/* <p className="text-xs mt-1">{event.url}</p> */}
            <p className="text-xs mt-1">{`${day}/${month}/${year}`}</p>
        </div>
    );
};

export default EventCard;
