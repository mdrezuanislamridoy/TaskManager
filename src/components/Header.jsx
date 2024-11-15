import { useEffect, useState } from "react";
import { ArrowClockwise, HouseSimple, MagnifyingGlass, Plus, SignOut, UserCircle } from "phosphor-react";
import userService from "../../Services/userServices";
import { Link } from "react-router-dom";
import TodoForm from "./Tasks/TodoForm";
import PopUpMessage from "./popUpMessage";

export default function HederBar({ setTasks }) {
    const uid = localStorage.getItem("uid");
    const [isFormShown, setIsFormShown] = useState(false)



    const [message, setMessage] = useState('');

    const [user, setUser] = useState(null);
    useEffect(() => {
        const uid = localStorage.getItem("uid");
        userService.getCurrentUser(uid).then((currentUser) => {
            setUser(currentUser);
        })

    }, []);

    const logOut = () => {
        userService.logOut();
    }
    return (
        <div className="sticky top-0 z-20">
            {
                message && <PopUpMessage message={message} setMessage={setMessage}></PopUpMessage>
            }
            {user && (
                <div className=" text-lg  text-center  flex w-full justify-between items-center px-6 py-4 sticky top-0 bg-white shadow-md ">
                    <Link to='/profile' className="flex  items-center gap-3">
                        <UserCircle size={24}> </UserCircle>
                        <p>Hi! {user.name}!</p>

                    </Link>
                    <div className="  ">
                        <button className="p-3  hover:bg-slate-600 hover:text-white " >
                            <Link to={'/'}> <HouseSimple /></Link>
                        </button> 
                        <button className="p-3  hover:bg-slate-600 hover:text-white " onClick={() => { window.location.reload() }} >
                            <ArrowClockwise />
                        </button>
                        {/* onClick={() => { setIsSearchPageShown(!isSearchPageShown); setIsFormShown(false) }} */}
                        <button className="p-3  hover:bg-slate-600 hover:text-white " >
                            <MagnifyingGlass />
                        </button>
                        <button onClick={logOut} className=" p-3 hover:bg-slate-600 hover:text-white">
                            <SignOut />
                        </button>
                    </div>
                </div>
            )}
            

        </div>

    )
}
