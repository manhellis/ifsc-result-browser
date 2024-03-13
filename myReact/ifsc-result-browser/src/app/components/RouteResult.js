import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const processBoulderData = (data) => {
    return data.ranking.reduce((acc, athlete) => {
        athlete.rounds.forEach((round) => {
            if (!acc[round.category_round_id]) {
                acc[round.category_round_id] = {
                    round_name: round.round_name,
                    routes: {},
                };
            }
            // here need to implement speed
            // also need to check old format data
            if (!round.hasOwnProperty("speed_elimination_stages")) {
                // if not old format
                round.ascents.forEach((ascent) => {
                    if (!acc[round.category_round_id].routes[ascent.route_id]) {
                        acc[round.category_round_id].routes[ascent.route_id] = {
                            route_name: ascent.route_name,
                            athletes: [],
                        };
                    }
                    // if quali group a or b
                    if (!ascent?.starting_group) {
                        acc[round.category_round_id].routes[
                            ascent.route_id
                        ].athletes.push({
                            athlete_id: athlete.athlete_id,
                            name: athlete.firstname, // firstname or full name?
                            ...ascent, // do i need to pass this or not
                        });
                    } else {
                        // add grp a/b logic
                    }
                });
            } else {
                // else build tables on old format
                const ascents = round.speed_elimination_stages?.ascents ?? [];
                ascents.forEach((ascent, index) => {
                    if (!acc[round.category_round_id].routes[ascent.route_id]) {
                        acc[round.category_round_id].routes[ascent.route_id] = {
                            route_name: index + 1, // increment since no route_name stored in older format
                            route_id: ascent.route_id,
                            athletes: [],
                        };
                    }
                    acc[round.category_round_id].routes[
                        ascent.route_id
                    ].athletes.push({
                        athlete_id: athlete.athlete_id,
                        name: athlete.firstname, // firstname or full name?
                        top: ascent.top,
                        zone: ascent.zone,
                        top_tries: ascent.top_tries,
                        zone_tries: ascent.zone_tries,
                        ...ascent,
                    });
                });
            }
        });
        return acc;
    }, {});
};
const processLeadData = (data) => {
    const extractValues = (str) => {
        // for old
        const regex =
            /^(Top|\d+)\s+(\d+)\.\s+\|\s+(\d+\+?)\s+(\d+)\.\s+\[\d+\.\d+\]/;
        const match = str.match(regex);
        if (match) {
            return {
                score: match[1],
                rank: match[2],
                secondScore: match[3],
                secondRank: match[4],
            };
        }
        // return null;
    };

    return data.ranking.reduce((acc, athlete) => {
        athlete.rounds.forEach((round) => {
            if (!acc[round.category_round_id]) {
                acc[round.category_round_id] = {
                    round_name: round.round_name,
                    routes: {},
                };
            }

            // Adapt old format rounds to fit new processing logic
            if (round.hasOwnProperty("speed_elimination_stages")) {
                // Assuming old format doesn't have detailed ascents, simulate a basic structure
                const values = extractValues(round.score);
                if (round.round_name === "Qualification") {
                    round.ascents = [
                        {
                            route_id: "old_format_" + round.category_round_id,
                            route_name: round.round_name,
                            score: round.score, // this should be extracted from values
                            // need to create multiple ascents for qualis
                            // rank: values.rank,
                        },
                      
                    ];
                } else { // semis and finals old format
                    round.ascents = [
                        {
                            route_id: "old_format_" + round.category_round_id,
                            route_name: round.round_name,
                            score: round.score,
                            // Default or inferred values for other ascent properties as necessary
                        },
                    ];
                }
            }

            round.ascents.forEach((ascent) => {
                if (!acc[round.category_round_id].routes[ascent.route_id]) {
                    acc[round.category_round_id].routes[ascent.route_id] = {
                        route_name: ascent.route_name,
                        athletes: [],
                    };
                }

                // Process ascent data
                const time_ms = ascent.time_ms ?? 0; // Use ?? operator to default to 0 if undefined
                const date = new Date(time_ms);

                acc[round.category_round_id].routes[
                    ascent.route_id
                ].athletes.push({
                    athlete_id: athlete.athlete_id,
                    name: athlete.firstname, // Decide if you need full name and adjust accordingly
                    rank: ascent.rank || round.rank, // Use ascent rank if available, otherwise round rank
                    time_long: `${date.getMinutes()}m ${date.getSeconds()}s`,
                    ...ascent,
                });
            });
        });
        return acc;
    }, {});
};

const RouteResult = ({ data }) => {
    // Assuming 'data' is your prop with all the necessary information
    const [activeTab, setActiveTab] = useState(null);
    // check category
    // choose roundsData data reduction

    // render jsx depending on type of round data
    // Prepare rounds data - boulder only?
    const dcatLower = data.dcat.toLowerCase();

    let isBoulder = dcatLower.includes("boulder");
    let isLead = !isBoulder && dcatLower.includes("lead");
    const processRoundsData = () => {
        if (!data.dcat) return {};

        if (isBoulder) {
            return processBoulderData(data);
        } else if (isLead) {
            return processLeadData(data);
        }
        // Additional conditions can be added here for other categories
        // Example: else if (dcatLower.includes("speed")) { ... }

        return {}; // Return an empty object or appropriate default if no category matches
    };
    const roundsData = processRoundsData();

    // Initialize activeTab if not already set
    if (activeTab === null && Object.keys(roundsData).length > 0) {
        setActiveTab(Object.keys(roundsData)[0]);
    }

    return (
        <div className="flex flex-col items-center justify-center m-4">
            {/* QUali semi final buttons... TODO: add quali 1 and quali 2*/}
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
            {/* route content below*/}
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
                            <div
                                className="flex flex-row w-screen overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 focus:outline-none"
                                tabIndex={0}
                                aria-label="Scrollable content"
                            >
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
                                                <Table>
                                                    <TableCaption>
                                                        A list of athletes and
                                                        their performance.
                                                    </TableCaption>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>
                                                                Athlete
                                                            </TableHead>
                                                            {isBoulder && (
                                                                <>
                                                                    <TableHead>
                                                                        Top
                                                                        Attempts
                                                                        (T)
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        Zone
                                                                        Attempts
                                                                        (Z)
                                                                    </TableHead>
                                                                </>
                                                            )}
                                                            {isLead && (
                                                                <>
                                                                    <TableHead>
                                                                        Score
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        Rank
                                                                    </TableHead>
                                                                    {route
                                                                        .athletes[0]
                                                                        ?.time_ms && (
                                                                        <TableHead>
                                                                            Time
                                                                        </TableHead>
                                                                    )}
                                                                </>
                                                            )}
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {isBoulder &&
                                                            route.athletes.map(
                                                                (athlete) => (
                                                                    <TableRow
                                                                        key={
                                                                            athlete.athlete_id
                                                                        }
                                                                    >
                                                                        <TableCell>
                                                                            {
                                                                                athlete.name
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                athlete.top_tries
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                athlete.zone_tries
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            )}
                                                        {isLead &&
                                                            route.athletes.map(
                                                                (athlete) => (
                                                                    <TableRow
                                                                        key={
                                                                            athlete.athlete_id
                                                                        }
                                                                    >
                                                                        <TableCell>
                                                                            {
                                                                                athlete.name
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                athlete.score
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                athlete.rank
                                                                            }
                                                                        </TableCell>
                                                                        {route
                                                                            .athletes[0]
                                                                            ?.time_ms && (
                                                                            <TableCell
                                                                                value={
                                                                                    athlete.time_ms
                                                                                }
                                                                            >
                                                                                {/* set value to be ms */}
                                                                                {
                                                                                    athlete.time_long
                                                                                }
                                                                            </TableCell>
                                                                        )}
                                                                    </TableRow>
                                                                )
                                                            )}
                                                    </TableBody>
                                                </Table>
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
