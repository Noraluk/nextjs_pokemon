import Card from "@/icons/card";
import Controller from "@/icons/controller";
import Newspaper from "@/icons/newspaper";
import Pokeball from "@/icons/pokeball";
import clsx from "clsx";

export default function Menu({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (index: number) => void;
}) {
  const menus = [
    { name: "Pokemon", icon: <Pokeball className="h-10" /> },
    { name: "Videogames", icon: <Controller className="h-10" /> },
    { name: "GCC Pokemon", icon: <Card className="h-10" /> },
    { name: "News", icon: <Newspaper className="h-10" /> },
  ];
  return (
    <div className="flex h-20 mx-40 bg-white rounded-xl shadow-lg items-center justify-evenly py-8 px-2">
      {menus.map((menu, index) => (
        <Title
          key={index}
          name={menu.name}
          icon={menu.icon}
          index={index}
          selected={selected}
          select={(index: number) => setSelected(index)}
        />
      ))}
      ,
    </div>
  );
}

function Title({
  icon,
  name,
  index,
  selected,
  select,
}: {
  icon: React.ReactNode;
  name: string;
  index: number;
  selected: number;
  select: (index: number) => void;
}) {
  let selectedStyle = "text-zinc-500";
  if (selected == index) {
    selectedStyle = "text-red-400 border-b-4 border-red-400";
  }
  return (
    <div
      className={clsx(
        "flex h-20 grow items-center justify-center gap-2  hover:text-red-400 hover:fill-red-400 hover:border-b-4 hover:border-red-400",
        selectedStyle
      )}
      onClick={() => select(index)}
    >
      {icon}
      <p className="font-bold text-sm ">{name}</p>
    </div>
  );
}
