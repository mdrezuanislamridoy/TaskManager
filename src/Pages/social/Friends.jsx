import { useContext, useEffect, useState } from "react";
import userService from "../../../Services/userServices";
import UserContext from "../../../Context/userContext";
import friendService from "../../../Services/FriendService";
import chatService from "../../../Services/chatServices";
import { useNavigate } from "react-router-dom";





const FriendPage = () => {

    const { currentUser } = useContext(UserContext);
    const [friendsData, setFriendsData] = useState([]);

    const navigate = useNavigate();
    
    const sendMessage = async (receiverUID) =>{
        const inboxID = await chatService.createChat(currentUser._id, receiverUID)
        navigate(`/message/${inboxID}`)
    }
    useEffect(() => {
        const loadFriendsData = async () => {
            let friends = await friendService.getFriends(currentUser._id)
            setFriendsData(friends);
        };
        
        loadFriendsData();
    }, [currentUser]);
    return <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 md:pr-4">
            <div className="min-h-screen bg-white rounded-lg shadow-lg">
                
                <div className="p-6 pt-4">
                    <h3 className="text-lg font-semibold">Friends</h3>
                    <ul className="mt-2">
                        {friendsData.map((friend, index) => (
                            <li key={friend._id} className="flex items-center mt-2">
                                <div className="w-12 h-12 overflow-hidden rounded-full">
                                    <img src={"https://picsum.photos/233"} alt="Friend" className="object-cover w-full h-full" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-gray-600">{friend.name}</p>
                                </div>
                                <div className="ml-auto">
                                    <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600" onClick={() => sendMessage(friend._id)}>
                                        Message
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
}

export default FriendPage