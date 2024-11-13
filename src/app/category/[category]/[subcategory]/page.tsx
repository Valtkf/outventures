"use client";

import ProductCards from "@/components/cards/ProductCards";

interface SubCategoryPageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export default function SubCategoryPage({ params }: SubCategoryPageProps) {
  const { category, subcategory } = params;
  const decodedCategory = category ? decodeURIComponent(category) : null;
  const decodedSubCategory = subcategory
    ? decodeURIComponent(subcategory)
    : null;
  console.log("Category from params:", category);
  console.log("Subcategory from params:", subcategory);

  return (
    <div className="mt-20">
      <h1 className="text-center text-3xl font-bold mb-20">
        {decodedCategory} - {decodedSubCategory}
      </h1>
      {/* Afficher les produits de la sous-catégorie */}

      <ProductCards
        selectedCategory={category}
        selectedSubCategory={subcategory}
      />
    </div>
  );
}
