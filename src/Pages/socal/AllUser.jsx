import { useContext, useEffect, useState } from "react";
import userService from "../../../Services/userServices";
import UserContext from "../../../Context/userContext";
import friendService from "../../../Services/FriendService";
import { Chat, Check, UserPlus, X } from "phosphor-react";





const AllUser = () => {
    const { currentUser } = useContext(UserContext);
    const [otherUser, setOtherUser] = useState([]);
    const [localUserState, setLocalUserState] = useState({
        friends: [],
        sentFR: [],
        pendingFR: []
    }); 
    const addFriend = async (otherUserUID) => {
        const res = await friendService.addFriend(currentUser._id, otherUserUID);
        console.log(res);
        if (res) {
            setLocalUserState(prev => ({
                ...prev,
                sentFR: [...prev.sentFR, otherUserUID]
            }));
        }
    }
    const cancelFriendReq = async (otherUserUID) => {
        const res = await friendService.cancelFriend(currentUser._id, otherUserUID);
        if (res) {
            setLocalUserState(prev => ({
                ...prev,
                sentFR: prev.sentFR.filter(id => id !== otherUserUID)
            }));
        }
    }

    useEffect(() => {
        setLocalUserState({
            friends: currentUser.friends,
            sentFR: currentUser.sentFR,
            pendingFR: currentUser.pendingFR
        });
    }, [currentUser]);

    useEffect(() => {
        const loadAllUsers = async () => {
            const allUsers = await userService.getAllUser(currentUser._id);
            setOtherUser(allUsers);
        };
        loadAllUsers();
    }, [currentUser]);
    return <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 md:pr-4">
            <div className="bg-white shadow-lg rounded-lg min-h-screen">

                <div className="p-6 pt-4">
                    <h3 className="text-lg font-semibold">Friends</h3>
                    <ul className="mt-2">
                            {otherUser.map((friend) => (
                                <li key={friend._id} className="flex items-center border my-4 p-6 py-3 rounded-md">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img src={"https://picsum.photos/233"} alt="Friend" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="ml-4 text-2xl">
                                        <p className="text-gray-600">{friend.name}</p>
                                    </div>
                                    <div className="ml-auto">
                                        {localUserState.friends.includes(friend._id) ? (
                                            <button className="bg-blue-100 hover:bg-blue-600 text-black font-semibold p-4 rounded">
                                                <Chat /> Chat
                                            </button>
                                        ) : localUserState.sentFR.includes(friend._id) ? (
                                            <button className="bg-green-100 hover:bg-blue-600 text-black font-semibold p-4 rounded"
                                                    onClick={() => cancelFriendReq(friend._id)}
                                            >
                                                <X /> cansel
                                            </button>
                                        ) : localUserState.pendingFR.includes(friend._id) ? (
                                            <button className="bg-red-100 hover:bg-red-600 text-black font-semibold p-4 rounded" 
                                               >
                                            <Check /> accept
                                            </button>
                                        ) : (
                                            <button className="bg-amber-100 hover:bg-amber-600 text-black font-semibold p-4 rounded" 
                                                onClick={() => addFriend(friend._id)}>
                                                <UserPlus /> Add
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                </div>
            </div>
        </div>
    </div>
}

export default AllUser