import React from "react";
import currentSeason from "../../data/currentSeason.json";
import SeasonCard from "../components/seasonCard";
const data = currentSeason;

console.log(data.current);
const Page2 = () => {
    return (
        <>
            <div className="flex flex-wrap">
                {data.seasons.map((season) => (
                    <SeasonCard season={season} key={season.id} />
                ))}
            </div>
        </>
    );
};

export default Page2;
