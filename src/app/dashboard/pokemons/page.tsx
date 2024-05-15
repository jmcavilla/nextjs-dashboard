import { PokemonGrid, PokemonsResponse, SinglePokemon } from "@/pokemons";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata = {
 title: '151 Pokemons',
 description: '151 Pokemons',
};

const getPokemons = async (limit = 20, offset= 0) : Promise<SinglePokemon[]> => {
    const data : PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ limit }&offset=${ offset }`).then( res => res.json());

    const pokemons = data.results.map(pokemon => ({
        id: pokemon.url.split('/').at(-2)!,
        name: pokemon.name
    }));

    // throw new Error('Esto es un error que no deberia de suceder')
    // throw notFound();

    return pokemons;
}



export default async function NamePage() {
    const pokemons = await getPokemons(151);
    return (
        <div className="flex flex-col">
            <span className="text-5xl my-2">
                Listado de Pokèmons <small>estatico</small>
            </span>
            <PokemonGrid pokemons={pokemons} />
        </div>
    );
}