import ProductCards from "@/components/cards/ProductCards";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
      <header>
        <Navbar />
      </header>
      <main className="flex justify-center gap-8 row-start-2 items-center sm:items-start">
        <h1>Hello</h1>
        <ProductCards />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
