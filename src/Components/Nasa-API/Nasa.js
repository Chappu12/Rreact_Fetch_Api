import React, { useEffect, useState } from 'react';

const Nasa = () => {
    const [mars, setMars] = useState({ photos: [] });

    useEffect(() => {
        fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY")
            .then((response) => response.json()) // Corrected
            .then((data) => setMars(data)); // Removed unnecessary braces
    }, []);

    return (
        <div className='flex w-screen bg-gray-600 overflow-x-hidden'>
            {mars.photos.map((item) => (
                <div className='m-2 p-4 flex bg-black w-20 text-sky-400'>
                    <p key={item.id}>{item.id}</p> 
                </div>
            ))}
        </div>
    );
};

export default Nasa;
