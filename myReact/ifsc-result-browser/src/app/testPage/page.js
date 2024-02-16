"use client";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
    const [inputValue, setInputValue] = useState("");

    return (
        <div>
            <h1>Welcome to the Default Page!</h1>
            <p>This is the default page in ReactJS.</p>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <Link
                href={
                    inputValue
                        ? `testPage/eventPage?query=${inputValue}`
                        : "testPage/eventPage"
                }
                className="bg-blue-300 hover:text-gray-300 mx-4"
            >
                Go to Event
            </Link>
        </div>
    );
};

export default Page;
