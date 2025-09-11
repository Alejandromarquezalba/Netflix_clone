'use client';
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Terms() {
    const [terms, setTerms] = useState(false)
    return (
        <div className="text-xs mt-4 mb-10 text-gray-600 max-w-72">
            <div className="mb-5">
                <span>
                    Términos y Condiciones de Servicio
                </span>
                <p>
                    Al acceder y utilizar este sitio web, aceptas estar sujeto a los siguientes términos y condiciones de uso. El contenido de las páginas de esta plataforma es para tu información y uso general, y está sujeto a cambios sin previo aviso. El uso de cualquier información o material en este sitio es bajo tu propio riesgo, para lo cual no seremos responsables.
                </p>
                <Button variant='ghost' onClick={()=>setTerms(!terms)} className="text-[#0071eb] hover:bg-transparent p-0 ml-1 h-fit">Más información</Button>

            </div>
            <div className="h-28 overflow-hidden transition-all duration-500">{terms && (
                <p className="transition-all duration-500">Es tu responsabilidad asegurar que cualquier producto, servicio o información disponible a través de este sitio web cumpla con tus requisitos específicos. La reproducción de este material está prohibida, excepto de acuerdo con el aviso de derechos de autor, que forma parte de estos términos y condiciones.</p>
            )}
            </div>
        </div>
    )
}
