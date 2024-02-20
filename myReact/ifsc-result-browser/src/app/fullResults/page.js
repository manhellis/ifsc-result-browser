"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// this whole page should be componentized?? but i will dev it here first

const AthleteRow = (data) => {
    // map the ranking list from full result
    return <></>;
};

const Rounds = (rounds) => {
    // pass in a rounds obj from athlete - can be 1-3 rounds depending onresult if made final, semi etc.
    return (
        <>
            {/* <h2>Rounds</h2> */}
            <p>
                {Array.isArray(rounds) &&
                    rounds.map((roundName) => {
                        // quali obj, or semi or final
                        return (
                            <>
                                <h1>{roundName.round_name}</h1>
                            </>
                        );
                    })}
            </p>
        </>
    );
};

const Modal = ({ closeModal, content }) => {
    // pass in the athlete data and create a modal

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={closeModal}>
                    Close
                </button>
                <p>{content.event}</p> {/* Display the passed-in content */}
            </div>
        </div>
    );
};

const Page = () => {
    const API_BASE = "http://127.0.0.1:8000/fullResults?";
    const searchParams = useSearchParams();
    const event_id = searchParams.get("id");
    const category_id = searchParams.get("cid");
    const [data, setData] = useState({ ranking: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    let API_URL = API_BASE + "id=" + event_id + "&cid=" + category_id;
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

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    if (isLoading) return <div>Loading...</div>; // do i need to add error checking or will all these apis be converted to nextjs data fetching
    return (
        <div>
            <h1 className="text-2xl">
                {data.event} - id:
                <span className="text-blue-500">{event_id} </span>
                cid:<span className="text-blue-500">{category_id}</span>
                <div>
                    <button
                        className="bg-lime-400 p-4 hover:bg-lime-700 transition-colors"
                        onClick={toggleModal}
                    >
                        Toggle Modal
                    </button>
                    {isModalOpen && (
                        <Modal
                            content={data}
                            closeModal={toggleModal}
                        />
                    )}
                </div>
            </h1>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-between w-6/12 px-6 pt-6 bg-white">
                    <h1 className="text-lg text-blue-600">Ranking - Name</h1>
                    <h1 className="text-lg text-blue-600">Result</h1>
                </div>
                {/* Ensure data.ranking exists and is an array before mapping, idk why it works */}
                {Array.isArray(data.ranking) &&
                    data.ranking.map((ranking) => {
                        return (
                            <div
                                className="flex flex-row justify-between items-center w-6/12 h-36 p-6 border-green-50 bg-white hover:bg-sky-200 transition-all"
                                key={ranking.athlete_id}
                            >
                                {/* left side */}
                                <div className="">
                                    <h2>
                                        <span className="text-2xl">
                                            {ranking.rank}
                                            {". "}
                                        </span>
                                        <span className="text-xl">
                                            {ranking.firstname}{" "}
                                            {ranking.lastname}
                                        </span>
                                    </h2>
                                    <p>{ranking.athlete_id}</p>
                                    <p>{ranking.country}</p>
                                </div>

                                {/* right side, on click text slide out window */}
                                <div className="">
                                    {ranking.rounds.map((round) => {
                                        return (
                                            <h1 className="hover:text-sky-700 transition-colors">
                                                {round.round_name + " "}
                                            </h1>
                                        );
                                    })}

                                    {/* <Rounds rounds={ranking.rounds} /> */}
                                </div>
                            </div>
                        );
                    })}
                {/* <AthleteRow data={data} /> */}
            </div>
        </div>
    );
};

export default Page;
