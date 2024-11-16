import { useContext, useEffect, useState } from "react";
import { ArrowClockwise, ChatDots, DotsNine, DotsThree, DotsThreeCircle, DotsThreeVertical, Hamburger, HouseSimple, LinkSimpleHorizontal, MagnifyingGlass, PencilSimpleLine, Plus, SignOut, User, UserCircle, Users } from "phosphor-react";
import userService from "../../Services/userServices";
import { Link } from "react-router-dom";
import TodoForm from "./Tasks/TodoForm";
import PopUpMessage from "./popUpMessage";
import UserContext from "../../Context/userContext";
import { Avater } from "../Pages/socal/SocialPage";

const SidePanel = ({isOpen ,  sidePanelController, userData }) => {
    return (
        <div className={`fixed inset-0 flex z-[9999] ${isOpen ? 'slide-in' : 'slide-out'}`}>
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => sidePanelController(false)}></div>
            <div className="flex flex-col w-[70%] max-w-xs bg-white shadow-2xl h-full p-6 z-[9999] transform transition-transform duration-300 ease-in-out">
                <Link to='/social' onClick={() => sidePanelController(false)}>
                    <div className="flex flex-col items-center pb-6 mb-6 border-b border-gray-200  ">
                        <Avater url='https://avatars.githubusercontent.com/u/106436211?v=4' className='mb-4  ' > </Avater>
                        <h3 className="text-lg font-semibold text-gray-800">{userData.name}</h3>
                        <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                </Link>

                <nav className="space-y-3">
                    <Link to="/profile" className="flex hover:scale-95  items-center gap-4 text-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition-all duration-200">
                        <User weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Profile</span>
                    </Link>
                    <Link to="/social" className="flex hover:scale-95  items-center gap-4 text-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition-all duration-200">
                        <Users weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Friends</span>
                    </Link>
                    <Link to="/" className="flex hover:scale-95  items-center gap-4 text-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition-all duration-200">
                        <DotsThree weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Tasks</span>
                    </Link>
                    <Link to="/" className="flex hover:scale-95  items-center gap-4 text-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition-all duration-200">
                        <PencilSimpleLine weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Notes</span>
                    </Link>
                    <Link to="/calendar" className="flex hover:scale-95  items-center gap-4 text-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition-all duration-200">
                        <DotsThreeCircle weight="bold" size={20} />
                        <span className="text-[16px] font-medium">Calendar</span>
                    </Link>
                    <Link to="/contacts" className="flex hover:scale-95  items-center gap-4 text-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition-all duration-200">
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
        setUser(currentUser)
    }, [])



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

                    <button className=" flex gap-2 items-center hover:scale-95 transition-all duration-100" onClick={() => setIsSidePanelOpen(true)} >
                        <DotsNine/> <span>Hi! {user.name}</span>                    
                    </button>

                    {isSidePanelOpen && <SidePanel isOpen={isSidePanelOpen} sidePanelController={setIsSidePanelOpen} userData={currentUser} ></SidePanel>}


                    <div className=" relative ">
                        <button className="p-3  hover:bg-slate-600 hover:text-white " >
                            <Link to={'/'}> <HouseSimple /></Link>
                        </button>
                        <button className="p-3  hover:bg-slate-600 hover:text-white " onClick={() => { window.location.reload() }} >
                            <ArrowClockwise />
                        </button>
                        {/* onClick={() => { setIsSearchPageShown(!isSearchPageShown); setIsFormShown(false) }} */}

                        <button onClick={() => { setIsDropDownOpen(!isDropDownOpen) }} className={`p-3  ${isDropDownOpen ? 'bg-slate-200 text-slate-600' : 'hover:bg-slate-600 hover:text-white'}`}>
                            <DotsThree />
                        </button>

                        {isDropDownOpen && (
                            <>
                                <div className="fixed inset-0" onClick={() => setIsDropDownOpen(false)}></div>
                                <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl p-3 z-10 border-t">
                                    <button onClick={logOut} className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
                                        <SignOut className="text-gray-500 h-5 w-5" />
                                        <span className="text-gray-700 text-sm text-nowrap">Sign out</span>
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
