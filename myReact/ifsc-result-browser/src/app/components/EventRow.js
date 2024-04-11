// components/EventCard.js
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TableRow } from "@/components/ui/table";

const EventRow = ({ event, index }) => {
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

    const hasCombined = event.disciplines.some(
        (discipline) => discipline.kind === "boulder&lead"
    );

    const hasOldCombined = event.disciplines.some(
        (discipline) => discipline.kind === "combined" //2020 combined.. i believe
    );

    let discipline_color = " bg-white";

    // Assign colors based on the combinations of disciplines
    if ((hasBouldering && hasLead && hasSpeed) || hasOldCombined) {
        discipline_color = " bg-purple-300"; // Combination of all three
    } else if (hasBouldering && hasLead) {
        discipline_color = " bg-orange-300"; // Combination of bouldering and lead
    } else if (hasBouldering && hasSpeed) {
        discipline_color = " bg-pink-300"; // Combination of bouldering and speed
    } else if (hasLead && hasSpeed) {
        discipline_color = " bg-teal-300"; // Combination of lead and speed
    } else if (hasBouldering) {
        discipline_color = " bg-red-300"; // Only bouldering
    } else if (hasLead) {
        discipline_color = " bg-green-300"; // Only lead
    } else if (hasSpeed) {
        discipline_color = " bg-blue-300"; // Only speed
    }
    // Optionally: Add an else block for a default color if none of the disciplines are present

    const renderDisciplines = () => {
        if (hasCombined) {
            return <span className="text-xs mt-1">Combined L&S</span>;
        }
        if (hasOldCombined) {
            return <span className="text-xs mt-1">Combined LSB</span>;
        } else {
            return event.disciplines.map((discipline, index) => (
                <span key={index} className="text-xs mt-1">
                    {discipline.kind + " "}
                </span>
            ));
        }
    };

    const cardHover = "hover:bg-sky-200 hover:scale-105 transition-all";

    const cardClasses = `min-w-56 max-w-56 min-h-36 border border-gray-200 px-4 py-2 mx-2 my-6 flex flex-col justify-between items-start rounded-r-lg rounded-bl-lg shadow-sm text-center relative ${cardHover} ${discipline_color} drop-shadow-xl`;

    return (
        <TableRow
            onClick={() => router.push(`/event?id=${event.event_id}`)}
            className="hover:bg-gray-100 cursor-pointer"
        >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {event.location}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${day}/${month}/${year}`}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.event}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {renderDisciplines()}
            </td>
        </TableRow>
    );
};
export default EventRow;
