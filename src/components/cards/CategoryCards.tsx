"use client";
import Image from "next/image";

import Link from "next/link";
import { productCategories } from "./data-cards/category-cards-data";
import ProductCards from "./ProductCards";
import { useState } from "react";

type CategoryCardProps = {
  category: {
    image: string;
    title: string;
    links: string[];
  };
  onSubCategoryClick: (category: string, subCategory: string) => void;
};

function CategoryCard({ category, onSubCategoryClick }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-[15px] shadow-md overflow-hidden flex-1 min-w-[300px] hover:shadow-lg hover:shadow-emerald-500/40 hover:duration-150">
      <Image
        src={category.image}
        alt={`${category.title} category`}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
        priority
      />
      <div className="text-center p-6">
        <Link
          href={`/category/${encodeURIComponent(category.title)}`}
          className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300"
        >
          {category.title}
        </Link>
        <div className="mt-4 space-y-2">
          {category.links.map((link, linkIndex) => (
            <div key={linkIndex}>
              <Link
                href={`/category/${category.title.toLowerCase()}/${link.toLowerCase()}`}
                onClick={() => onSubCategoryClick(category.title, link)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300 block"
              >
                {link}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryCards() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  const handleSubCategoryClick = (category: string, subCategory: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
  };

  return (
    <div>
      <div className="grid grid-rows-2 grid-cols-2 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 p-4 mt-40">
        {productCategories.map((category, index) => (
          <CategoryCard
            key={index}
            category={category}
            onSubCategoryClick={handleSubCategoryClick}
          />
        ))}
      </div>

      {selectedCategory && selectedSubCategory && (
        <div className="mt-8">
          <ProductCards
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            productData={{
              _id: "", // Ensure this is included
              images: [], // Ensure this is included
              price: 0, // Ensure this is included
              slug: "", // Ensure this is included
              categoryName: "", // Ensure this is included
              name: "", // Ensure this is included
              description: "", // Ensure this is included
            }} // Added productData prop
          />
        </div>
      )}
    </div>
  );
}
