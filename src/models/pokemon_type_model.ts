interface PokemonTypeResponse {
  damage_relations: Damagerelations;
  game_indices: Gameindex[];
  generation: Doubledamagefrom;
  id: number;
  move_damage_class: Doubledamagefrom;
  moves: Doubledamagefrom[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: Pokemon[];
}

interface Pokemon {
  pokemon: Doubledamagefrom;
  slot: number;
}

interface Name {
  language: Doubledamagefrom;
  name: string;
}

interface Gameindex {
  game_index: number;
  generation: Doubledamagefrom;
}

interface Damagerelations {
  double_damage_from: Doubledamagefrom[];
  double_damage_to: Doubledamagefrom[];
  half_damage_from: Doubledamagefrom[];
  half_damage_to: Doubledamagefrom[];
  no_damage_from: any[];
  no_damage_to: any[];
}

interface Doubledamagefrom {
  name: string;
  url: string;
}