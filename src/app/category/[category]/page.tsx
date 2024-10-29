"use client";

import TrailProductCards from "@/components/cards/TrailProductCards";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!category || Array.isArray(category)) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (!category) {
    return <div className="text-center">Catégorie non trouvée</div>;
  }

  if (Array.isArray(category)) {
    return <div className="text-center">Catégorie non valide</div>;
  }

  const decodedCategory = decodeURIComponent(category);
  const categoryProducts = productsByCategory[decodedCategory] || [];

  // Filtrage des produits en fonction de `categoryProducts`
  const filteredProducts = products.filter((product) =>
    categoryProducts.includes(product.title)
  );

  return (
    <div className="bg-white">
      <div className="w-full border border-red-500 h-[200px] flex justify-center items-center">
        <h1 className="text-center text-3xl font-bold">{decodedCategory}</h1>
      </div>

      {loading ? (
        <div className="text-center">Chargement des produits...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {filteredProducts.map((product) => (
            <TrailProductCards key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
