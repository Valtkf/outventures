import { simplifiledProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import Image from "next/image";
import React, { useEffect, useState } from "react";

async function getData(sportcategoryName: string | null) {
  const query = `*[_type == "product" ${
    sportcategoryName ? `&& sportcategory->name == "${sportcategoryName}"` : ""
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

interface ImageGalleryProps {
  selectedCategory: string | null;
}

export default function ImageGallery({ selectedCategory }: ImageGalleryProps) {
  const [data, setData] = useState<simplifiledProduct[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getData(selectedCategory);
      setData(fetchedData);
    }

    fetchData();
  }, [selectedCategory]);

  return (
    <div className="grid grid-rows-2 grid-cols-2 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
      {data
        .filter((product) => product.sportcategoryName === selectedCategory)
        .map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm mx-auto"
          >
            <div className="relative">
              <Image
                src={product.imageUrl}
                alt="Product image"
                className="w-full h-[400px] object-cover"
                width={400}
                height={400}
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">
                  View Product
                </button>
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
                {product.sportcategoryName}
              </p>
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
