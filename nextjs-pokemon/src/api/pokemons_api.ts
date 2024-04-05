import { IPokemon } from "@/models/pokemon_detail_model";
import PokemonResponse from "@/models/pokemon_model";
import PokemonStat from "@/models/pokemon_stat_model";
import PokemonsResponse from "@/models/pokemons_model";
import axios from "axios";

export async function fetchPokemons({pageParam}: {pageParam: number}): Promise<PokemonsResponse> {
	const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=20`)
	return res.data
}

export async function fetchPokemon(name: string): Promise<PokemonResponse> {
	const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
	return res.data	
}

export async function fetchPokemonsDetail({pageParam}: {pageParam: number}) : Promise<PokemonResponse[]> {
  let pokemons :PokemonResponse[] = [];
	const pokemonsResult = await fetchPokemons({pageParam})
	for (const pokemon of pokemonsResult.results){
		const detail = await fetchPokemon(pokemon.name)
		pokemons.push(detail)
	}
	return pokemons
}
export async function fetchPokemonType(url: string): Promise<PokemonTypeResponse> {
	const res = await axios.get(url)
	return res.data	
}

export async function fetchPokemonSpecies(url: string): Promise<PokemonSpeciesResponse> {
	const res = await axios.get(url)
	return res.data	
}

export async function fetchPokemonEvolutionChain(url: string): Promise<PokemonEvolutionChainResponse> {
	const res = await axios.get(url)
	return res.data	
}

export async function fetchPokemonDetail(name: string) : Promise<IPokemon> {
	let pokemonTypes: PokemonTypeResponse[] = [];
  let pokemonStat: PokemonStat = {};
  let firstPokemon: PokemonResponse | undefined;
  let secondPokemon: PokemonResponse | undefined;
  let secondPokemonMinLevel: number | undefined;
  let thirdPokemon: PokemonResponse | undefined;
  let thirdPokemonMinLevel: number | undefined;

	const pokemon = await fetchPokemon(name)

  for (const pokemonType of pokemon!.types) {
    const typeDetail = await fetchPokemonType(pokemonType.type.url);
    pokemonTypes.push(typeDetail);
  }

  let totalStat: number = 0;
  for (const stat of pokemon!.stats) {
    switch (stat.stat.name) {
      case "hp":
        pokemonStat[stat.stat.name] = {
          name: "HP",
          value: stat.base_stat,
          color: "bg-red-500",
        };
        break;
      case "attack":
        pokemonStat[stat.stat.name] = {
          name: "ATK",
          value: stat.base_stat,
          color: "bg-orange-500",
        };
        break;
      case "defense":
        pokemonStat[stat.stat.name] = {
          name: "DEF",
          value: stat.base_stat,
          color: "bg-yellow-500",
        };
        break;
      case "special-attack":
        pokemonStat[stat.stat.name] = {
          name: "SpA",
          value: stat.base_stat,
          color: "bg-sky-500",
        };
        break;
      case "special-defense":
        pokemonStat[stat.stat.name] = {
          name: "SpD",
          value: stat.base_stat,
          color: "bg-lime-500",
        };
        break;
      case "speed":
        pokemonStat[stat.stat.name] = {
          name: "SPD",
          value: stat.base_stat,
          color: "bg-pink-500",
        };
        break;
      default:
        break;
    }
    totalStat += stat.base_stat;
  }
  pokemonStat["total"] = {
    name: "TOT",
    value: totalStat,
    color: "bg-indigo-400",
  };

  const pokemonSpecies = await fetchPokemonSpecies(pokemon!.species.url);
  if (pokemonSpecies.evolution_chain.url.length > 0) {
    const pokemonEvolutionChain = await fetchPokemonEvolutionChain(
      pokemonSpecies.evolution_chain.url
    );

    firstPokemon = await fetchPokemon(
      pokemonEvolutionChain.chain.species?.name
    );
    if (pokemonEvolutionChain.chain.evolves_to[0].species?.name.length > 0) {
      secondPokemon = await fetchPokemon(
        pokemonEvolutionChain.chain.evolves_to[0].species?.name
      );
      secondPokemonMinLevel =
        pokemonEvolutionChain.chain.evolves_to[0]?.evolution_details[0]
          ?.min_level;
    }
    if (
      pokemonEvolutionChain.chain.evolves_to[0]?.evolves_to[0]?.species?.name
        .length > 0
    ) {
      thirdPokemon = await fetchPokemon(
        pokemonEvolutionChain.chain.evolves_to[0]?.evolves_to[0]?.species?.name
      );
      thirdPokemonMinLevel =
        pokemonEvolutionChain.chain.evolves_to[0]?.evolves_to[0]
          ?.evolution_details[0]?.min_level;
    }
  }

 let prev: PokemonResponse | undefined;
 if (pokemon.id > 1) {
    prev = await fetchPokemon((pokemon.id - 1).toString());
  }
  const next = await fetchPokemon((pokemon.id + 1).toString());

  const res: IPokemon = {
		pokemon: pokemon,
    pokemonTypes:  pokemonTypes,
    pokemonStat:     pokemonStat,
    firstPokemon:     firstPokemon,
    secondPokemon:     secondPokemon,
    secondPokemonMinLevel:     secondPokemonMinLevel,
    thirdPokemon:     thirdPokemon,
    thirdPokemonMinLevel:     thirdPokemonMinLevel,
		prevPokemon: prev,
		nextPokemon: next,
  };
	return res
}

export async function fetchItems(offset: number) : Promise<ItemResponse[]> {
  const items: ItemResponse[] = [];
  const res = await axios.get(`https://pokeapi.co/api/v2/item?offset=${offset}&limit=10`)
  const itemsResponse: ItemsResponse = res.data
  for (const v of itemsResponse.results) {
    const item = await fetchItem(v.url)
    items.push(item)
  }
  return items
}

export async function fetchItem(url: string): Promise<ItemResponse> {
  const res = await axios.get(url)
  return res.data
}