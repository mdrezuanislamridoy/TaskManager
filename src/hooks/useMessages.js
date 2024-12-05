import useSWR from "swr";
import axios from "axios";
import constants from "../../constant";


const serverUrl = constants.serverUrl;
const fetchMessages = async ([url, chatId]) => { 
    if (!chatId) {
        console.error("Chat ID is required to load messages.");
        return [];
    }
    try {
        const response = await axios.get(url, {
            headers: { chatid: chatId },
        });  
        return response.data;
    } catch (err) {
        console.error(`Failed to load messages for chatId ${chatId}: ${err.message}`);
        return []; // Return an empty array to prevent UI crashes
    }
};

const useMessages = (chatId) => {
    const { data, error } = useSWR(
        chatId ? [`${serverUrl}/api/message/getChatMessages`, chatId] : null,
        fetchMessages
    ); 

    return {
        messages: data || [], // Ensure an empty array is returned if data is undefined
        isLoading: !error && !data,
        isError: error,
    };
};

export default useMessages;
