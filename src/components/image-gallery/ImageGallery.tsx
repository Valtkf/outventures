import { simplifiledProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import Image from "next/image";
import React from "react";

async function getData() {
  const query = `*[_type == "product"][0...4] | order(_createdAt asc){
  _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
}`;

  const data = await client.fetch(query);
  return data;
}

export default async function ImageGallery() {
  const data: simplifiledProduct[] = await getData();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-2xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Nos produits</h2>
        </div>
        <div className="mt-6 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 ">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="w-[300px] h-[300px] aspect-square overflow-hidden rounded-xl bg-gray-200 mt-10">
                <Image
                  src={product.imageUrl}
                  alt="Product image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={150}
                  height={150}
                  priority
                />
              </div>
              <div className="flex flex-col text-lg font-semibold ">
                <div>{product.name}</div>
                <div className="font-medium opacity-40">
                  {product.categoryName}
                </div>
                <div>
                  {product.price} <span>€</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
