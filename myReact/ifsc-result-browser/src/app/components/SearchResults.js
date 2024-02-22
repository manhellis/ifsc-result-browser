import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

const SearchResults = ({ searchQuery }) => {
    const [results, setResults] = useState([]);
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            const api_complete =
                API_URL + "/searchAthlete?query=" + searchQuery;
            console.log(api_complete);
            const response = await fetch(api_complete);
            const data = await response.json();
            setResults(data.results);
        };

        if (searchQuery) {
            fetchData();
        }
    }, [searchQuery]);

    const handleSelectAthlete = (athleteId) => {
        router.push(`/athlete?id=${athleteId}`);
    };

    return (
        <ul className="list-none p-4">
            {results.map((athlete) => (
                <li
                    key={athlete.athlete_id}
                    onClick={() => handleSelectAthlete(athlete.athlete_id)}
                    className="cursor-pointer p-2 mb-2 rounded-lg bg-sky-100 hover:bg-sky-200 transition-colors duration-150 ease-in-out"
                >
                    <span className="font-medium text-sky-600">
                        {athlete.firstname} {athlete.lastname}
                    </span>{" "}
                    - <span className="text-sky-500">{athlete.country}</span>
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;
