import Image from "next/image";
import Link from "next/link";
import { productCategories } from "./data-cards/category-cards-data";

export default function ProductCards() {
  return (
    <div className="grid grid-rows-2 grid-cols-2 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 p-4 mt-40">
      {productCategories.map((category, index) => (
        <div
          key={index}
          className="bg-white rounded-[15px] shadow-md overflow-hidden flex-1 min-w-[300px] hover:shadow-lg hover:shadow-emerald-500/40 hover:duration-150"
        >
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
              href={`/category/${encodeURIComponent(category.title)}`} // Lien dynamique avec encodeURIComponent
              className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300"
            >
              {category.title}
            </Link>
            <div className="mt-4 space-y-2">
              {category.links.map((link, linkIndex) => (
                <div key={linkIndex}>
                  <Link
                    href={`/category/${encodeURIComponent(link)}`}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
