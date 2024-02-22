import React from "react";
import { useRouter } from "next/navigation"; // Corrected import for useRouter

const EventPageHeader = ({ event }) => {
    const startDate = new Date(event.starts_at).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "UTC",
    });

    return (
        <header className="bg-sky-700 text-white p-4 rounded-t">
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

const EventPageCategory = ({ event }) => {
    const router = useRouter();

    if (!event.d_cats) {
        return <div>No categories</div>;
    }
    return event.d_cats.map((category) => (
        <div
            className="bg-white hover:bg-sky-100 p-4 m-4 transition-all duration-200 ease-in-out rounded shadow hover:shadow-md cursor-pointer"
            key={category.dcat_id}
            onClick={() => router.push(`/fullResults?id=${event.id}&cid=${category.dcat_id}`)}
        >
            <h1 className="text-xl text-sky-700 font-semibold mb-2">
                {`${category.category_name} ${category.discipline_kind} - cid: ${category.dcat_id}`}
            </h1>
            <CategoryRounds category={category} />
        </div>
    ));
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
