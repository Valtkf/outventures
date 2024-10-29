import { ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NavbarRightSide() {
  return (
    <div className="flex items-center">
      <Link
        href="/mon-compte"
        className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
      >
        <span className="sr-only">Mon compte</span>
        <User className="h-6 w-6" />
      </Link>
      <Link
        href="/panier"
        className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
      >
        <span className="sr-only">Panier</span>
        <ShoppingBasket className="h-6 w-6" />
      </Link>
    </div>
  );
}
