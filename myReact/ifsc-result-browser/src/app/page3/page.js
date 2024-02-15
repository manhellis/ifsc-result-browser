'use client'
import React from 'react';

import singleEvent from '../../data/singleEvent.json';
import EventPage from '../components/eventPage'
import { useLocation} from "next/navigation"
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const { key } = router.query;
    return (
        <div className='flex flex-col justify-center items-center'>
            <div>Data: {key}</div>
            <EventPage event={singleEvent} />
            
        </div>
    );
};


export default Page;
