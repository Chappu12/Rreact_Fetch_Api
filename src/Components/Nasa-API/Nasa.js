import React, { useEffect, useState } from 'react';

const Nasa = () => {
    const [mars, setMars] = useState({ photos: [] });

    useEffect(() => {
        fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY")
            .then((response) => response.json())
            .then((data) => {
                if (data && data.photos) {
                    setMars(data); // Ensure data structure matches
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="flex w-screen bg-gray-600 overflow-x-hidden flex-wrap">
            {mars.photos.map((item) => (
                <div className="m-2 p-4 flex bg-black w-40 text-sky-400" 
                    key={item.id}>
                    <p>{item.id}</p>
                </div>
            ))}
        </div>
    );
};

export default Nasa;
