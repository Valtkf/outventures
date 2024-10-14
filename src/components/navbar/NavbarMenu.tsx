import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

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

export default function NavbarMenu() {
  return (
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
  );
}
