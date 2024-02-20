import React from "react";
import { useLocation } from "next/navigation"
const EventPageHeader = ({ event }) => {
    
    const startDate = new Date(event.starts_at).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "UTC",
    });

    return (
        <header className="bg-gray-200 text-gray-700 p-4">
            <h1 className="text-3xl font-bold">{event.name}</h1>
            <p>ID: {event.id}</p>
            <p>Location: {event.location}</p>
            <p>Starts at: {startDate}</p>
        </header>
    );
};

const CategoryRounds = ({ category }) => {
    // pass in dcat
    const rounds = category.category_rounds.map((round) => {
        return (
            <div key={round.category}>
                <h2>
                    {`${round.name} ${round.category} ${round.format} `}

                    <span>{`${round.result_url}`}</span>
                </h2>

                <p>{round.round_date}</p>
            </div>
        );
    });

    return (
        <div>
            {/* <h2>Rounds</h2> */}
            {rounds}
        </div>
    );
};

const EventPageCategory = ({ event }) => {
    if (!event.d_cats) {
        return <div>No categories</div>;
    }
    return event.d_cats.map((category) => { // need to add if empty dcats check
        // Added return statement here
        // console.log(category.category_name);
        return (
            <div key={category.d_cat_id}>
                <h1 className="text-xl">{`${category.category_name} ${category.discipline_kind}`}</h1>
                <CategoryRounds category={category} />
            </div>
        );
    });
};

const EventPage = ({ event }) => {
    // Your component logic here
    // console.log(event)
    return (
        // Your JSX code here
        <div>
            <EventPageHeader event={event} />
            <EventPageCategory event={event} />
        </div>
    );
};

export default EventPage;
