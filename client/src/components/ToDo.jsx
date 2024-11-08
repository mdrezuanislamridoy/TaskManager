import { useState, useEffect } from "react";
import axios from "axios";
import { Check, PencilSimple, SignOut, Trash, X } from "phosphor-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    // Editing state
    const [isEditMode, setIsEditMode] = useState(false);
    const [editTaskId, setEditTaskId] = useState();
    const [singleTaskTitle, setSingleTaskTitle] = useState("");
    const [singleTaskDescription, setSingleTaskDescription] = useState("");


    useEffect(() => {
        const uid = localStorage.getItem("uid");

        const getCurrentUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/api/u/user/${uid}`);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to get user:", error);
            }
        };

        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:3003/api/todos", {
                    headers: { uid }
                });
                setTasks(response.data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        getCurrentUser();
        fetchTasks();
    }, []);

    const logOut = async () => {
        const uid = localStorage.getItem("uid");
        let res = await axios.post("http://localhost:3003/api/user/logout", { headers: { uid } });
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        window.location.reload();
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!title || !description || !date) {
            setMessage("All fields are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3003/api/todos", {
                title,
                description,
                date,
                completed: false,
                userId: localStorage.getItem("uid")
            });

            setTasks((prev) => [...prev, response.data]);
            resetForm();
            setMessage("Task added successfully!");
        } catch (error) {
            console.error("Failed to add task:", error);
            setMessage("Failed to add task. Please try again.");
        }
    };

    const handleCheckboxChange = async (taskId, currentStatus) => {
        try {
            const updatedStatus = !currentStatus;
            await axios.put(`http://localhost:3003/api/todos/${taskId}`, { completed: updatedStatus });

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId ? { ...task, completed: updatedStatus } : task
                )
            );
            setMessage("Task status updated successfully!");
        } catch (error) {
            console.error("Failed to update task:", error);
            setMessage("Failed to update task. Please try again.");
        }
    };

    const toggleEditMode = (taskId) => {
        if (isEditMode && editTaskId === taskId) {
            setIsEditMode(false);
            setEditTaskId(null);
        } else {
            const selectedTask = tasks.find((task) => task._id === taskId);
            setEditTaskId(taskId);
            setSingleTaskTitle(selectedTask.title);
            setSingleTaskDescription(selectedTask.description);
            setIsEditMode(true);
        }
    };

    const editTodo = async () => {
        if (!editTaskId) return;

        try {
            await axios.put(`http://localhost:3003/api/todos/edit/${editTaskId}`, {
                title: singleTaskTitle,
                description: singleTaskDescription
            });

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === editTaskId
                        ? { ...task, title: singleTaskTitle, description: singleTaskDescription }
                        : task
                )
            );

            setIsEditMode(false);
            resetForm();
            setMessage("Task updated successfully!");
        } catch (error) {
            console.error("Failed to update task:", error);
            setMessage("Failed to update task. Please try again.");
        }
    };
    const deleteTodo = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3003/api/todos/${taskId}`);
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
            setMessage("Task deleted successfully!");
        } catch (error) {
            console.error("Failed to delete task:", error);
            setMessage("Failed to delete task. Please try again.");
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setEditTaskId(null);
        setSingleTaskTitle("");
        setSingleTaskDescription("");
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center    ">
            {user && (
                <div className="  text-xl bg-white shadow-lg text-center text-gray-500 flex w-full justify-between items-center px-6 py-4">
                    <p>Hi! {user.name}!</p>
                    <button onClick={logOut} className="p-3">
                        <SignOut />
                    </button>
                </div>
            )}


            {
                message && setTimeout(() => {
                    setMessage(null)
                }, 2000)
            }
            {message && <p className=" flex items-center gap-3 shadow-xl justify-between text-nowrap mb-4 text-sm text-center font-semibold fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-4 py-3 rounded-md">
                {message}
                <X onClick={() => { setMessage(null) }}></X>
            </p>}

            <form onSubmit={handleAddTask} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="Enter task title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="Enter task description"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Task Date</label>
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
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Task
                </button>
            </form>

            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <div className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold text-gray-800  ">Tasks</h2>
                    {tasks.map((task) => (
                        <div key={task._id} className="flex items-start justify-between my-4 p-4 gap-2 rounded-lg border   hover:shadow-lg">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange(task._id, task.completed)}
                                checked={task.completed}
                                className="mt-2 mr-4 ml-2 h-5 w-5 text-blue-600"
                            />

                            <div className="flex items-center justify-between w-full ">
                                <div className="w-full">
                                    {editTaskId === task._id && isEditMode ? (
                                        <>
                                            <input
                                                type="text"
                                                value={singleTaskTitle}
                                                onChange={(e) => setSingleTaskTitle(e.target.value)}
                                                className="border-b text-2xl font-bold w-full mb-2"
                                            />
                                            <input
                                                type="text"
                                                value={singleTaskDescription}
                                                onChange={(e) => setSingleTaskDescription(e.target.value)}
                                                className="border-b w-full overflow-auto"
                                            />
                                        </>
                                    ) : (
                                        <div className="space-y-1 w-full   ">
                                            <h3 className={`text-xl ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                                                {task.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm border-b w-full pb-2">Date: {new Date(task.date).toLocaleDateString()}</p>
                                            <p className="text-gray-600">{task.description}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="">
                                    {editTaskId === task._id && isEditMode ? (
                                        <div className="flex items-center">
                                            <button className='p-3 hover:bg-red-100 rounded-lg ' onClick={() => { deleteTodo(task._id) }}>
                                                <Trash />
                                            </button>
                                            <button className='p-3 hover:bg-green-100 rounded-lg ' onClick={editTodo}>
                                                <Check />
                                            </button>
                                        </div>
                                    ) : (
                                        <button className='p-3 hover:bg-green-100 rounded-lg ' onClick={() => toggleEditMode(task._id)}>
                                            <PencilSimple />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ToDo;
