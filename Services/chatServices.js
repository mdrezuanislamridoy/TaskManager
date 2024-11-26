import axios from "axios";
import socket from "../src/socket";
import constants from "../constant";

const serverUrl = constants.serverUrl;

const chatService = {}

chatService.loadAllChats = async (uid) => {
    const response = await axios.get(`${serverUrl}/api/message/getChats`, { headers: { uid } });
    return response.data
}
chatService.loadMessages = async (chatId) => {
    const response = await axios.get(`${serverUrl}/api/message/getChatMessages`, { headers: { chatId } });
     
    return response.data
}

export default chatService;