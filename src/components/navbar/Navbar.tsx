import MenuMobile from "./MenuMobile";
import Logo from "./Logo";
import NavbarMenu from "./NavbarMenu";
import NavbarRightSide from "./NavbarRightSide";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <MenuMobile />
          <Logo />
          {/* Center Dropdown Menus - Hidden on mobile */}
          <NavbarMenu />
          {/* Right side icons */}
          <NavbarRightSide />
        </div>
      </div>
    </nav>
  );
}
