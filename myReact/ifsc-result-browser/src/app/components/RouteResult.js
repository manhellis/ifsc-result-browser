import React, { useState } from "react";

const RouteResult = ({ data }) => {
    // Assuming 'data' is your prop with all the necessary information
    const [activeTab, setActiveTab] = useState(null);

    // Prepare rounds data
    const roundsData = data.ranking.reduce((acc, athlete) => {
        athlete.rounds.forEach((round) => {
            if (!acc[round.category_round_id]) {
                acc[round.category_round_id] = {
                    round_name: round.round_name,
                    routes: {},
                };
            }

            round.ascents.forEach((ascent) => {
                if (!acc[round.category_round_id].routes[ascent.route_id]) {
                    acc[round.category_round_id].routes[ascent.route_id] = {
                        route_name: ascent.route_name,
                        athletes: [],
                    };
                }

                acc[round.category_round_id].routes[
                    ascent.route_id
                ].athletes.push({
                    athlete_id: athlete.athlete_id,
                    name: athlete.firstname, // firstname or full name?
                    ...ascent,
                });
            });
        });
        return acc;
    }, {});

    // Initialize activeTab if not already set
    if (activeTab === null && Object.keys(roundsData).length > 0) {
        setActiveTab(Object.keys(roundsData)[0]);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="border-b border-gray-200 shadow">
                <ul className="flex flex-row -mb-px">
                    {Object.entries(roundsData).map(([roundId, round]) => (
                        <li key={roundId} className="-mb-px mr-1">
                            <button
                                className={`inline-block py-2 px-4 text-sky-700 hover:text-blue-800 font-semibold ${
                                    activeTab === roundId
                                        ? "border-l border-t border-r rounded-t text-sky-600 bg-white"
                                        : "text-blue-500 hover:text-blue-600"
                                }`}
                                onClick={() => setActiveTab(roundId)}
                            >
                                {round.round_name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col mt-4">
                {Object.entries(roundsData).map(([roundId, round]) => (
                    <>
                        <div
                            key={roundId}
                            className={`${
                                activeTab === roundId ? "flex" : "hidden"
                            } flex-row p-2`}
                        >
                            {/* scroll func?  */}
                            <div className="flex flex-row w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 focus:outline-none" tabIndex={0} aria-label="Scrollable content">
                            {Object.entries(round.routes).map(
                                ([routeId, route]) => (
                                    <div
                                        key={routeId}
                                        className="flex-none w-64 min-w-max p-2 shadow rounded-lg bg-white m-2"
                                    >
                                        <h3 className="px-4 pt-3 pb-2 text-lg font-semibold text-gray-900">
                                            Route: {route.route_name}
                                        </h3>
                                        <div className="p-2">
                                            <table className="min-w-full">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Athlete
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Top Attempts (T)
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Zone Attempts (Z)
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {route.athletes.map(
                                                        (athlete) => (
                                                            <tr
                                                                key={
                                                                    athlete.athlete_id
                                                                }
                                                                className="border-b border-gray-200"
                                                            >
                                                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                    {
                                                                        athlete.name
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                                                    {
                                                                        athlete.top_tries
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                                                    {
                                                                        athlete.zone_tries
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            )}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default RouteResult;
