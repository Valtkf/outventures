"use client";

import { useEffect, useState } from "react";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { useParams } from "next/navigation";
import ProductCards from "@/components/cards/ProductCards";

// Fonction pour obtenir les données
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

  const data = await client.fetch(query);
  return data;
}

export default function CategoryPage() {
  const [data, setData] = useState<fullProduct | null>(null);
  const routeParams = useParams();

  const category = Array.isArray(routeParams.category)
    ? routeParams.category[0]
    : routeParams.category;
  const subcategory = Array.isArray(routeParams.subcategory)
    ? routeParams.subcategory[0]
    : routeParams.subcategory;
  const slug = Array.isArray(routeParams.slug)
    ? routeParams.slug[0]
    : routeParams.slug;

  const decodedCategory = category ? decodeURIComponent(category) : null;
  const decodedSubCategory = subcategory
    ? decodeURIComponent(subcategory)
    : null;

  useEffect(() => {
    if (slug) {
      getData(slug).then((productData) => {
        setData(productData);
      });
    }
  }, [slug]);

  return (
    <div className="">
      <div className="w-full h-[200px] flex justify-center items-center">
        {decodedCategory ? (
          <h1 className="text-center text-3xl font-bold">{decodedCategory}</h1>
        ) : (
          <div className="text-center">Catégorie non trouvée</div>
        )}
      </div>

      {/* Utiliser les données du produit si elles sont chargées */}
      {data && (
        <div>
          <h2>{data.name}</h2> {/* Affiche le nom du produit */}
          <p>{data.description}</p> {/* Affiche la description du produit */}
          {/* Autres détails du produit */}
        </div>
      )}

      <div className="">
        <ProductCards
          selectedCategory={decodedCategory}
          selectedSubCategory={decodedSubCategory}
        />
      </div>
    </div>
  );
}
