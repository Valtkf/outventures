import Link from "next/link";
import CategoryCards from "../components/cards/CategoryCards";

export default function Home() {
  return (
    <div className="min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
      <Link
        href="/"
        className="font-semibold underline hover:no-underline ml-8 flex justify-start text-black mt-20"
      >
        Home
      </Link>
      <main className="flex flex-col gap-8 items-center justify-center w-full">
        <div className="w-full flex justify-center">
          <CategoryCards />
        </div>
      </main>
    </div>
  );
}
