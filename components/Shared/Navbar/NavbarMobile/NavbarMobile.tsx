import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MyLogo } from "../../MyLogo"
import { BellRing, Menu } from "lucide-react"
import { itemsNavbar } from "@/data/itemsNavbar"
import Link from "next/link"
import { Search } from "lucide-react"

export function NavbarMobile() {
    return (
        <div className="p-4 flex justify-between">
            <MyLogo></MyLogo>

            <Sheet>
                <SheetTrigger>
                    <Menu/>
                </SheetTrigger>
                <SheetContent side="left" className="bg-black">
                    <div className="flex flex-col gap-4 p-5">
                        {itemsNavbar.map((item)=>(
                            <Link key={item.title} href={item.href} className="hover:text-gray-400 transition duration-300">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    <div className="border-[1px] border-white/70 my-5"></div>
                    <div className="flex justify-between px-7 mt-4">
                        <Search className="cursor-pointer"></Search>
                        <BellRing className="cursor-pointer"></BellRing>
                        <p>Usuario</p>
                    </div>
                </SheetContent>

            </Sheet>

        </div>
    )
}
