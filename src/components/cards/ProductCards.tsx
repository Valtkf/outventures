import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { simplifiledProduct } from "@/app/interface";
import { fetchProductsByCategory } from "./fetch-products";
import { capitalizeFirstLetter } from "../../lib/capitalizeLetter"; // <-- Import de la fonction
import ButtonCart from "../ui/button-cart/ButtonCart";

interface ProductCardsProps {
  selectedCategory: string | null;
  selectedSubCategory: string | null;
}

export default function ProductCards({
  selectedCategory,
  selectedSubCategory,
}: ProductCardsProps) {
  const [products, setProducts] = useState<simplifiledProduct[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const formattedCategory = selectedCategory
        ? capitalizeFirstLetter(selectedCategory)
        : null;
      const formattedSubCategory = selectedSubCategory
        ? capitalizeFirstLetter(selectedSubCategory)
        : null;

      console.log("Formatted Category:", formattedCategory);
      console.log("Formatted SubCategory:", formattedSubCategory);

      const data = await fetchProductsByCategory(
        formattedCategory,
        formattedSubCategory
      );
      setProducts(data);
    }

    loadProducts();
  }, [selectedCategory, selectedSubCategory]);

  return (
    <div>
      <div className="grid grid-rows-2 grid-cols-2 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm mx-auto"
          >
            <div className="relative">
              <Image
                src={product.imageUrl}
                alt={`Image of ${product.name}`}
                className="w-full h-[400px] object-cover"
                width={400}
                height={400}
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/product/${product.slug}`}></Link>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                {product.categoryName}
              </p>
              <p className="text-gray-600 text-sm">
                {product.sportcategoryName} - {product.subcategoryName}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-900 font-bold text-lg">
                  {product.price} €
                </span>
                <ButtonCart />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
