import axios from "axios";
import constants from "../constant"

const serverUrl = constants.serverUrl

const friendService = {}


friendService.getFriends = async (uid) => {
    try {
        const response = await axios.get(`${serverUrl}/api/friends/getFriends`, { headers: { uid } });
        return response.data;
    } catch (error) {
        console.error("Failed to get friends:", error);
        throw error;
    }
}; 

friendService.addFriend = async (uid ,  friendUid) => {  
    try {
        const response = await axios.post(`${serverUrl}/api/friends/addFriend`, { id : friendUid }, { headers: { uid } });
        console.log(response.data.message);
        return response.data;
    } catch (error) {
        console.error("Failed to add friend:", error);
        throw error;
    }
};

friendService.cancelFriend = async (uid, friendUid) => {
     
    try {
        const response = await axios.post(`${serverUrl}/api/friends/cancelReq`, { id: friendUid }, { headers: { uid } });
        console.log(response.data.message);
        return response.data;
    } catch (error) {
        console.error("Failed to cancel friend:", error);
        throw error;
    }
};
export default friendService;

