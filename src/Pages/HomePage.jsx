import { useEffect, useState } from "react";
import ToDo from "../components/todo-old-deprecated";
import { ArrowClockwise, MagnifyingGlass, Plus, SignOut, UserCircle } from "phosphor-react";
import userService from "../../Services/userServices";
import HederBar from "../components/Header";
import { Outlet } from "react-router-dom";

export default function HomePage() {
    const uid = localStorage.getItem("uid");
    const [isFormShown, setIsFormShown] = useState(false)

    const [user, setUser] = useState(null);
    useEffect(() => {
        const uid = localStorage.getItem("uid");
        userService.getCurrentUser(uid).then((currentUser) => {
            setUser(currentUser);
        })

    }, []);

    
    return (
        <>
            <div className="border-b ">
                <div className="w-full flex justify-between items-center overflow-x-auto snap-x snap-mandatory scroll-smooth">
                    <img className="w-full block aspect-[16/8] snap-center" src="https://th.bing.com/th/id/OIP.CI71_QZJRHYc_PxnbMGmJAHaDG?rs=1&pid=ImgDetMain" alt="" />
                    <img className="w-full block aspect-[16/8] snap-center" src="https://cdn.wallpapersafari.com/19/81/jdOZBL.jpg" alt="" />
                    <img className="w-full block aspect-[16/8] snap-center" src="https://img.freepik.com/premium-photo/mountain-range-with-blue-purple-mountains-background_900396-9646.jpg" alt="" />
                    <img className="w-full block aspect-[16/8] snap-center" src="https://wallpapercave.com/wp/wp6268183.jpg" alt="" />
                    <img className="w-full block aspect-[16/8] snap-center" src="https://img.uhdpaper.com/wallpaper/sunset-mountain-minimalist-digital-art-658@2@b" alt="" />
                    <img className="w-full block aspect-[16/8] snap-center" src="https://th.bing.com/th/id/OIP.7mOOPZD3aJEg1bot_RYVBgHaEU?rs=1&pid=ImgDetMain" alt="" />
                    <img className="w-full block aspect-[16/8] snap-center" src="https://wallpaperaccess.com/full/1194354.jpg" alt="" />

                </div>
            </div>

            <HederBar setIsFormShown={setIsFormShown} isFormShown={isFormShown} />
            <Outlet />
        </>
    )
}
