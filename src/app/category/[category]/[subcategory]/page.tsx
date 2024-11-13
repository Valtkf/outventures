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
  console.log("Category from params:", category);
  console.log("Subcategory from params:", subcategory);

  return (
    <div>
      <h1>
        {category} - {subcategory}
      </h1>
      {/* Afficher les produits de la sous-catégorie */}

      <ProductCards
        selectedCategory={category}
        selectedSubCategory={subcategory}
      />
    </div>
  );
}
