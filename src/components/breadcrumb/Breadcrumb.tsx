import Link from "next/link";

interface BreadcrumbProps {
  category?: string;
  subcategory?: string;
}

export default function Breadcrumb({ category, subcategory }: BreadcrumbProps) {
  const decodedCategory = category ? decodeURIComponent(category) : null;
  const decodedSubCategory = subcategory
    ? decodeURIComponent(subcategory)
    : null;

  return (
    <div className="flex justify-start ml-8">
      <Link
        href="/"
        className="font-semibold underline hover:no-underline text-black"
      >
        Home
      </Link>

      {category && (
        <Link
          href={`/category/${category.toLowerCase()}`}
          className="font-semibold underline hover:no-underline ml-4 text-black"
        >
          {decodedCategory}
        </Link>
      )}

      {subcategory && (
        <Link
          href={`/category/${category?.toLowerCase()}/${subcategory.toLowerCase()}`}
          className="font-semibold underline hover:no-underline ml-4 text-black"
        >
          {decodedSubCategory}
        </Link>
      )}
    </div>
  );
}
