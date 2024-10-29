"use client";

import { useParams } from "next/navigation";

// Tu peux supprimer `productsByCategory` si tu ne l’utilises pas dans le rendu actuel.

export default function CategoryPage() {
  const params = useParams();
  const category = Array.isArray(params.category)
    ? params.category[0]
    : params.category;

  // Décodage de la catégorie si elle est définie
  const decodedCategory = category ? decodeURIComponent(category) : null;

  return (
    <div className="bg-white">
      <div className="w-full border border-red-500 h-[200px] flex justify-center items-center">
        {decodedCategory ? (
          <h1 className="text-center text-3xl font-bold">{decodedCategory}</h1>
        ) : (
          <div className="text-center">Catégorie non trouvée</div>
        )}
      </div>
    </div>
  );
}
