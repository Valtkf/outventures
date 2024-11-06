import React, { useEffect, useState } from "react";
import { client } from "@/app/lib/sanity";
import Image from "next/image";
import Link from "next/link";

// Typage pour un produit simplifié
interface SimplifiedProduct {
  _id: string;
  price: number;
  name: string;
  slug: string;
  categoryName: string;
  sportcategoryName: string;
  imageUrl: string;
}

// Fonction pour récupérer les produits
async function fetchProductsByCategory(categoryName: string | null) {
  const query = `*[_type == "product" ${
    categoryName ? `&& sportcategory->name == "${categoryName}"` : ""
  }][0...9] | order(_createdAt asc){
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "sportcategoryName": sportcategory->name,
    "imageUrl": images[0].asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

// Composant `ProductCards`
interface ProductCardsProps {
  selectedCategory: string | null;
}

export default function ProductCards({ selectedCategory }: ProductCardsProps) {
  const [products, setProducts] = useState<SimplifiedProduct[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProductsByCategory(selectedCategory);
      setProducts(data);
    }

    loadProducts();
  }, [selectedCategory]);

  return (
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
            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            <p className="text-gray-500 text-sm mt-2">{product.categoryName}</p>
            <p className="text-gray-600 text-sm">{product.sportcategoryName}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-gray-900 font-bold text-lg">
                {product.price} €
              </span>
              <button className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
