import React from 'react';
import DataSeasons from '../components/data_seasons';
function Page() {
    const text = "season_2023.json"
    return (
        <div>
            <h1>Welcome to the Default Page!</h1>
            <p>This is the default page in ReactJS.</p>
            <DataSeasons fileName={text}/>
        </div>
    );
}

export default Page;
