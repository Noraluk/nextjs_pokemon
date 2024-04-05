"use client";

import ItemList from "@/components/item/item_list";
import ItemPagination from "@/components/item/item_pagination";
import Menu from "@/components/menu";
import Pokedex from "@/components/pokedex/pokedex";
import { useState } from "react";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const [selected, setSelected] = useState(0);
  const currentPage = Number(searchParams?.page) || 1;

  console.log(currentPage);

  return (
    <div className="flex flex-col max-h-screen">
      <div className="h-5"></div>
      <Menu selected={selected} setSelected={setSelected} />
      <br />
      {selected == 0 && <Pokedex pokemonSearch={searchParams?.query ?? ""} />}
      {selected == 1 && (
        <div className="h-screen mx-40">
          <ItemList offset={(currentPage - 1) * 10} />
          <br />
          <ItemPagination />
        </div>
      )}
    </div>
  );
}
