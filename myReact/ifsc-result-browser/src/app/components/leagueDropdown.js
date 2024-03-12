import React, { useState, useEffect, useRef } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const LeagueDropdown = ({ leagues, onChange }) => {
    const [selectedLeague, setSelectedLeague] = useState("");
    const hasMounted = useRef(false);

    useEffect(() => {
        // Only set the initial state and call onChange if the component has not yet mounted
        if (!hasMounted.current && leagues.length > 0) {
            const firstLeagueId = leagues[0].season_id;
            setSelectedLeague(firstLeagueId);
            onChange(firstLeagueId);
            hasMounted.current = true; // Mark as mounted
        }
        // If you want to reset the selection when leagues change, include additional logic here
        // and remove the `hasMounted.current` check or handle it differently.
    }, [leagues, onChange]); // Dependency array ensures effect runs when leagues or onChange changes

    const handleSelectChange = (e) => {
        setSelectedLeague(e.target.value);
        onChange(e.target.value);
    };

    // Set initial selectedLeague state when leagues is first available
    // This is a fallback for any re-renders that might occur from leagues changing
    // Ensuring that we have a selectedLeague if leagues updates without re-mounting the component
    useEffect(() => {
        if (!selectedLeague && leagues.length > 0) {
            const firstLeagueId = leagues[0].season_id;
            setSelectedLeague(firstLeagueId);
            // Optionally call onChange here if you want to notify about the initial selection
        }
    }, [selectedLeague, leagues]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <DropdownMenuLabel>Select a league</DropdownMenuLabel>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {leagues.map((league) => (
                    <DropdownMenuItem
                        key={league.season_id}
                        value={league.season_id}
                        onClick={() => onChange(league.season_id)}
                    >
                        {league.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
    
    // return (
    //     <div>
    //         <select classname="text-xl"
    //         value={selectedLeague} onChange={handleSelectChange}>
    //             {leagues.map((league) => (
    //                 <option key={league.season_id} value={league.season_id}>
    //                     {league.name}
    //                 </option>
    //             ))}
    //         </select>
    //         {/* <p>Selected League ID: {selectedLeague}</p> */}
    //     </div>
    // );
};

export default LeagueDropdown;
