import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-start">
                <Link href="/" className="hover:text-gray-300 mx-4">
                    Home
                </Link>
                <Link href="/athlete" className="hover:text-gray-300 mx-4">
                    Athlete
                </Link>
                <Link href="/searchAthlete" className="hover:text-gray-300 mx-4">
                    Search

                </Link>

                {/* <Link href="/page2" className="hover:text-gray-300 mx-4">
            page2
        </Link>
        <Link href="/page3" className="hover:text-gray-300 mx-4">
            page3
        </Link>
        <Link href="/testPage" className="hover:text-gray-300 mx-4">
            testPage
        </Link> */}

                <Link href="/about" className="hover:text-gray-300 mx-4">
                    About
                </Link>

                {/* Add more <Link> components for other navigation items */}
            </div>
        </nav>
    );
};

export default Navbar;
