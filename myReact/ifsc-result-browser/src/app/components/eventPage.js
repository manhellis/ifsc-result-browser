import React from "react";
import { useRouter } from "next/navigation"; // Corrected import for useRouter

const EventPageHeader = ({ event }) => {
    const startDate = new Date(event.starts_at).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "UTC",
    });

    return (
        <header className="bg-sky-700 text-white p-4 ">
            <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
            <p className="text-lg">ID: {event.id}</p>
            <p>Location: {event.location}</p>
            <p className="font-medium">Starts at: {startDate}</p>
        </header>
    );
};

const CategoryRounds = ({ category }) => {
    const rounds = category.category_rounds.map((round) => (
        <div key={round.category} className="my-2">
            <h2 className="text-lg font-semibold">
                {`${round.name} ${round.category} ${round.format} `}
            </h2>
            <p className="text-sm text-gray-600">{round.round_date}</p>
        </div>
    ));

    return <div>{rounds}</div>;
};

const getDisciplineColor = (event) => {
    let discipline_color = "bg-white";

    const hasBouldering = event.discipline_kind === "boulder";
    const hasLead = event.discipline_kind === "lead";
    const hasSpeed = event.discipline_kind === "speed";
    const hasCombined = event.discipline_kind === "boulder&lead";

    const hasOldCombined = event.disciplines === "combined"; 

    if ((hasBouldering && hasLead && hasSpeed) || hasOldCombined) {
        discipline_color = "bg-purple-300"; // Combination of all three
    } else if (hasBouldering && hasLead || hasCombined) {
        discipline_color = "bg-orange-300"; // Combination of bouldering and lead
    } else if (hasBouldering && hasSpeed) {
        discipline_color = "bg-pink-300"; // Combination of bouldering and speed
    } else if (hasLead && hasSpeed) {
        discipline_color = "bg-teal-300"; // Combination of lead and speed
    } else if (hasBouldering) {
        discipline_color = "bg-red-300"; // Only bouldering
    } else if (hasLead) {
        discipline_color = "bg-green-300"; // Only lead
    } else if (hasSpeed) {
        discipline_color = "bg-blue-300"; // Only speed
    }

    return discipline_color;
};

const EventPageCategory = ({ event }) => {
    const router = useRouter();
    // let discipline_color = getDisciplineColor(event);
    // let discipline_color = "bg-white";
    return event.d_cats.map((category) => {
        let discipline_color = getDisciplineColor(category);

        return (
            <div
                className={`${discipline_color} hover:bg-sky-100 p-4 m-4 transition-all duration-200 ease-in-out rounded shadow hover:shadow-md cursor-pointer`}
                key={category.dcat_id}
                onClick={() =>
                    router.push(
                        `/fullResults?id=${event.id}&cid=${category.dcat_id}`
                    )
                }
            >
                <h1
                    className="text-xl text-sky-900 font-semibold mb-2"
                    title={`Category ID: ${category.dcat_id}`}
                >
                    {`${category.category_name} ${category.discipline_kind}`}
                </h1>
                <CategoryRounds category={category} />
            </div>
        );
    });
};

const EventPage = ({ event }) => {
    return (
        <div className="min-h-screen min-w-full bg-gray-100">
            <EventPageHeader event={event} />
            <div className="py-4 rounded-b">
                <EventPageCategory event={event} />
            </div>
        </div>
    );
};

export default EventPage;
