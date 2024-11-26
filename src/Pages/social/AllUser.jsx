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
            <div className="min-h-screen bg-white rounded-lg shadow-lg">

                <div className="p-6 pt-4">
                    <h3 className="text-lg font-semibold">Friends</h3>
                    <ul className="mt-2">
                            {otherUser.map((friend) => (
                                <li key={friend._id} className="flex items-center p-6 py-3 my-4 border rounded-md">
                                    <div className="w-12 h-12 overflow-hidden rounded-full">
                                        <img src={"https://picsum.photos/233"} alt="Friend" className="object-cover w-full h-full" />
                                    </div>
                                    <div className="ml-4 text-2xl">
                                        <p className="text-gray-600">{friend.name}</p>
                                    </div>
                                    <div className="ml-auto">
                                        {localUserState.friends.includes(friend._id) ? (
                                            <button className="p-4 font-semibold text-black bg-blue-100 rounded hover:bg-blue-600">
                                                <Chat /> Chat
                                            </button>
                                        ) : localUserState.sentFR.includes(friend._id) ? (
                                            <button className="p-4 font-semibold text-black bg-green-100 rounded hover:bg-blue-600"
                                                    onClick={() => cancelFriendReq(friend._id)}
                                            >
                                                <X /> cancel
                                            </button>
                                        ) : localUserState.pendingFR.includes(friend._id) ? (
                                            <button className="p-4 font-semibold text-black bg-red-100 rounded hover:bg-red-600" 
                                               >
                                            <Check /> accept
                                            </button>
                                        ) : (
                                            <button className="p-4 font-semibold text-black rounded bg-amber-100 hover:bg-amber-600" 
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