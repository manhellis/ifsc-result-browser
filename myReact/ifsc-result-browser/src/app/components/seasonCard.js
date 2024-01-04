

const SeasonCard = ({season}) => { // pass in a seasons object
    const seasonName = season.season ? season.season : season.name;
    return (
        <>
            <div className="w-36 h-36 border border-gray-200 p-2 m-2 flex flex-col justify-center items-center rounded shadow-sm text-center overflow-hidden bg-white">
                
                <h3 className="text-sm font-semibold truncate">{seasonName}</h3>
                <p className="text-xs mt-1">{season.id}</p>
                <p className="text-xs mt-1">{season.url}</p>
                {/* <p className="text-xs mt-1">{season.leagues}</p> */}
            </div>
         
        </>
    )
}

export default SeasonCard;