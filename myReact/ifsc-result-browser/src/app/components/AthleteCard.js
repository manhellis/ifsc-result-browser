import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// import AthleteCard from "../components/AthleteCard";
const getCountryISO2 = require("country-iso-3-to-2");

const replaceFlagUrlWithOpenSource = (athleteData) => {
    // Construct new flag URL with the open-source flag API
    const countryISO2 = getCountryISO2(athleteData?.country).toLowerCase();
    athleteData.flag_url = `https://flagcdn.com/w40/${countryISO2}.png`;
};
const AthleteCard = () => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL + "/athlete?";
    const searchParams = useSearchParams();
    const event_id = searchParams.get("id"); //
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let API_URL = API_BASE + "id=" + event_id;
    console.log(API_URL);
    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                let jsonData = await response.json();

                replaceFlagUrlWithOpenSource(jsonData); // call replace
                setData(jsonData); // Assuming the JSON structure matches your data variable
                //preprocess

                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-sky-200">
            <div className="px-6 py-4">
                <div className="grid grid-cols-2 justify-between items-center font-bold text-xl mb-2 text-sky-800">
                    <div>
                        {data.firstname} {data.lastname}
                    </div>
                    <img
                        src={data.flag_url}
                        alt={`Flag of ${data.country}`}
                        className="w-10 h-6"
                    />
                </div>
                <p className="text-gray-700 text-base">
                    Federation: {data.federation.name}
                </p>
                <p className="text-gray-700 text-base">
                    Personal Best: {data.speed_personal_best.time}s in{" "}
                    {data.speed_personal_best.event_name}
                </p>
                <p className="text-gray-700 text-base">
                    Country: {data.country}, City: {data.city}
                </p>
                <p className="text-gray-700 text-base">
                    Age: {data.age}, Height: {data.height}cm
                </p>
            </div>
            <div className="px-6 py-4">
                {data.discipline_podiums.map((discipline) => (
                    <div key={discipline.discipline_kind} className="mb-4">
                        <h3 className="font-bold text-sky-600 capitalize">
                            {discipline.discipline_kind}
                        </h3>
                        <div className="flex items-center">
                            <span className="mr-2">🥇 x{discipline["1"]}</span>
                            <span className="mr-2">🥈 x{discipline["2"]}</span>
                            <span>🥉 x{discipline["3"]}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Total Podiums: {discipline.total}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AthleteCard;
