'use client';

import { useEffect, useState } from "react";

export const scrollPositionFunc = ()=>{
    const [scrollPosition, setScrollPosition] = useState(0)
    useEffect(()=>{
        const updateScrollPosition = ()=>{
            setScrollPosition(window.pageYOffset) 
        }
        window.addEventListener('scroll', updateScrollPosition)

        return ()=>{
            window.removeEventListener('scroll', updateScrollPosition)
        }

    },[])

    return scrollPosition
}
