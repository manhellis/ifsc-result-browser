"use client";
import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";

function ResponseTable(responses) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Birthday</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Season</TableCell>
                    <TableCell>Rank</TableCell>
                    <TableCell>Discipline</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Event ID</TableCell>
                    <TableCell>Event Location</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Result URL</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {responses.map((item, index) => (
                    <TableRow key={index} hoverable>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.firstname}</TableCell>
                        <TableCell>{item.lastname}</TableCell>
                        <TableCell>{item.birthday}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>{item.country}</TableCell>
                        <TableCell>{item.all_results[0].season}</TableCell>
                        <TableCell>{item.all_results[0].rank}</TableCell>
                        <TableCell>{item.all_results[0].discipline}</TableCell>
                        <TableCell>{item.all_results[0].event_name}</TableCell>
                        <TableCell>{item.all_results[0].event_id}</TableCell>
                        <TableCell>
                            {item.all_results[0].event_location}
                        </TableCell>
                        <TableCell>
                            {item.all_results[0].category_name}
                        </TableCell>
                        <TableCell>{item.all_results[0].date}</TableCell>
                        <TableCell>{item.all_results[0].result_url}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}


const Page = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [data, setData] = useState([]); // Initialize state to hold the fetched data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    API_URL + "/all_results?season=2023&rank=1"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonData = await response.json();
                setData(jsonData); // Update state with the fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [API_URL]); // Dependency array to avoid re-fetching unnecessarily

    return (
        <main className="flex">
            <h2>Rankings!</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Birthday</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index} hoverable>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.firstname}</TableCell>
                            <TableCell>{item.lastname}</TableCell>
                            <TableCell>{item.birthday}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
};

export default Page;
