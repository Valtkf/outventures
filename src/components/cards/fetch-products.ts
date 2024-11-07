import { client } from "@/app/lib/sanity";

export async function fetchProductsByCategory(categoryName: string | null) {
  const query = `*[_type == "product" ${
    categoryName ? `&& sportcategory->name == "${categoryName}"` : ""
  }][0...9] | order(_createdAt asc){
      _id,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      "sportcategoryName": sportcategory->name,
      "subcategoryName": subcategory->name,
      "imageUrl": images[0].asset->url
    }`;

  const data = await client.fetch(query);
  return data;
}
