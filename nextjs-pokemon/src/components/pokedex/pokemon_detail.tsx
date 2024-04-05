import { fetchPokemonDetail } from "@/api/pokemons_api";
import { color, pokemonType } from "@/constants/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { MoonLoader } from "react-spinners";

export async function PokemonDetail({
  pokemonName,
  setPokemonName,
}: {
  pokemonName: string;
  setPokemonName: Dispatch<SetStateAction<string>>;
}) {
  const stats = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];

  const pd = await fetchPokemonDetail(pokemonName);

  return (
    <div className="flex flex-col items-center h-full mb-1 mx-1">
      <Image
        src={pd?.pokemon.sprites?.other["official-artwork"].front_default ?? ""}
        alt=""
        width="0"
        height="0"
        sizes="100vw"
        className="w-auto h-48 -top-28 absolute"
      />
      <div className="mt-20 flex flex-col items-center justify-between text-center grow">
        <p className="text-sm text-gray-400 font-bold">{`#${pd?.pokemon.id}`}</p>
        <p className="text-3xl font-bold capitalize">{pd?.pokemon.name}</p>
        <div className="flex gap-2 justify-center">
          {pd?.pokemon.types?.map((e, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: color[e.type.name],
                }}
                className="rounded-lg p-3"
              >
                <p className="text-sm/[1px] font-bold uppercase">
                  {e.type.name}
                </p>
              </div>
            );
          })}
        </div>
        <p className="font-bold text-sm">POKEDEX ENTRY</p>
        <p className="text-sm leading-tight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          consequatur?
        </p>
        <p className="font-bold uppercase text-sm">abilities</p>
        <div className="grid grid-flow-col gap-2 justify-stretch w-4/5">
          {pd?.pokemon.abilities?.map((ability, index) => {
            return (
              <div
                key={index}
                className="flex items-center rounded-xl bg-slate-100 border border-red-800 w-full"
              >
                <p className="text-start px-3 text-sm py-1 font-bold capitalize">
                  {ability.ability.name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 w-full px-5 gap-x-4 gap-y-1">
          <p className="font-bold">height</p>
          <p className="font-bold">weight</p>
          <div className="bg-gray-200 rounded-xl">
            <p>{`${pd?.pokemon.height}m`}</p>
          </div>
          <div className="bg-gray-200 rounded-xl">
            <p>{`${pd?.pokemon.weight}kg`}</p>
          </div>
          <p className="font-bold">weakness</p>
          <p className="font-bold">base exp</p>
          <div className="bg-gray-200 rounded-xl grow flex justify-center items-center">
            <div className="flex gap-1 overflow-x-scroll w-20 no-scrollbar">
              {pd?.pokemonTypes?.map((e) =>
                e.damage_relations.double_damage_from.map((e2, index) => {
                  return (
                    <Image
                      key={index}
                      src={pokemonType[e2.name]}
                      width={0}
                      height={0}
                      alt=""
                      className="w-auto h-4"
                    />
                  );
                })
              )}
            </div>
          </div>
          <div className="bg-gray-200 rounded-xl">
            <p>{pd?.pokemon.base_experience}</p>
          </div>
        </div>
        <p className="font-bold uppercase text-sm">stats</p>
        {pd?.pokemonStat && (
          <div className="flex gap-x-2">
            {stats.map((stat, index) => {
              return (
                <Stat
                  key={index}
                  name={pd?.pokemonStat![stat].name}
                  value={pd?.pokemonStat![stat].value}
                  color={pd?.pokemonStat![stat].color}
                />
              );
            })}
            <Stat
              name={pd.pokemonStat!["total"].name}
              value={pd.pokemonStat!["total"].value}
              color={pd.pokemonStat!["total"].color}
            />
          </div>
        )}
        <p className="font-bold uppercase text-sm">evolution</p>
        <div className="flex items-center justify-center gap-2">
          {pd?.firstPokemon && (
            <Image
              src={
                pd?.firstPokemon?.sprites?.other["official-artwork"]
                  .front_default ?? ""
              }
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto h-14"
            />
          )}
          <div className="bg-gray-200 rounded-full py-1 px-1.5">
            <p
              style={{ fontSize: "10px" }}
              className="text-slate-500 font-bold"
            >{`Lvl ${pd?.secondPokemonMinLevel ?? "?"}`}</p>
          </div>
          {pd?.secondPokemon && (
            <Image
              src={
                pd?.secondPokemon?.sprites?.other["official-artwork"]
                  .front_default ?? ""
              }
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto h-14"
            />
          )}
          <div className="bg-gray-200 rounded-full py-1 px-1.5">
            <p
              style={{ fontSize: "10px" }}
              className="text-slate-500 font-bold"
            >{`Lvl ${pd?.thirdPokemonMinLevel ?? "?"}`}</p>
          </div>
          {pd?.thirdPokemon && (
            <Image
              src={
                pd?.thirdPokemon?.sprites?.other["official-artwork"]
                  .front_default ?? ""
              }
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto h-14"
            />
          )}
        </div>
        <div className="flex w-full h-14 bg-gray-200 rounded-2xl items-center">
          <div className="w-1/2 h-full flex items-center justify-center">
            {pd?.prevPokemon && (
              <div
                className="flex items-center gap-x-1 hover:cursor-pointer"
                onClick={(e) => {
                  setPokemonName(pd.prevPokemon!.name);
                }}
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
                <Image
                  src={pd?.prevPokemon.sprites.other.showdown.front_default}
                  alt=""
                  width="0"
                  height="0"
                  className="w-auto h-6"
                  unoptimized
                />
                <p className="font-bold text-xs">{pd?.prevPokemon.name}</p>
                <p className="text-xs text-gray-600">{`#${pd?.prevPokemon.id}`}</p>
              </div>
            )}
          </div>
          <p className="text-gray-400 text-lg">|</p>
          <div className="w-1/2 h-full flex items-center justify-center">
            {pd?.nextPokemon && (
              <div
                className="flex items-center gap-x-1 hover:cursor-pointer"
                onClick={(e) => setPokemonName(pd.nextPokemon!.name)}
              >
                <p className="text-xs text-gray-600">{`#${pd?.nextPokemon.id}`}</p>
                <p className="font-bold text-xs">{pd?.nextPokemon.name}</p>
                <Image
                  src={pd?.nextPokemon.sprites.other.showdown.front_default}
                  alt=""
                  width="0"
                  height="0"
                  className="w-auto h-6"
                  unoptimized
                />
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  name,
  value,
  color,
}: {
  name: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex flex-col rounded-xl bg-gray-200 pb-1.5 px-0.5 gap-y-1">
      <p
        className={`${color} rounded-full text-xs/10 text-white flex items-center justify-center h-7 w-7 text-center font-bold`}
      >
        {name}
      </p>
      <p className="text-xs font-bold">{value}</p>
    </div>
  );
}

export function PokemonDetailLoading() {
  return (
    <div className="flex items-center justify-center h-full">
      <MoonLoader />
    </div>
  );
}
