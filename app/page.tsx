import { Navbar } from "@/components/Shared/Navbar";
import { BackVideo } from "@/components/backVideo/backVideo";
import HeroBanner from "@/components/herobanner/HeroBanner";

export default function Home() {
  return (
    <div className="relative bg-zinc-900">
      <Navbar ></Navbar>
      <BackVideo></BackVideo>
      <HeroBanner/>
      <div className="h-screen md:h-[100vh] lg:h-[150vh]"></div>
    </div>
  );
}
