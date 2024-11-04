import { simplifiledProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

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
    <div className=" grid grid-cols-1 gap-4 p-4 mt-6 gap-y-10">
      {data
        .filter((product) => product.sportcategoryName === selectedCategory) // Filtrer par catégorie sélectionnée
        .map((product) => (
          <div key={product._id} className="group relative">
            <div className="w-[400px] h-[400px] aspect-square overflow-hidden rounded-xl bg-gray-200 mt-10">
              <Image
                src={product.imageUrl}
                alt="Product image"
                className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                width={150}
                height={150}
                priority
              />
            </div>
            <div className="flex flex-col text-lg font-semibold mt-4">
              <div>{product.name}</div>
              <div className="font-medium opacity-40">
                {product.categoryName}
              </div>
              <div className="text-lg font-normal">
                {product.sportcategoryName}
              </div>
              <div>
                {product.price} <span>€</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
