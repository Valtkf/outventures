import CategoryCards from "../components/cards/CategoryCards";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center justify-center w-full">
        <div className="w-full flex justify-center">
          <CategoryCards />
        </div>
      </main>
    </div>
  );
}
