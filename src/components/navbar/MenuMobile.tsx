import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { title: "Trail" },
  { title: "Rando" },
  { title: "Running" },
  { title: "Hauts" },
  { title: "Chaussures" },
  { title: "Accessoires" },
];

export default function MenuMobile() {
  return (
    <div className="flex items-center md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="h-[180px] w-[200px]">
          {menuItems.map((menu, index) => (
            <DropdownMenuItem
              key={index}
              className="text-lg font-semibold border-b border-stone-300 "
            >
              <Link
                href={`/category/${encodeURIComponent(menu.title)}`}
                className="ml-2"
              >
                {menu.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
