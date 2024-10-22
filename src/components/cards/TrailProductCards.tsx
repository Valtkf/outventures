import Image from "next/image";
import Link from "next/link";
import { Product } from "../../lib/types"; // Assure-toi que le type Product est bien importé

interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg bg-white">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || "Product Image"}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="flex justify-between">
        <Link
          href={`/products/${product.handle}/?id=${product.id}`}
          className="text-blue-500 hover:underline"
        >
          {product.title}
        </Link>
        <span>{product.priceRange.minVariantPrice.amount} €</span>
      </div>
    </div>
  );
};

export default ProductCard;
