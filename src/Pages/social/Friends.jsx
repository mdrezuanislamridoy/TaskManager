import { useContext, useEffect, useState } from "react";
import userService from "../../../Services/userServices";
import UserContext from "../../../Context/userContext";
import friendService from "../../../Services/FriendService";





const FriendPage = () => {

    const { currentUser } = useContext(UserContext);
    const [friendsData, setFriendsData] = useState([]);

    useEffect(() => {
        const loadFriendsData = async () => {
            let friends = await friendService.getFriends(currentUser._id)
            setFriendsData(friends);
        };
        
        loadFriendsData();
    }, [currentUser]);
    return <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 md:pr-4">
            <div className="bg-white shadow-lg rounded-lg min-h-screen">
                
                <div className="p-6 pt-4">
                    <h3 className="text-lg font-semibold">Friends</h3>
                    <ul className="mt-2">
                        {friendsData.map((friend, index) => (
                            <li key={friend._id} className="flex items-center mt-2">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src={"https://picsum.photos/233"} alt="Friend" className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-gray-600">{friend.name}</p>
                                </div>
                                <div className="ml-auto">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
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