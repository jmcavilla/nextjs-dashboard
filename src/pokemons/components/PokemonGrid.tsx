import React from 'react'
import { SinglePokemon } from '../interfaces/simple-pokemon'
import { PokemonCard } from './PokemonCard'

interface Props {
    pokemons: SinglePokemon[]
}
export const PokemonGrid = ({ pokemons }: Props) => {
    return (
        <div className="flex flex-wrap gap-10 items-center justify-center">
            {
                pokemons.map(pokemon => (
                    <PokemonCard key={ pokemon.id } pokemon={pokemon}/>
                ))
            }

        </div>
    )
}
