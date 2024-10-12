import Link from "next/link";
import { ShoppingBasket, User, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const menuItems = [
    {
      title: "Nos Univers",
      items: ["Randonnée", "Trail", "Running"],
    },
    {
      title: "Homme",
      items: ["Vêtements", "Chaussures", "Accessoires"],
    },
    {
      title: "Femme",
      items: ["Vêtements", "Chaussures", "Accessoires"],
    },
    {
      title: "Accessoires",
      items: ["Bijoux", "Sacs", "Montres"],
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {menuItems.map((menu, index) => (
                  <DropdownMenuItem key={index}>
                    <Link href={`/${menu.title.toLowerCase()}`}>
                      {menu.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Logo
            </Link>
          </div>

          {/* Center Dropdown Menus - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-4">
            {menuItems.map((menu, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center border border-stone-300 rounded-2xl hover:bg-slate-800 hover:text-white"
                  >
                    {menu.title} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  {menu.items.map((item, itemIndex) => (
                    <DropdownMenuItem key={itemIndex}>
                      <Link
                        href={`/${menu.title.toLowerCase()}/${item.toLowerCase()}`}
                      >
                        {item}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Right side icons */}
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
        </div>
      </div>
    </nav>
  );
}
