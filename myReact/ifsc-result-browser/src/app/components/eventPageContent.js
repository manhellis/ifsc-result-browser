import React from 'react';
import EventPageCategory from './eventPageCategory';
import EventPageRound from './eventPageRound';


const EventPageContent = ({category}) => { // pass in category ( men or women )
    return (
        <div>
            <div className="card">
                <h2>{category.dcat_name}</h2>
                <p>{category.discipline_kind}</p>
                {/* Display other properties of the category object */}
                <EventPageRound round={category.category_rounds} />
            </div>
        </div>
    );
};

export default EventPageContent;
