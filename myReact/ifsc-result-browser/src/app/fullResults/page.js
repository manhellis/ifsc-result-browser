"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import RouteResult from "../components/RouteResult";

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

const TopCard = ({ route }) => {
    const cardBaseStyle = "border rounded-lg p-4 mb-4";
    const cardHighlightStyle = route.top ? "bg-blue-400" : "bg-blue-200";

    return (
        <div className={`${cardBaseStyle} ${cardHighlightStyle}`}>
            <h2 className="text-lg font-semibold">{`Route Name: ${route.route_name}`}</h2>
            <p>{`Top: ${route.top ? "Yes" : "No"} (Tries: ${
                route.top_tries
            })`}</p>
            <p>{`Zone: ${route.zone ? "Yes" : "No"} (Tries: ${
                route.zone_tries
            })`}</p>
        </div>
    );
};

// maybe inside the modal compare boulder ranks? very advanced feature
const Modal = ({ closeModal, data, name }) => {
    // Function to close modal on Escape key press
    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    };

    // Adding event listeners when component mounts
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        // Clean-up function to remove event listeners when component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []); // Empty dependency array to ensure this runs only once on mount

    // Closing modal when clicking outside the modal's content
    // Assuming the modal overlay (backdrop) has a ref of modalRef
    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        // Handling clicks outside the modal
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Clean-up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Ensure the modalRef is accessed properly in the dependency array

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40">
            <div
                className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md p-4 overflow-hidden bg-white shadow-xl transition-transform transform translate-x-0"
                style={{ transition: "transform .3s ease-in-out" }}
                ref={modalRef} // IMPORTANT: This is where the div is set to be checked for the 'outside click'
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{data?.round_name}</h2>
                    <button
                        onClick={closeModal}
                        className="text-lg font-semibold"
                    >
                        &times;
                    </button>
                </div>
                <div className="mt-4">
                    <p>
                        <strong>Name: </strong>
                        {name}
                    </p>
                    <p>
                        <strong>Round Name: </strong>
                        {data?.round_name}
                    </p>
                    {data?.score && (
                        <p>
                            <strong>Score:</strong> {data.score}
                        </p>
                    )}
                    {/* Dynamic content */}

                    {data?.ascents &&
                        data.ascents.map((route) => (
                            <div className="flex flex-row">
                                <TopCard key={route.route_id} route={route} />
                            </div>
                        ))}
                </div>
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
    const [isComponentVisible, setIsComponentVisible] = useState(false);

    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalState, setModalState] = useState({
        isOpen: false,
        data: null,
        name: null,
    });

    const toggleComponentVisibility = () => {
        setIsComponentVisible(!isComponentVisible);
    };

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

    if (isLoading) return <div>Loading...</div>; // do i need to add error checking or will all these apis be converted to nextjs data fetching
    return (
        <div>
            <h1 className="text-2xl">
                {data.event} - id:
                <span className="text-blue-500">{event_id} </span>
                cid:<span className="text-blue-500">{category_id}</span>
                <button
                    onClick={toggleComponentVisibility}
                    className="bg-lime-400 p-4 hover:bg-lime-700 transition-colors"
                >
                    Toggle Component
                </button>
                {/* <div>
                    <button
                        className="bg-lime-400 p-4 hover:bg-lime-700 transition-colors"
                        onClick={toggleModal}
                    >
                        Toggle Modal
                    </button>
                    
                </div> */}
            </h1>
            {modalState.isOpen && (
                <Modal
                    data={modalState.data}
                    closeModal={() =>
                        setModalState({ isOpen: false, data: null })
                    }
                    name={modalState.name}
                />
            )}
            {isComponentVisible ? ( // huge ternary to toggle route view of full result or ranking view
                <RouteResult data={data} />
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row items-center justify-between w-6/12 px-6 pt-6 bg-white">
                        <h1 className="text-lg text-blue-600">
                            Ranking - Name
                        </h1>
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
                                    <div className="flex flex-col items-end">
                                        {ranking.rounds.map((round) => {
                                            return (
                                                <button
                                                    className="hover:text-sky-700 transition-colors"
                                                    key={round.round_id}
                                                    onClick={() =>
                                                        setModalState({
                                                            isOpen: true,
                                                            data: round,
                                                            name: ranking.name,
                                                        })
                                                    }
                                                >
                                                    {round.round_name + " "}
                                                </button>
                                            );
                                        })}

                                        {/* <Rounds rounds={ranking.rounds} /> */}
                                    </div>
                                </div>
                            );
                        })}
                    {/* <AthleteRow data={data} /> */}
                </div>
            )}
        </div>
    );
};

export default Page;
