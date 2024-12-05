import axios from "axios";
import socket from "../src/socket";
import constants from "../constant";
import { data } from "autoprefixer";

const serverUrl = constants.serverUrl;

const chatService = {}

chatService.loadAllChats = async (uid) => {
    const response = await axios.get(`${serverUrl}/api/message/getChats`, { headers: { uid } });
    return response.data.chats
}
chatService.loadMessages = async (chatId) => {
    if (!chatId) {
        console.error("Chat ID is required to load messages.");
        return [];
    }
    try {
        const response = await axios.get(`${serverUrl}/api/message/getChatMessages`, {
            headers: { chatid: chatId },
        });
        return response.data;
    } catch (err) {
        console.error(`Failed to load messages for chatId ${chatId}: ${err.message}`);
        return []; // Return an empty array to prevent UI crashes
    }
};
chatService.getChatInfo = async (chatId) => {
    if (!chatId) {
        console.error("Chat ID is required to fetch chat info.");
        return null;
    }

    try {
        const response = await axios.get(`${serverUrl}/api/message/getChatInfo`, {
            headers: {
                'Content-Type': 'application/json',
                chatid: chatId,
            },
        });
        console.log(`Fetched chat info for chatID ${chatId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching chat info for chatID ${chatId}: ${error.message}`);
        return null; // Return null or appropriate fallback to handle errors gracefully
    }
};

chatService.createChat = async (senderUID, receiverUID) => {
    console.log(senderUID);

    const response = await fetch(`${serverUrl}/api/message/createChat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Ensure the body is interpreted as JSON
            'uid': senderUID // Custom header for sender UID
        },
        body: JSON.stringify({ uid: receiverUID }) // Convert object to JSON string
    });

    const data = await response.json();
    console.log(data);
    return data;
};

export default chatService;