import React from 'react'

const PokemonCard = ({pokemonData}) => {
  return (
   <>
      <li className='w-80 h-auto bg-gray-200 rounded-md shadow-md hover:shadow-xl hover:bg-blue-100 flex flex-col items-center cursor-pointer max-[285px]:w-60'>
                        <figure className='mt-2'>
                            <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} className='w-30 h-30' />
                        </figure>
                        <h1 className='text-3xl font-bold mt-2'>{pokemonData.name}</h1>
                        <p className='bg-green-300 font-bold rounded-xl p-2 mt-2'> {pokemonData.types.map((currType)=>currType.type.name).join(",")} </p>
                        <div className="attributes grid grid-cols-2 p-2 my-4 gap-2 mt-4">
                            <p className='font-bold text-xs bg-blue-300 rounded-md p-3'>Height : {pokemonData.height}</p>
                            <p className='font-bold text-xs bg-blue-300 rounded-md p-3'>Weight : {pokemonData.weight}</p>
                            <p className='font-bold text-xs bg-blue-300 rounded-md p-3'>Speed : {pokemonData.stats[5].base_stat} </p>
                            <p className='font-bold text-xs bg-blue-300 rounded-md p-3'>Experience : <span> {pokemonData.base_experience} </span></p>
                            <p className='font-bold text-xs bg-blue-300 rounded-md p-3'>Attack : <span> {pokemonData.stats[1].base_stat}  </span></p>
                            <div className='flex flex-col items-center font-bold text-xs bg-blue-300 rounded-md p-3'>
                            <p className='font-bold text-xs'>Abilities : </p>
                            <p className='font-bold text-xs'>{pokemonData.abilities.map((currData) => currData.ability.name).slice(0,1).join(", ")}</p>
                            </div>
                        </div>
                    </li>
   </>
  )
}

export default PokemonCard;
