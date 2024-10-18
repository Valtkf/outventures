import Image from "next/image";
import Link from "next/link";
import React from "react";

const productCategories = [
  {
    title: "Trail",
    image: "/images/trail.jpg",
    links: ["Vestes", "Shorts", "Chaussures", "Bâtons", "Sacs hydratation"],
  },
  {
    title: "Randonnée",
    image: "/images/rando.jpg",
    links: ["Vestes", "Shorts", "Chaussures", "Accessoires"],
  },
  {
    title: "Running",
    image: "/images/runningpic.jpeg",
    links: ["Vestes", "Shorts", "Chaussures", "Nutritions", "Flasques"],
  },
];

export default function TrailProductCards() {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-8">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-[15px] shadow-md overflow-hidden flex-1 min-w-[250px]"
            >
              <Image
                src={category.image}
                alt={`${category.title} category`}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="text-center p-6">
                <Link
                  href={`/category/${encodeURIComponent(category.title)}`} // Lien dynamique avec encodeURIComponent
                  className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300"
                >
                  {category.title}
                </Link>
                <ul className="mt-4 space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={`/category/${category.title.toLowerCase()}/${link.toLowerCase()}`}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
