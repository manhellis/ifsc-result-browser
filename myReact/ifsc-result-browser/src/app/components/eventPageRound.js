import React from 'react';

const EventPageRound = ({round}) => {
    // Your component logic goes here

    return (
        // Your JSX code goes here
        <div>
            {round.map((r, index) => (
                <div key={index}>
                    <h3>{r.kind}</h3>
                    <p>{r.name}</p>
                    <p>{r.category}</p>
                    <p>{r.format}</p>
                </div>
            ))}
        </div>
    );
};

export default EventPageRound;
