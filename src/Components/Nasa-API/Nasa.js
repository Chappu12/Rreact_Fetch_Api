import React, { useEffect, useState } from "react";

const Nasa = () => {
    const [marsPhotos, setMarsPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rover, setRover] = useState("curiosity");
    const [sol, setSol] = useState(1000);
    const [page, setPage] = useState(1);

    const fetchPhotos = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(
                `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&api_key=DEMO_KEY`
            );
            const data = await response.json();
            if (data.photos) {
                setMarsPhotos(data.photos);
            } else {
                setMarsPhotos([]);
            }
        } catch (err) {
            setError("Failed to fetch Mars photos. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [rover, sol, page]);

    return (
        <div className="min-h-screen bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Mars Rover Photos</h1>
            <div className="flex justify-center gap-4 mb-4">
                <select
                    value={rover}
                    onChange={(e) => setRover(e.target.value)}
                    className="p-2 bg-gray-700 text-white"
                >
                    <option value="curiosity">Curiosity</option>
                    <option value="opportunity">Opportunity</option>
                    <option value="spirit">Spirit</option>
                </select>
                <input
                    type="number"
                    value={sol}
                    onChange={(e) => setSol(e.target.value)}
                    className="p-2 bg-gray-700 text-white"
                    placeholder="Enter Sol (Martian day)"
                />
                <button
                    onClick={() => setPage(1)}
                    className="p-2 bg-blue-600 hover:bg-blue-700"
                >
                    Fetch Photos
                </button>
            </div>

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && marsPhotos.length === 0 && (
                <p className="text-center">No photos available for the selected criteria.</p>
            )}

            <div className="flex flex-wrap justify-center">
                {marsPhotos.map((item) => (
                    <div
                        key={item.id}
                        className="m-2 p-4 bg-gray-900 text-white w-60 rounded shadow-lg"
                    >
                        <img
                            src={item.img_src}
                            alt={`Mars Rover Photo ${item.id}`}
                            className="w-full h-40 object-cover mb-2"
                        />
                        <p className="text-sm">ID: {item.id}</p>
                        <p className="text-sm">Camera: {item.camera.full_name}</p>
                        <p className="text-sm">Earth Date: {item.earth_date}</p>
                    </div>
                ))}
            </div>

            {marsPhotos.length > 0 && (
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="p-2 bg-gray-700 hover:bg-gray-600"
                        disabled={page === 1}
                    >
                        Previous Page
                    </button>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="p-2 bg-gray-700 hover:bg-gray-600"
                    >
                        Next Page
                    </button>
                </div>
            )}
        </div>
    );
};

export default Nasa;
