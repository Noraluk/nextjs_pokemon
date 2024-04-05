"use client";

import Pokeball from "@/icons/pokeball";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PokemonListSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [pokemonName, setPokemonName] = useState("");

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <div className="flex justify-around items-center py-3 bg-white border-red-400 rounded-xl px-5">
        <input
          name="pokemon"
          placeholder="Search your Pokemon!"
          className="block w-3/4 text-lg outline-2 placeholder:text-gray-500 h-10 grow focus:outline-none"
          onChange={(e) => {
            setPokemonName(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <button
          className="bg-red-400 rounded-xl shrink-0 h-10 shadow-lg shadow-red-400 hover:bg-red-500"
          onClick={() => {
            handleSearch(pokemonName);
          }}
        >
          <Pokeball className="h-10 text-white p-1" />
        </button>
      </div>
    </>
  );
}
