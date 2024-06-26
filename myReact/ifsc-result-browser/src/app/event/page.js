"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import EventPage from "../components/eventPage";

// const API_BASE = "http://127.0.0.1:8000/event?";
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("id"); // Get the query parameter from the URL - event id
    const btnStyle =
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded";

    const [data, setData] = useState({ event: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    let API_URL = `${API_BASE}/event?id=${search}`;
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
                setData(jsonData); // Assuming the JSON structure matches your data variable
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    let discipline_color = " bg-white";

    // Assign colors based on the combinations of disciplines


    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                {/* <div className="flex flex-row items-start justify-start w-full">
                    <button className={btnStyle} onClick={() => router.back()}>
                        Back
                    </button>
                    
                </div> */}

                <EventPage event={data} />
            </div>
        </div>
    );
};

export default Page;
