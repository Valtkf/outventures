import ProductCards from "@/components/cards/ProductCards";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center justify-center w-full">
        <div className="w-full border border-red-500 h-[200px] flex justify-center items-center">
          <h1>Hello</h1>
        </div>
        <div className="w-full flex justify-center">
          <ProductCards />
        </div>
      </main>
    </div>
  );
}
