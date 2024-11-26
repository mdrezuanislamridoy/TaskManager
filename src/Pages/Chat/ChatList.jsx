import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import chatService from "../../../Services/chatServices";



export default function ChatList() {
    const [chats, setChats] = useState([])
    const uid = localStorage.getItem('uid')

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
                        <div key={chat._id} className="p-5 m-4 text-lg border rounded-md hover:shadow-md">
                            <Link to={'/message/' + chat._id}> {chat.name}</Link>
                        </div>
                    )
                }) : "Loading..."
            }
        </div>
    )
};
