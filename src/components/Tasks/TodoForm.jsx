
import { NotePencil } from "phosphor-react";
import { useContext, useState } from "react"
import todoService from "../../../Services/todoService";
import TaskContext from "../../../Context/taskContext";


const TodoForm = ({ setIsFormShown,  setMessage }) => {
    const {tasks , setTasks} = useContext(TaskContext)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!title || !description || !date) {
            setMessage("All fields are required.");
            return;
        }
        let data = {
            title,
            description,
            date,
            completed: false,
            userId: localStorage.getItem("uid")
        }
        try {
            const response = await todoService.saveTodo(data);
            setTasks((prev) => [...prev, response.data]);
            setMessage("Task added successfully!"); 
            setIsFormShown(false);
        } catch (error) {
            console.error("Failed to add task:", error);
            setMessage("Failed to add task. Please try again.");
        }
    };


    return (

        <form onSubmit={handleAddTask}
            className="z-10 w-full md:w-[420px] p-8 bg-white shadow-md rounded-2xl">
            <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold"><NotePencil /> Create new task</h2>
            <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Enter task title"
                    required
                    autoFocus
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded md:h-[220px]"
                    placeholder="Enter task description"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700">Task Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />

            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white rounded bg-slate-500 hover:bg-slate-600"
            >
                Add Task
            </button>
        </form>
    )
}

export default TodoForm