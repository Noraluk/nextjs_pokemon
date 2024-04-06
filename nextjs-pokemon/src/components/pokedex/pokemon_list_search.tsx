"use client";

import Pokeball from "@/icons/pokeball";
import { isPokemonNameRight } from "@/schemas/pokedex_schema";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PokemonListSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [pokemonName, setPokemonName] = useState("");
  const [searchingError, setSearchingError] = useState(false);

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
    <form>
      <div
        className={clsx(
          "flex justify-around items-center py-3 bg-white rounded-xl px-5",
          {
            "border border-red-600": searchingError,
          }
        )}
      >
        <input
          name="pokemonName"
          placeholder="Search your Pokemon!"
          className="block w-3/4 text-lg outline-2 placeholder:text-gray-500 h-10 grow focus:outline-none"
          onChange={(e) => {
            setSearchingError(isPokemonNameRight(e.target.value));
            setPokemonName(e.target.value);
            console.log(searchingError);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <button
          className={clsx(
            "bg-red-400 rounded-xl shrink-0 h-10 shadow-lg shadow-red-400",
            { "hover:bg-red-500": !searchingError }
          )}
          onClick={() => {
            handleSearch(pokemonName);
          }}
          type="submit"
          disabled={searchingError}
        >
          <Pokeball className="h-10 text-white p-1" />
        </button>
      </div>
      {searchingError && (
        <div>
          <p className="mt-2 text-sm text-red-500">
            Pokemon must not contain special character
          </p>
        </div>
      )}
    </form>
  );
}
