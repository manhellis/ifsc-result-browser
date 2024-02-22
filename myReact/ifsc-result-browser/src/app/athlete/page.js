"use client";
import { useSearchParams } from "next/navigation";
import AthleteCard from "../components/AthleteCard";
import SuggestedAthletes from "../components/SuggestedAthletes";

const Page = () => {
    const searchParams = useSearchParams();
    return (
        <div className="flex flex-col justify-center items-center">
            {/* ternary, if queried show the card, else, show top athletes, or default idk, ranking */}
            {searchParams.size ? <AthleteCard /> : <SuggestedAthletes />} 
        </div>
    );
};

export default Page;
