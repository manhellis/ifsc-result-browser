"use client";
import { Suspense } from 'react'; // Step 1: Import Suspense
import { useSearchParams } from "next/navigation";
import AthleteCard from "../components/AthleteCard";
import SuggestedAthletes from "../components/SuggestedAthletes";

const Page = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Suspense fallback={<div>Loading...</div>}> {/* Step 2: Wrap with Suspense */}
                <SearchResults />
            </Suspense>
        </div>
    );
};

const SearchResults = () => {
    const searchParams = useSearchParams(); // Moved useSearchParams inside another component

    // Determine what to render based on searchParams
    // i think suggested athletes should be static? or server generated? idk how this works
    return searchParams.size ? <AthleteCard /> : <SuggestedAthletes />;
}

export default Page;
