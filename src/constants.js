



const constants = {
    serverUrl: typeof process !== 'undefined' && process.env ? process.env.SERVER_URL : "https://taskmanager-server-production.up.railway.app",
};
export default constants;