'use client';
import { NavbarDesktop } from "./NavbarDesktop"
import { NavbarMobile } from "./NavbarMobile/NavbarMobile"
import { useActiveProfile } from '@/contexts/ActiveProfileContext';
import HeroBanner from "@/components/herobanner/HeroBanner";

export function Navbar() {
  const { activeProfile } = useActiveProfile();
  
  return (
    <nav>

      <div className="hidden mx-auto md:block">
        <NavbarDesktop></NavbarDesktop>
      </div>

      <div className="md:hidden">
        <NavbarMobile></NavbarMobile>
      </div>
      

      { /* 
      {activeProfile && (
        <div className="text-sm text-center py-2 px-4 bg-gray-100 rounded-md">
          Perfil activo: {activeProfile.name}
        </div>
        
      )}
      */ }

      
    </nav>
  )
}
