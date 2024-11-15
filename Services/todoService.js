import axios from "axios";
import constants from "../constant";



const todoService = {}
const serverUrl = constants.serverUrl
const uid = localStorage.getItem("uid");

todoService.saveTodo = (todo) => {
    return axios.post(serverUrl + "/api/todos", todo);
}
todoService.fetchTodos = () => {
    return axios.get(serverUrl + "/api/todos", {
        headers: { uid }
    });
}

todoService.handleCheckboxChange = (taskId, currentStatus) => {
    return axios.put(serverUrl + `/api/todos/${taskId}`, { completed: !currentStatus });
}

todoService.editTodo = (editTaskId, data) => {
    return axios.put(serverUrl + `/api/todos/edit/${editTaskId}`, data);
  
}

todoService.deleteTodo = (taskId) => {
    return axios.delete(serverUrl + `/api/todos/${taskId}`); 
}
export default todoService;