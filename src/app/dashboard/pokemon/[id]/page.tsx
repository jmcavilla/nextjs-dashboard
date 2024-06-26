import { Pokemon } from "@/pokemons";
import PokemonPageCard from "@/pokemons/components/PokemonPageCard";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";


interface Props {
    params: { id: string };
}

//! Build Time
export async function generateStaticParams() {

    const staticPokemons = Array.from({ length: 151 }).map( (v,i) => `${i+1}`)

    return staticPokemons.map( id => ({
        id: id
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try{
        const { id, name } = await getPokemon(params.id);

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

const getPokemon = async (id: string): Promise<Pokemon> => {
    try {    
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { cache: 'force-cache' }).then(res => res.json());
    } catch (error) {
        notFound();
    }
}

export default async function PokemonPage({ params }: Props) {
    const { id } = params;

    const pokemon = await getPokemon(id);

    return (
        <PokemonPageCard pokemon={ pokemon } />
    );
}