'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

const Page = () => {
    const searchParams = useSearchParams();

    const search = searchParams.get('query');

    return (
        <div>
            <Link href="/testPage">
                Back
            </Link>
            <h1 className='text-4xl text-pink-600'>Welcome to the Default Page!</h1>
            <h2 className='text-2xl text-blue-600'>{search ? "your query: " + search : 'no query'}</h2>
        </div>
    );
}

export default Page;
