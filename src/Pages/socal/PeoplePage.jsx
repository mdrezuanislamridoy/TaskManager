import { useContext, useEffect, useState } from "react";
import UserContext from "../../../Context/userContext";
import userService from "../../../Services/userServices";
import { NavLink, Outlet } from "react-router-dom";




const PeoplePage = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div>
            <div className="flex items-center justify-evenly border-b my-2">

                <NavLink
                    to='/social/alluser'
                    className={({ isActive }) =>
                        `w-1/3 px-6 py-3 text-gray-600 hover:text-gray-900 text-center transition-colors ${isActive ? 'border-b-2 border-gray-900 text-gray-900 font-medium ' : ''}`
                    }
                >
                    All Users
                </NavLink>
                <NavLink
                    to='/social/allFriends'
                    className={({ isActive }) =>
                        `w-1/3 px-6 py-3 text-gray-600 hover:text-gray-900 text-center transition-colors ${isActive ? 'border-b-2 border-gray-900 text-gray-900 font-medium' : ''}`
                    }
                >
                    Friends
                </NavLink>
            </div>
            <div className="flex items-center flex-col justify-center bg-[url('https://picsum.photos/800/400')] bg-cover bg-center m-6 p-7 mb-2 rounded-xl overflow-hidden relative" >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
                    <img src={currentUser?.photoURL || 'https://picsum.photos/120'} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="mt-4 text-center z-10">
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">{currentUser?.name || 'User'}</h2>
                    <p className="text-gray-200 drop-shadow-md mt-2">{currentUser?.email}</p>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default PeoplePage;
