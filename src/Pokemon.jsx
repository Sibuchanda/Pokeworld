import React, { useEffect } from 'react'
import { useState } from 'react';
import PokemonCard from './components/PokemonCard';
import { FaLinkedin } from "react-icons/fa";

const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";


    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            const detailedPokemonData = data.results.map(async (currData) => {
                const res = await fetch(currData.url);
                const data = await res.json();
                return data;
            });
            const detailedResponse = await Promise.all(detailedPokemonData);
            console.log(detailedResponse);
            setPokemon(detailedResponse);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err);

        }
    }

    useEffect(() => {
        fetchPokemon();
    }, []);


    // ----- Search function -----
    const searchData = pokemon.filter((currPokemon) => currPokemon.name.toLowerCase().includes(search.toLowerCase()));

    // ------ For Loading ------- 
    if (loading)
        return (
            <div className='w-screen h-screen bg-amber-100 flex justify-center items-center'>
                <h1 className='font-bold text-4xl'>Loading...</h1>
            </div>
        )
    // ---------- For Error ----------
    if (error)
        return (
            <div className='w-screen h-screen bg-amber-100 flex justify-center items-center'>
                <h1 className='font-bold text-4xl'>{error.message}</h1>
            </div>
        )


    return (
        <>
            <section className='w-full h-full bg-white flex flex-col items-center mb-10'>
                <header className='flex flex-col gap-6 w-full h-auto items-center'>
                    <h1 className="text-6xl crazy-font text-center mt-4 max-[450px]:text-4xl">
                        Pokeworld
                    </h1>
                    <div className="searchSection bg-black w-full h-auto flex items-center justify-center py-10 mt-6">
                        <input type="text" className='w-sm h-10 bg-white rounded-md outline-none pl-2 focus:border-2 border-blue-500 max-[450px]:w-xs max-[380px]:w-40 max-[380px]:h-10' placeholder='Ssearch Pokemon' value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </header>

                <ul className='card mt-6 grid grid-cols-4 gap-6 max-[650px]:grid-cols-1 max-[900px]:grid-cols-2 max-[1300px]:grid-cols-3'>
                    {
                        // pokemon.map((currPokemon)=>{
                        searchData.map((currPokemon) => {
                            return (
                                <PokemonCard key={currPokemon.id} pokemonData={currPokemon} />
                            );
                        })
                    }
                </ul>
            </section>
            {/* Footer section  */}
            <div className="w-full flex flex-col justify-center items-center mb-5">
                <div className="flex justify-center items-center gap-4">
                    <div className="w-20 h-[2px] bg-black"></div>
                    <p className="text-md font-sans font-bold text-gray-500"> Pokeworld developed with ReactJs by </p>
                    <div className="w-20 h-[2px] bg-black"></div>
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <p className="text-md font-bold text-gray-500"> Sibu Chanda</p>
                    <a href="https://linkedin.com/in/sibu-chanda" className='cursor-pointer'><FaLinkedin /></a>
                </div>
            </div>
        </>
    )
}

export default Pokemon;
