import React from 'react';
import singleEvent from '../../data/singleEvent.json';
import EventPageHeader from '../components/eventPageHeader';
import EventPageContent from '../components/eventPageContent';


const Page = () => {

    
    // console.log(singleEvent.d_cats);
    return (
        <div className='flex flex-col justify-center items-center'>
            <EventPageHeader eventPage={singleEvent} />
            {singleEvent.d_cats.map((cat, index) => (
                <EventPageContent key={index} category={cat} />
            ))}
        </div>
    );
};

export default Page;
