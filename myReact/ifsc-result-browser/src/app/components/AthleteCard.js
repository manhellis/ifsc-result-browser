const AthleteCard = ({ data }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-sky-200">
            <div className="px-6 py-4">
                <div className="grid grid-cols-2 justify-between items-center font-bold text-xl mb-2 text-sky-800">
                    <div>
                        {data.firstname} {data.lastname}
                    </div>
                    <img
                        className=""
                        src={data.flag_url}
                        alt={`Flag of ${data.country}`}
                    />
                </div>
                <p className="text-gray-700 text-base">
                    Federation: {data.federation.name}
                </p>
                <p className="text-gray-700 text-base">
                    Personal Best: {data.speed_personal_best.time}s in{" "}
                    {data.speed_personal_best.event_name}
                </p>
                <p className="text-gray-700 text-base">
                    Country: {data.country}, City: {data.city}
                </p>
                <p className="text-gray-700 text-base">
                    Age: {data.age}, Height: {data.height}cm
                </p>
            </div>
        </div>
    );
};

export default AthleteCard;
