'use client';
import { Button } from "../ui/button"
import { Info, Play } from "lucide-react"
import { useEffect, useRef } from "react";

export function BackVideo (){

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
            if (video) {
            video.addEventListener('canplaythrough', () => {
                video.play();
            });
            video.addEventListener('ended', () => {
                video.classList.add('opacity-0');
                setTimeout(() => {
                video.classList.remove('opacity-0');
                video.play();
                }, 2000);
            });
            }
        }, []);

    

    return (
        <div className="relative">
            <video
                ref={videoRef}
                className="brightness-50 object-fill w-full h-screen transition-opacity duration-2000"
                src="/video-back.mp4"
                autoPlay
                muted
                
                preload="auto"
                crossOrigin="anonymous"
                playsInline
            ></video>

            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-zinc-900 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center">

                <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-xl">Bienvenido</h1>
                    <p className="text-sm md:text-base lg:text-lg max-w-md mt-4 md:mt-6 lg:mt-8">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores, eveniet libero nulla nihil nam obcaecati earum? Dignissimos, earum? Magni aspernatur aperiam eum dolorum facilis ut voluptatum aliquam nostrum dolores autem.
                    Quia minus alias dolorem ut molestiae laboriosam! Veniam, delectus assumenda? Beatae esse vero eos incidunt ipsam reiciendis recusandae, quae quos sapiente dignissimos ab, necessitatibus id dolore quis doloremque harum earum!
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-8 lg:mt-10">
                        <Button size="lg" variant="secondary">
                            <Play className="h-6 w-6 mr-2 fill-black"/> Reproducir
                        </Button>
                        <Button size="lg" className="bg-gray-500/50 hover:bg-gray-500/40">
                            <Info className="h-6 w-6 mr-2"/> Más información
                        </Button>
                    </div>
            </div>
                </div>
            </div>
        
    )
}