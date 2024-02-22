import Link from "next/link";

const SuggestedAthletes = () => {
    return (
        <div>
            <h1 className="text-2xl p-2">Suggested Athletes</h1>
            <Link href="/athlete?id=1364">
                <h1 className="p-4 text-sky-700 hover:text-sky-300">Adam Ondra</h1>
            </Link>
            <Link href="/athlete?id=1147">
                <h1 className="p-4 text-sky-700 hover:text-sky-300">Janja Garnbret</h1>
            </Link>
        </div>
    )
};
export default SuggestedAthletes
