import { fetchItems } from "@/api/pokemons_api";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";

export default function ItemList({ offset }: { offset: number }) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["items", offset],
    queryFn: async () => {
      const data = await fetchItems(offset);
      return data;
    },
  });

  return (
    <div className="bg-gray-200 rounded-xl p-2">
      <table className="w-full">
        <thead className="text-left text-sm font-normal rounded-xl">
          <tr>
            <th scope="col" className="py-5 pl-6 pr-3 w-20 font-medium">
              ID
            </th>
            <th scope="col" className="py-5 pl-6 pr-3 w-[500px] font-medium">
              Item
            </th>
            <th scope="col" className="py-5 pl-6 pr-3 font-medium">
              Cost
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {isLoading &&
            [...Array(10)].map((e, i) => {
              console.log(e, i);
              return (
                <tr key={i} className="w-full">
                  <td colSpan={3} className="whitespace-nowrap h-12 pl-6 pr-3">
                    {i == 4 && (
                      <div className="flex justify-center">
                        <MoonLoader size={35} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          {!isLoading &&
            data?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="w-full border-b last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap h-12 pl-6 pr-3 w-20">
                    <p>{item.id}</p>
                  </td>
                  <td className="whitespace-nowrap h-12 pl-6 pr-3 w-[500px]">
                    <p>{item.name}</p>
                  </td>
                  <td className="whitespace-nowrap h-12 pl-6 pr-3">
                    <p>{item.cost}</p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
