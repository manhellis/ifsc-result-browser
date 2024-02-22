'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AthleteCard from "../components/AthleteCard";

const replaceFlagUrlWithOpenSource = (athleteData) => {
    // Construct new flag URL with the open-source flag API
    const countryISO2 = getCountryISO2(athleteData?.country).toLowerCase();
    athleteData.flag_url = `https://flagcdn.com/w40/${countryISO2}.png`;
  };
const getCountryISO2 = require("country-iso-3-to-2");


const Page = () => {
    const API_BASE = "http://127.0.0.1:8000/athlete?";
    const searchParams = useSearchParams();
    const event_id = searchParams.get("id"); //
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let API_URL = API_BASE + "id=" + event_id 
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
    replaceFlagUrlWithOpenSource(data); // call replace

    if (isLoading) return <div>Loading...</div>; 
    return (
        <div >
            <AthleteCard data={data} />
        </div>
    )
}

export default Page;