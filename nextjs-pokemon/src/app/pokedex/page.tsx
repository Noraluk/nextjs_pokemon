"use client";

import Menu from "@/components/menu";
import Pokeball from "@/icons/pokeball";
import clsx from "clsx";
import { Suspense, useState } from "react";
import styles from "@/app/pokedex/page.module.css";
import {
  PokemonDetail,
  PokemonDetailLoading,
} from "@/components/pokemon_detail";
import PokemonList from "@/components/pokemon_list";

export default function Page() {
  const [selected, setSelected] = useState(0);
  const [pokemonName, setPokemonName] = useState("");

  return (
    <div className="flex flex-col max-h-screen">
      <div className="h-5"></div>
      <Menu selected={selected} setSelected={setSelected} />
      <br />
      <div className="flex justify-center mx-40 gap-10 h-screen overflow-y-auto">
        <div className="flex flex-col grow">
          <form action="">
            <div className="flex justify-around items-center h-16 bg-white border-red-400 rounded-xl px-5">
              <input
                name="pokemon"
                placeholder="Search your Pokemon!"
                className="block w-3/4 text-lg outline-2 placeholder:text-gray-500 h-10 grow focus:outline-none"
              />
              <button className="bg-red-400 rounded-xl shrink-0 h-10 shadow-lg shadow-red-400 hover:bg-red-500">
                <Pokeball className="h-10 text-white p-1" />
              </button>
            </div>
          </form>
          <br />
          <div className="flex h-10 items-center justify-between">
            <Filter
              className="w-32 bg-transparent"
              options={["Ascending", "Descending"]}
              defaultValue="Ascending"
            />
            <div className="flex gap-2">
              <PokemonIDInput name="from" />
              <PokemonIDInput name="to" />
            </div>
          </div>
          <br />
          <div className="flex gap-2">
            <Filter
              className="text-slate-500 bg-white py-2 px-4 grow"
              optionName="Type"
              options={["Ascending", "Descending"]}
              defaultValue=""
            />
            <Filter
              className="text-slate-500 bg-white py-2 px-4 grow"
              optionName="Type"
              options={["Ascending", "Descending"]}
              defaultValue=""
            />
            <Filter
              className="text-slate-500 bg-white py-2 px-4 grow"
              optionName="Type"
              options={["Ascending", "Descending"]}
              defaultValue=""
            />
            <Filter
              className="text-slate-500 bg-white py-2 px-4 grow"
              optionName="Type"
              options={["Ascending", "Descending"]}
              defaultValue=""
            />
            <button className="grow-0 w-10 bg-slate-400 rounded-xl p-2.5 text-white hover:bg-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="currentColor"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 528.919 528.918"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path d="M70.846,324.059c3.21,3.926,8.409,3.926,11.619,0l69.162-84.621c3.21-3.926,1.698-7.108-3.372-7.108h-36.723    c-5.07,0-8.516-4.061-7.427-9.012c18.883-85.995,95.625-150.564,187.207-150.564c105.708,0,191.706,85.999,191.706,191.706    c0,105.709-85.998,191.707-191.706,191.707c-12.674,0-22.95,10.275-22.95,22.949s10.276,22.949,22.95,22.949    c131.018,0,237.606-106.588,237.606-237.605c0-131.017-106.589-237.605-237.606-237.605    c-116.961,0-214.395,84.967-233.961,196.409c-0.878,4.994-5.52,9.067-10.59,9.067H5.057c-5.071,0-6.579,3.182-3.373,7.108    L70.846,324.059z" />
                  </g>
                </g>
              </svg>
            </button>
          </div>
          <br />
          {/* pokemon list */}
          <PokemonList setPokemonName={setPokemonName} />
        </div>
        {/* pokemon detail */}
        <div className="flex flex-col w-[340px]">
          <div className="h-1/6" />
          <div className="grow bg-white w-full h-full rounded-2xl relative">
            {pokemonName.length > 0 && (
              <Suspense fallback={<PokemonDetailLoading />}>
                <PokemonDetail
                  pokemonName={pokemonName}
                  setPokemonName={setPokemonName}
                />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PokemonIDInput({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <p className="font-bold">{name}</p>
      <input
        id={name}
        name={name}
        type="number"
        className="border border-gray-500 bg-transparent rounded-xl h-10 w-20 text-end px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        defaultValue={0}
      />
    </div>
  );
}

function Filter({
  className,
  optionName,
  options,
  defaultValue,
}: {
  className: string;
  optionName?: string;
  options: string[];
  defaultValue: string;
}) {
  return (
    <select
      className={clsx("rounded-xl p-3", styles.dropdown, className)}
      defaultValue={defaultValue}
    >
      {optionName != undefined && (
        <option value="" disabled>
          {optionName!}
        </option>
      )}
      {options.map((option) => (
        <option key={option} value="ascending">
          {option}
        </option>
      ))}
    </select>
  );
}
