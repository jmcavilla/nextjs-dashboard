import { Pokemon, PokemonsResponse } from "@/pokemons";
import PokemonPageCard from "@/pokemons/components/PokemonPageCard";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";


interface Props {
    params: { name: string };
}

//! Build Time
export async function generateStaticParams() {

    const data : PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`).then( res => res.json());

    const staticPokemons = data.results.map(pokemon => ({
        name: pokemon.name
    }));

    return staticPokemons.map( ({name}) => ({
        name: name
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try{
        const { id, name } = await getPokemon(params.name);

        return {
            title: `#${id} - ${name}`,
            description: `Pagina del Pokemon ${name}`
        }
    } catch (Error) {
        return {
            title: `Pagina del pokemon`,
            description: `Pagina del Pokemon`
        }
    }
    
}

const getPokemon = async (name: string): Promise<Pokemon> => {
    try {    
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, { cache: 'force-cache' }).then(res => res.json());
    } catch (error) {
        notFound();
    }
}

export default async function PokemonPage({ params }: Props) {
    const { name } = params;

    const pokemon = await getPokemon(name);

    return (
        <PokemonPageCard pokemon={ pokemon } />
    );
}