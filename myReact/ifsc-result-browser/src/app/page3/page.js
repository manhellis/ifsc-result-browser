import React from 'react';
import singleEvent from '../../data/singleEvent.json';
import EventPage from '../components/eventPage'
import FetchApi from '../components/fetchApi'

const route1 = '/get_csrf_token'
const route2 = '/get_leagues'
const Page = () => {
    // console.log(singleEvent.name)
    
    // console.log(singleEvent.d_cats);
    return (
        <div className='flex flex-col justify-center items-center'>
            <EventPage event={singleEvent} />
            <FetchApi route={'/'}/>
            
        </div>
    );
};


export default Page;
