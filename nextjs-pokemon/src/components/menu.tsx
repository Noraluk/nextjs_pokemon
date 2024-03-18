import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex items-center">
      <div className="flex w-1/2 justify-center">
        <Link href="/">
          <Image
            src="/pokemon-logo.png"
            width={200}
            height={200}
            alt="Logo of pokemon"
          />
        </Link>
      </div>
      <div className="flex gap-10 w-1/2 justify-start">
        <br />
        <Link href={""} className="hover:text-red-600">
          About
        </Link>
        <Link href={""} className="hover:text-red-600">
          Pokedex
        </Link>
      </div>
    </div>
  );
}
