import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    title: "Trail",
    subcategories: ["Hauts", "Vestes", "Shorts", "Chaussures", "Sacs"],
  },
  {
    title: "Rando",
    subcategories: ["Sacs à dos", "Chaussures", "Bâtons"],
  },
  {
    title: "Running",
    subcategories: ["Chaussures", "Vêtements", "Montres"],
  },
  {
    title: "Accessoires",
    subcategories: ["Gourdes", "Casquettes", "Chaussettes"],
  },
];

export default function NavbarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
        <nav className="h-full overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {menuItems.map((menu, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  {menu.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="py-2">
                    {menu.subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex} className="py-2">
                        <Link
                          href={`/category/${encodeURIComponent(menu.title)}/${encodeURIComponent(subcategory)}`}
                          className="text-sm hover:underline"
                        >
                          {subcategory}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
