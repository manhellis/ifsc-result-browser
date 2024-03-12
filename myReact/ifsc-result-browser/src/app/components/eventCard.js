// components/EventCard.js
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const EventCard = ({ event, index }) => {
    const router = useRouter();
    const startsAt = new Date(event.starts_at);
    const day = startsAt.getDate();
    const month = startsAt.getMonth() + 1;
    const year = startsAt.getFullYear();

    // Determine discipline_color based on the first matching discipline kind
    const hasBouldering = event.disciplines.some(
        (discipline) => discipline.kind === "boulder"
    );
    const hasLead = event.disciplines.some(
        (discipline) => discipline.kind === "lead"
    );
    const hasSpeed = event.disciplines.some(
        (discipline) => discipline.kind === "speed"
    );

    let discipline_color = " bg-white";

    // Assign colors based on the combinations of disciplines
    if (hasBouldering && hasLead && hasSpeed) {
        discipline_color = " bg-purple-500"; // Combination of all three
    } else if (hasBouldering && hasLead) {
        discipline_color = " bg-orange-500"; // Combination of bouldering and lead
    } else if (hasBouldering && hasSpeed) {
        discipline_color = " bg-pink-500"; // Combination of bouldering and speed
    } else if (hasLead && hasSpeed) {
        discipline_color = " bg-teal-500"; // Combination of lead and speed
    } else if (hasBouldering) {
        discipline_color = " bg-red-500"; // Only bouldering
    } else if (hasLead) {
        discipline_color = " bg-green-500"; // Only lead
    } else if (hasSpeed) {
        discipline_color = " bg-blue-500"; // Only speed
    }
    // Optionally: Add an else block for a default color if none of the disciplines are present

    const cardClasses = `w-36 h-36 border border-gray-200 p-6 mx-2 my-6 flex flex-col justify-center items-center rounded-r rounded-bl shadow-sm text-center relative hover:bg-sky-200 transition-all${discipline_color}`;

    return (
        <div
            key={index}
            onClick={() => router.push(`/event?id=${event.event_id}`)}
            className={cardClasses}
        >
            <h3 className="text-sm font-semibold truncate">{event.location}</h3>
            <p className="text-xs mt-1">{event.event}</p>
            <div
                className={`${discipline_color} bg-inherit px-2 text-slate-100 rounded-t-md absolute -top-6 left-0 transition-all`}
            >
                {event.disciplines.map((discipline, index) => (
                    <span key={index} className="text-s mt-1">
                        {discipline.kind + " "}
                    </span>
                ))}
            </div>

            <p className="text-xs mt-1">{`${day}/${month}/${year}`}</p>
        </div>
    );
};

export default EventCard;
