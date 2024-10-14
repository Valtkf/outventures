"use client";

import { useParams } from "next/navigation";

const productsByCategory: Record<string, string[]> = {
  Trail: ["Veste Trail", "Chaussures Trail", "Sacs hydratation"],
  Randonnée: [
    "Veste Randonnée",
    "Chaussures Randonnée",
    "Accessoires Randonnée",
  ],
  Running: ["Veste Running", "Chaussures Running", "Nutritions"],
};

export default function CategoryPage() {
  const { category } = useParams();

  // Si category est undefined ou vide, renvoie une page 404 ou un message d'erreur
  if (!category) {
    return <div className="text-center">Catégorie non trouvée</div>;
  }

  // Vérifie si category est un tableau ou une chaîne et décode
  const decodedCategory =
    typeof category === "string" ? decodeURIComponent(category) : "";

  // Vérifie si la catégorie existe dans l'objet
  const products = productsByCategory[decodedCategory] || [];

  return (
    <div className="bg-white">
      <div className="w-full border border-red-500 h-[200px] flex justify-center items-center">
        <h1 className="text-center text-3xl font-bold">{decodedCategory}</h1>
      </div>

      <ul>
        {products.map((product, index) => (
          <li key={index} className="text-lg">
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
}
