import React from "react";

const RankingView = ({ data, setModalState }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-3xl p-2">Full Result </h1>
            <div className="flex flex-row items-center justify-between w-8/12 px-6 pt-6 bg-white">
                <h1 className="text-lg text-blue-600">Ranking - Name</h1>
                <h1 className="text-lg text-blue-600">Result</h1>
            </div>
            {Array.isArray(data.ranking) &&
                data.ranking.map((ranking) => (
                    <div
                        className="flex flex-row justify-between items-center w-8/12 h-36 p-4 border-green-50 bg-white hover:bg-sky-200 transition-all"
                        key={ranking.athlete_id}
                    >
                        <div>
                            <h2>
                                <span className="text-2xl">
                                    {ranking.rank}.{" "}
                                </span>
                                <span className="text-xl">
                                    {ranking.firstname} {ranking.lastname}
                                </span>
                            </h2>
                            <p>{ranking.athlete_id}</p>
                            <p>{ranking.country}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            {/* ternary if older format with empty rounds */}
                            {/* if no rounds */}
                            {ranking.rounds.length === 0 ? (
                                <p>no data</p>
                            ) : (
                                // else
                                ranking.rounds.map((round) => (
                                    <button
                                        className="hover:text-sky-700 transition-colors"
                                        key={round.round_id}
                                        onClick={() =>
                                            setModalState({
                                                isOpen: true,
                                                data: round,
                                                name: `${ranking.firstname} ${ranking.lastname}`,
                                            })
                                        }
                                    >
                                        {round.round_name + " "}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default RankingView;
