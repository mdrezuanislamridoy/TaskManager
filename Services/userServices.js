import axios from "axios";
import constant from "../constant"

const userService = {}
const serverUrl = constant.serverUrl

userService.getUser = async (uid) => {

    try {
        const response = await axios.get(`${serverUrl}/api/u/user`, { headers: { uid: uid } });
        return response.data;
    } catch (error) {
        console.error("Failed to get user:", error);
        throw error;
    }
};

userService.getAllUser = async (uid) => {
    try { 
        await console.log(uid);
        const response = await axios.get(`${serverUrl}/api/friends/`, { headers: { uid: uid } });
        return response.data;
    } catch (error) {
        console.error("Failed to get users:", error);
        throw error;
    }
};


userService.getUserFromUidList = async (uidList) => {
    let users = []
    for (let uid of uidList) {
        let user = await userService.getUser(uid)
        users.push(user)
    }
    return users

}

userService.logOut = async () => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
        throw new Error("No user ID found in localStorage");
    }
    let res = await axios.post(serverUrl + "/api/user/logout", { headers: { uid } });
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    window.location.reload();
};

userService.isValidUser = async (uid, token) => {
    if (!uid || !token) {
        throw new Error("User ID and token are required");
    }
    const user = await userService.getUser(uid)
    return user.token == token
}
export default userService;