import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [poke, setPoke] = useState([]);
    useEffect(() => {
        const pokeData = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
                const data = await response.json();
                console.log(data.results)
            } catch (error) {
                console.error(error)
            }
        };
        pokeData();
    },[])

    return (
        <div className="text-slate-950">
            {
                poke.map((pokemon, index) => {
                    <li key={index}>{pokemon.name}</li>
                })
            }
        </div>
    );
}

export default App;
