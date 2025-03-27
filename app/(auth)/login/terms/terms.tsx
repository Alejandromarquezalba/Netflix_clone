'use client';
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Terms() {
    const [terms, setTerms] = useState(false)
    return (
        <div className="text-xs mt-4 mb-10 text-gray-600 max-w-72">
            <div className="mb-5">
                <span>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi dicta amet provident voluptatum laborum maxime possimus vero consectetur alias a blanditiis nesciunt eum cum ut, porro molestiae consequuntur qui minima?
                </span>
                <Button variant='ghost' onClick={()=>setTerms(!terms)} className="text-[#0071eb] hover:bg-transparent p-0 ml-1 h-fit">Más información</Button>

            </div>
            <div className="h-28 overflow-hidden transition-all duration-500">{terms && (
                <p className="transition-all duration-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita aliquid harum beatae nam, consequuntur recusandae repellendus alias adipisci inventore? Perspiciatis fuga excepturi, sunt necessitatibus harum nesciunt nobis aperiam et repellat.
                Qui sint tempore hic et praesentium nobis rem voluptates. Ea quis autem quisquam pariatur doloribus, eos commodi facilis quo culpa, eligendi assumenda suscipit dicta, quibusdam obcaecati a porro aliquid quia.</p>
            )}
            </div>
        </div>
    )
}
