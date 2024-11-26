import { NavLink, Outlet } from "react-router-dom"




const Chats = () => {
    
    return (
        <div>
            <div className="flex items-center my-2 border-b justify-evenly">
                <NavLink
                    to='/chats/AllMessage'
                    className={({ isActive }) =>
                        `w-1/3 px-6 py-3 text-gray-600 hover:text-gray-900 text-center transition-colors ${isActive ? 'border-b-2 border-gray-900 text-gray-900 font-medium ' : ''}`
                    }
                >
                    All Chats
                </NavLink>
                <NavLink
                    to='/chats/contacts'
                    className={({ isActive }) =>
                        `w-1/3 px-6 py-3 text-gray-600 hover:text-gray-900 text-center transition-colors ${isActive ? 'border-b-2 border-gray-900 text-gray-900 font-medium' : ''}`
                    }
                >
                    Contacts
                </NavLink>
            </div>
            <Outlet></Outlet>
        </div>
    )
}   

export default Chats