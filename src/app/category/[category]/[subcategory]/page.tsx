"use client";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
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
      <div className="mt-20">
        <Breadcrumb category={category} subcategory={subcategory} />
      </div>
      <h1 className="text-center text-3xl font-bold mb-20">
        {decodedCategory} - {decodedSubCategory}
      </h1>
      <ProductCards
        selectedCategory={category}
        selectedSubCategory={subcategory}
        productData={{
          _id: "",
          images: [],
          price: 0,
          slug: "",
          categoryName: "",
          name: "",
          description: "",
        }}
      />
    </div>
  );
}
