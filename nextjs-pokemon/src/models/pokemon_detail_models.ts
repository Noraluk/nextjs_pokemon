import PokemonResponse from "./pokemon_model";
import PokemonStat from "./pokemon_stat_models";

export interface IPokemon {
	pokemon: PokemonResponse
	pokemonTypes?: PokemonTypeResponse[]
  pokemonStat?: PokemonStat
	firstPokemon?: PokemonResponse
  secondPokemon?: PokemonResponse
  secondPokemonMinLevel?: number
  thirdPokemon?: PokemonResponse
  thirdPokemonMinLevel?: number
	prevPokemon?: PokemonResponse
	nextPokemon?: PokemonResponse
}
