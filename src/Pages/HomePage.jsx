import { useContext, useEffect, useState } from "react";
import { ArrowClockwise, MagnifyingGlass, Plus, SignOut, UserCircle } from "phosphor-react";
import userService from "../../Services/userServices";
import HederBar, { SideNav } from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import UserContext from "../../Context/userContext";

export default function HomePage() {
    const uid = localStorage.getItem("uid");

    const [user, setUser] = useState(null);
    useEffect(() => {
        const uid = localStorage.getItem("uid");
        userService.getUser(uid).then((currentUser) => {
            setUser(currentUser);
        })

    }, []);

    const { currentUser } = useContext(UserContext)

    const location = useLocation();
    const showImageSlider = !location.pathname.includes('/profile') && !location.pathname.includes('/social') && !location.pathname.includes('/chats') && !location.pathname.includes('/message');

    return (
        <div className="flex flex-col md:h-screen md:overflow-hidden">
            <HederBar />
            <div className="flex w-full h-full">
                <SideNav userData={currentUser} className='hidden md:block' />
                <div className="flex-1 overflow-y-auto">
                    {showImageSlider && (
                        <div className="border-b md:hidden">
                            <div className="flex items-center justify-between w-full overflow-x-auto snap-x snap-mandatory scroll-smooth">
                                <img className="w-full md:w-1/2 lg:w-1/3 block aspect-[16/8] snap-center" src="https://th.bing.com/th/id/OIP.CI71_QZJRHYc_PxnbMGmJAHaDG?rs=1&pid=ImgDetMain" alt="" />
                                <img className="w-full md:w-1/2 lg:w-1/3 block aspect-[16/8] snap-center" src="https://cdn.wallpapersafari.com/19/81/jdOZBL.jpg" alt="" />
                                <img className="w-full md:w-1/2 lg:w-1/3 block aspect-[16/8] snap-center" src="https://img.freepik.com/premium-photo/mountain-range-with-blue-purple-mountains-background_900396-9646.jpg" alt="" />
                                <img className="w-full md:w-1/2 lg:w-1/3 block aspect-[16/8] snap-center" src="https://wallpapercave.com/wp/wp6268183.jpg" alt="" />
                                <img className="w-full md:w-1/2 lg:w-1/3 block aspect-[16/8] snap-center" src="https://img.uhdpaper.com/wallpaper/sunset-mountain-minimalist-digital-art-658@2@b" alt="" />
                                <img className="w-full md:w-1/2 lg:w-1/3 block aspect-[16/8] snap-center" src="https://th.bing.com/th/id/OIP.7mOOPZD3aJEg1bot_RYVBgHaEU?rs=1&pid=ImgDetMain" alt="" />
                                <img className="w-full md:w-1/2 lg:w-1/3 block aspect-[16/8] snap-center" src="https://wallpaperaccess.com/full/1194354.jpg" alt="" />
                            </div>
                        </div>
                    )}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}