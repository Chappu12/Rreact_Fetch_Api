import React, { useEffect, useState } from 'react'

const Poke = () => {
    const [poke, setPoke] = useState();
    const pokeData = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
        const data = await response.json();
        console.log(data)
    }

    pokeData()
    return (
        <>
            <div>
                {

                }
            </div>
        </>
    )
}

export default Poke