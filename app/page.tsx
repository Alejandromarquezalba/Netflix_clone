import { Navbar } from "@/components/Shared/Navbar";
import { BackVideo } from "@/components/backVideo/backVideo";

export default function Home() {
  return (
    <div className="relative bg-zinc-900">
      <Navbar ></Navbar>
      <BackVideo></BackVideo>
      <div className="h-screen md:h-[100vh] lg:h-[150vh]"></div>
    </div>
  );
}
