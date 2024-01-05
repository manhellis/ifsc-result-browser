'use client'
import React, { useEffect, useState } from 'react';


const ApiComponent = ({ route }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(route);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchData();
    }, [route]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Display the received data */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ApiComponent;
