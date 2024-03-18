import Menu from "@/components/menu";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Menu />
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center grow px-20">
          <p className="text-center text-4xl font-semibold">
            Lorem, ipsum dolor sit amet consectetur
          </p>
          <p className="text-lg">Lorem ipsum dolor sit amet consectetur.</p>
          <div className="h-5"></div>
          <Link
            href="/login"
            className="flex items-center gap-3 self-center rounded-3xl bg-transparent text-sm font-medium text-black border-black border px-7 py-3 hover:bg-white"
          >
            <Image src={"/valor.png"} width={20} height={20} alt="" />
            <span>D I S C O V E R</span>
          </Link>
        </div>
        <div className="w-1/2 grow flex justify-center">
          <Image
            src="/pikachu.png"
            width={500}
            height={500}
            alt="Mascot of pokemon series"
          />
        </div>
      </div>
    </main>
  );
}
