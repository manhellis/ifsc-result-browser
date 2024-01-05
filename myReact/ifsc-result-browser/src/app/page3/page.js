import React from 'react';
import singleEvent from '../../data/singleEvent.json';
import EventPage from '../components/eventPage'


const Page = () => {
    // console.log(singleEvent.name)
    
    // console.log(singleEvent.d_cats);
    return (
        <div className='flex flex-col justify-center items-center'>
            <EventPage event={singleEvent} />
            
        </div>
    );
};

export default Page;
