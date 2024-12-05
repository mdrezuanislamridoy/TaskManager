import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import chatService from "../../../Services/chatServices";
import UserContext from "../../../Context/userContext";



export default function ChatList() {
    const [chats, setChats] = useState([])
    const uid = localStorage.getItem('uid')

    const {currentUser} = useContext(UserContext) 
     
    useEffect(() => {
        const uid = localStorage.getItem('uid')
        chatService.loadAllChats(uid).then((chats) => { 
            setChats(chats)   
        })
    }, [])
    return (

        <div>
             
            {
                chats ? chats.map((chat) => {
                    return (
                        <div key={chat._id} className="p-6 m-4 text-lg transition-shadow duration-300 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg">
                            <Link to={'/message/' + chat._id} className="block">
                                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                                    {chat.members.filter(member => member._id !== uid).map(member => member.name).join(', ')}
                                </h3>
                                <p className="text-base text-gray-600">
                                    {chat?.lastMessage ? (
                                        <span>
                                            <span className="font-medium">{currentUser.name === chat.lastMessage.senderName ? "You" : chat.lastMessage.senderName}</span>
                                            <span className="mx-2">-</span>
                                            <span className="text-gray-500">{chat.lastMessage.content}</span>
                                        </span>
                                    ) : (
                                        <span className="italic text-gray-400">No messages yet</span>
                                    )}
                                </p>
                            </Link>
                        </div>
                    )
                }) : <div className="p-8 text-center text-gray-500">Loading...</div>
            }
        </div>
    )
};
