import { Navbar } from "@/components/Shared/Navbar";
import { MyLogo } from "@/components/Shared/MyLogo";


export default function AuthLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
        return (
            <div className="h-full">
                <div className="h-full relative">
                    <div className="bg-black h-full min-h-screen absolute w-full -z-10">
                        <div className="bg-[url('/cinema.jpg')] h-full opacity-40 bg-no-repeat bg-cover object-cover"></div>
                    </div>
                    <div className="px-8 py-5 max-w-7xl mx-auto">
                        <MyLogo></MyLogo>
                        <div className="h-full w-full max-w-md mx-auto">
                            <div className="bg-black/70 px-14 py-16">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
}
