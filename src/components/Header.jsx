import { useContext, useEffect, useState } from "react";
import { ArrowClockwise, ChatDots, DotsNine, DotsThree, DotsThreeCircle, DotsThreeVertical, Hamburger, HouseSimple, LinkSimpleHorizontal, MagnifyingGlass, PencilSimpleLine, Plus, SignOut, User, UserCircle, Users } from "phosphor-react";
import userService from "../../Services/userServices";
import { Link } from "react-router-dom";
import TodoForm from "./Tasks/TodoForm";
import PopUpMessage from "./popUpMessage";
import UserContext from "../../Context/userContext";
import { Avater } from "../Pages/social/SocialPage";

const SidePanel = ({ isOpen, sidePanelController, userData }) => {
    return (
        <div className={`fixed inset-0 flex z-[9999] ${isOpen ? 'slide-in' : 'slide-out'}`}>
            <div className="fixed inset-0 transition-opacity bg-gray-900/60 backdrop-blur-sm" onClick={() => sidePanelController(false)}></div>
            <div className="flex flex-col w-[70%] max-w-xs bg-white shadow-2xl h-full p-6 z-[9999] transform transition-transform duration-300 ease-in-out">
                <Link to='/social' onClick={() => sidePanelController(false)}>
                    <div className="flex flex-col items-center pb-6 mb-6 border-b border-gray-200 ">
                        <Avater url='https://avatars.githubusercontent.com/u/106436211?v=4' className='mb-4 ' > </Avater>
                        <h3 className="text-lg font-semibold text-gray-800">{userData.name}</h3>
                        <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                </Link>

                <nav className="space-y-3">
                    <Link to="/profile" className="flex items-center gap-4 p-2 text-xl text-gray-600 transition-all duration-200 rounded-lg hover:scale-95 hover:text-blue-600 hover:bg-blue-50">
                        <User weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Profile</span>
                    </Link>
                    <Link to="/social" className="flex items-center gap-4 p-2 text-xl text-gray-600 transition-all duration-200 rounded-lg hover:scale-95 hover:text-blue-600 hover:bg-blue-50">
                        <Users weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Friends</span>
                    </Link>
                    <Link to="/" className="flex items-center gap-4 p-2 text-xl text-gray-600 transition-all duration-200 rounded-lg hover:scale-95 hover:text-blue-600 hover:bg-blue-50">
                        <DotsThree weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Tasks</span>
                    </Link>
                    <Link to="/chats" className="flex items-center gap-4 p-2 text-xl text-gray-600 transition-all duration-200 rounded-lg hover:scale-95 hover:text-blue-600 hover:bg-blue-50">
                        <ChatDots weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Chats</span>
                    </Link>
                    <Link to="/" className="flex items-center gap-4 p-2 text-xl text-gray-600 transition-all duration-200 rounded-lg hover:scale-95 hover:text-blue-600 hover:bg-blue-50">
                        <PencilSimpleLine weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Notes</span>
                    </Link>
                    <Link to="/calendar" className="flex items-center gap-4 p-2 text-xl text-gray-600 transition-all duration-200 rounded-lg hover:scale-95 hover:text-blue-600 hover:bg-blue-50">
                        <DotsThreeCircle weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Calendar</span>
                    </Link>
                    <Link to="/contacts" className="flex items-center gap-4 p-2 text-xl text-gray-600 transition-all duration-200 rounded-lg hover:scale-95 hover:text-blue-600 hover:bg-blue-50">
                        <ChatDots weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Contacts</span>
                    </Link>
                </nav>
            </div>
        </div>)
}

export default function HederBar({ setTasks }) {
    const [user, setUser] = useState(null);
    const uid = localStorage.getItem("uid");
    const [message, setMessage] = useState('');

    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        const fetchUser = () => {
            setUser(currentUser);
        };
        fetchUser();
    }, [currentUser]); // Added currentUser as a dependency to ensure it updates correctly

    const logOut = () => {
        userService.logOut();
    }
    return (
        <div className="sticky top-0 z-20">
            {
                message && <PopUpMessage message={message} setMessage={setMessage}></PopUpMessage>
            }
            {user && (<div className="sticky top-0 flex items-center justify-between w-full px-6 py-4 text-lg text-center bg-white shadow-md ">

                <button className="flex items-center gap-2 transition-all duration-100 hover:scale-95" onClick={() => setIsSidePanelOpen(true)} >
                    <DotsNine /> <span>Hi! {user.name}</span>
                </button>

                {isSidePanelOpen && <SidePanel isOpen={isSidePanelOpen} sidePanelController={setIsSidePanelOpen} userData={currentUser} ></SidePanel>}


                <div className="relative ">
                    <button className="p-3 hover:bg-slate-600 hover:text-white " >
                        <Link to={'/'}> <HouseSimple /></Link>
                    </button>
                    <button className="p-3 hover:bg-slate-600 hover:text-white " onClick={() => { window.location.reload() }} >
                        <ArrowClockwise />
                    </button>
                    {/* onClick={() => { setIsSearchPageShown(!isSearchPageShown); setIsFormShown(false) }} */}

                    <button onClick={() => { setIsDropDownOpen(!isDropDownOpen) }} className={`p-3  ${isDropDownOpen ? 'bg-slate-200 text-slate-600' : 'hover:bg-slate-600 hover:text-white'}`}>
                        <DotsThree />
                    </button>

                    {isDropDownOpen && (
                        <>
                            <div className="fixed inset-0" onClick={() => setIsDropDownOpen(false)}></div>
                            <div className="absolute right-0 z-10 p-3 bg-white border-t rounded-lg shadow-xl top-12">
                                <button onClick={logOut} className="flex items-center w-full gap-3 px-4 py-2 transition-colors rounded-md hover:bg-gray-50">
                                    <SignOut className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm text-gray-700 text-nowrap">Sign out</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            )}


        </div>

    )
}
