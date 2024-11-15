import axios from "axios";
import constant from "../constant"

const userService = {}
const serverUrl = constant.serverUrl


userService.getCurrentUser = async (uid) => {
    try {
        const response = await axios.get(`${serverUrl}/api/u/user/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get user:", error);
        throw error;
    }
};

userService.logOut = async () => {
    const uid = localStorage.getItem("uid");
    let res = await axios.post(serverUrl + "/api/user/logout", { headers: { uid } });
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    window.location.reload();
};
 
userService.isValidUser = async (uid, token) => {

    const user = await userService.getCurrentUser(uid)
    return user.token == token
}

export default userService;