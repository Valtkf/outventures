"use client";

import { useEffect, useState } from "react";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { useParams } from "next/navigation";
import ProductCards from "@/components/cards/ProductCards";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";

// Function to fetch product data
async function getData(slug: string): Promise<fullProduct> {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    images[]{
      _key,
      _type,
      asset->{
        _ref,
        _type
      }
    },
    price,
    name,
    description,
    "slug": slug.current,
    "categoryName": category->name,
    "sportcategoryName": sportcategory->name,
    "subcategoryName": subcategory->name,
    "imageUrl": images[0].asset->url
  }`;

  return await client.fetch(query);
}

export default function CategoryPage() {
  const [data, setData] = useState<fullProduct | null>(null);
  const { category, subcategory, slug } = useParams();

  // Decode category and subcategory
  const decodedCategory =
    typeof category === "string" ? decodeURIComponent(category) : null;
  const decodedSubCategory =
    typeof subcategory === "string" ? decodeURIComponent(subcategory) : null;

  // Fetch product data when slug changes
  useEffect(() => {
    if (Array.isArray(slug)) {
      getData(slug[0]).then(setData); // Use the first element if slug is an array
    } else if (slug) {
      getData(slug).then(setData);
    }
  }, [slug]);

  return (
    <div>
      <div className="mt-20">
        <Breadcrumb
          category={Array.isArray(category) ? category[0] : category}
        />
      </div>
      <div className="w-full h-[100px] flex justify-center items-center">
        {decodedCategory ? (
          <h1 className="text-center text-3xl font-bold">{decodedCategory}</h1>
        ) : (
          <div className="text-center">Catégorie non trouvée</div>
        )}
      </div>

      <div>
        <ProductCards
          selectedCategory={decodedCategory}
          selectedSubCategory={decodedSubCategory}
          productData={data}
        />
      </div>
    </div>
  );
}
