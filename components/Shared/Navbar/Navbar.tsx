import { NavbarDesktop } from "./NavbarDesktop"
import { NavbarMobile } from "./NavbarMobile/NavbarMobile"

export function Navbar() {
  return (
    <nav>
      <div className="hidden mx-auto md:block">
        <NavbarDesktop></NavbarDesktop>
      </div>
      <div className="md:hidden">
        <NavbarMobile></NavbarMobile>
      </div>
    </nav>
  )
}
