'use client';
import { cn } from "@/lib/utils";
import { BellRing, Search } from "lucide-react";
import { MyLogo } from "../../MyLogo";
import { itemsNavbar } from "@/data/itemsNavbar";
import Link from "next/link";
import { scrollPositionFunc } from "@/hooks/scrollPosition";



export function NavbarDesktop() {
    const scrollPosition = scrollPositionFunc();
    console.log(scrollPosition);


    return (
        <div className={cn('left-0 right-0 top-0 h-16 fixed w-full transition-all duration-300 z-20',
            scrollPosition > 20 ? 'bg-zinc-900' : 'bg-transparent'
        )}>
        
            <div className="px-[4%] mx-auto h-full">
                <div className="flex gap-4 justify-between h-full items-center">
                    
                    <div className="flex gap-2 items-center">
                        <MyLogo></MyLogo>
                        <div className="ml-10 flex gap-4">
                            {itemsNavbar.map((item)=>(
                                <Link key={item.title} href={item.href} className="duration-300 hover:text-gray-400 transition-all">
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <Search></Search>
                        <BellRing></BellRing>
                        <p>Usuario</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
