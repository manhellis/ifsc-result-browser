"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// import { convertIocCode } from "convert-country-codes/test";
// import AthleteCard from "../components/AthleteCard";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const replaceFlagUrlWithOpenSource = (athleteData) => {
    const [iso2, iso3] = convertIocCode(athleteData.country); // rest should be iso3
    console.log(convertIocCode(athleteData.country));
    if (!iso2) {
        console.error("Invalid country code for", athleteData);
        return athleteData; // Return original data if no valid country code found
    }
    athleteData.flag_url = `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`; // overwrting ifsc result cdn
    return athleteData;
};
// const FlagImg = (flag_url) => {

//     const [iso2, iso3] = convertIocCode(flag_url); // rest should be iso3
//     if (!iso2) {
//         console.error("Invalid country code for", athleteData);
//         return; // Return original data if no valid country code found
//     }
//     const new_flag_url = `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`; // overwrting ifsc result cdn

//     return <img className="" src={new_flag_url}></img>;
// };

const CreateFullResultLink = (result_url) => {
    // (7) ["", "api", "v1", "events", "1308",
    let url = result_url.split("/");
    return (
        <Link className="underline text-blue-500 hover:text-blue-800"
        href={`/fullResults?id=${url[4]}&cid=${url[6]}`}>See Event</Link>
    );
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
                const jsonData = await response.json();
                // const updatedData = replaceFlagUrlWithOpenSource(jsonData);
                setData(jsonData);

                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [event_id]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className=" rounded overflow-hidden shadow-lg bg-white border border-sky-200">
            <div className="flex flex-col items-center px-6 py-4">
                <div className="grid grid-cols-2 justify-between items-center font-bold text-xl mb-2 text-sky-800">
                    <div className="text-3xl">
                        {data.firstname} {data.lastname}
                    </div>
                    {/* <FlagImg /> */}
                    <img
                        className="w-10 ml-2"
                        src={data.flag_url}
                        alt={data.country}
                    />
                </div>
                <div className="flex flex-col ">
                    {data.federation && (
                        <p className="text-gray-700 text-base">
                            <span className="font-bold">Federation:</span>{" "}
                            {data?.federation.name}
                        </p>
                    )}

                    <p className="text-gray-700 text-base py-2">
                        <span className="font-bold">Personal Best:</span>{" "}
                        {data?.speed_personal_best?.time}s in{" "}
                        {data?.speed_personal_best?.event_name}
                    </p>
                    <p className="text-gray-700 text-base py-2">
                        <span className="font-bold">Country:</span>{" "}
                        {data.country}, City: {data.city}
                    </p>
                    <p className="text-gray-700 text-base py-2">
                        <span className="font-bold">Age:</span> {data.age},
                        Height: {data.height}cm
                    </p>
                </div>
            </div>
            {/* total podiums */}
            <div className="flex flex-row justify-center px-6 py-4">
                {data.discipline_podiums.map((discipline) => (
                    <div key={discipline.discipline_kind} className="m-4">
                        <h3 className="font-bold text-sky-600 capitalize">
                            {discipline.discipline_kind}
                        </h3>
                        <div className="flex flex-col items-left">
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
            {/* all event results */}
            <div className="px-6 py-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Season</TableHead>
                            <TableHead>Rank</TableHead>
                            <TableHead>Discipline</TableHead>
                            <TableHead>Event Name</TableHead>
                            <TableHead>Event ID</TableHead>
                            <TableHead>Event Location</TableHead>
                            <TableHead>Category Gender</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Result URL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.all_results.map((result) => (
                            <TableRow key={result.event_id} hoverable>
                                <TableCell>{result.season}</TableCell>
                                <TableCell>{result.rank}</TableCell>
                                <TableCell>{result.discipline}</TableCell>
                                <TableCell>{result.event_name}</TableCell>
                                <TableCell>{result.event_id}</TableCell>
                                <TableCell>{result.event_location}</TableCell>
                                <TableCell>{result.category_name}</TableCell>
                                <TableCell>{result.date}</TableCell>
                                <TableCell>
                                    {CreateFullResultLink(result.result_url)}
                                    {/* <Link
                                        href={`/fullResults?id=${
                                            result.result_url.split("/")[4]
                                        }&cid=${
                                            result.result_url.split("/")[6]
                                        }`}
                                    >
                                        See Event
                                    </Link> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AthleteCard;
