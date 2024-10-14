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

  // Forcer le type de `category` à être une chaîne
  const categoryKey = category as keyof typeof productsByCategory;

  const products = productsByCategory[categoryKey] || [];

  return (
    <div className="bg-white">
      <h1 className="text-3xl font-bold">{categoryKey}</h1>
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
