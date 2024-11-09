import { useState, useEffect } from "react";
import axios from "axios";
import { Check, CheckSquareOffset, PencilSimple, Plus, SignOut, Trash, Warning, X } from "phosphor-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function ToDo() {
    const [isFormShown, setIsFormShown] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    // Editing state
    const [isEditMode, setIsEditMode] = useState(false);
    const [editTaskId, setEditTaskId] = useState();
    const [singleTaskTitle, setSingleTaskTitle] = useState("");
    const [singleTaskDescription, setSingleTaskDescription] = useState("");

    const serverUrl = 'https://taskmanager-server-production.up.railway.app'

    useEffect(() => {
        const uid = localStorage.getItem("uid");

        const getCurrentUser = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/u/user/${uid}`);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to get user:", error);
            }
        };

        const fetchTasks = async () => {
            try {
                const response = await axios.get(serverUrl + "/api/todos", {
                    headers: { uid }
                });
                let tasks = response.data
                let flippedTask = tasks.reverse()
                console.log(flippedTask);
                setTasks(flippedTask);
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
        let res = await axios.post(serverUrl + "/api/user/logout", { headers: { uid } });
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        window.location.reload();
    };


    const handleCheckboxChange = async (taskId, currentStatus) => {
        try {
            const updatedStatus = !currentStatus;
            await axios.put(`${serverUrl}/api/todos/${taskId}`, { completed: updatedStatus });

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
            await axios.put(`${serverUrl}/api/todos/edit/${editTaskId}`, {
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
            await axios.delete(`${serverUrl}/api/todos/${taskId}`);
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
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!title || !description || !date) {
            setMessage("All fields are required.");
            return;
        }

        try {
            const response = await axios.post(serverUrl + "/api/todos", {
                title,
                description,
                date,
                completed: false,
                userId: localStorage.getItem("uid")
            });

            setTasks((prev) => [...prev, response.data]);
            resetForm();
            setMessage("Task added successfully!");
            setIsFormShown(false)
        } catch (error) {
            console.error("Failed to add task:", error);
            setMessage("Failed to add task. Please try again.");
        }
    };

    return (
        <div className=" border shadow-2xl h-screen m-auto flex flex-col items-center relative md:w-[480px] md:aspect-[2/3] md:mt-12">
            <div className="border-b">
                <div className="w-full flex justify-between items-center overflow-x-auto snap-x snap-mandatory scroll-smooth">
                    <img className="w-full block aspect-[16/8] snap-center" src="https://th.bing.com/th/id/OIP.CI71_QZJRHYc_PxnbMGmJAHaDG?rs=1&pid=ImgDetMain" alt="" />
                    <img className="w-full block aspect-[16/8] snap-center" src="https://cdn.wallpapersafari.com/19/81/jdOZBL.jpg" alt="" />
                    <img className="w-full block aspect-[16/8] snap-center" src="https://img.freepik.com/premium-photo/mountain-range-with-blue-purple-mountains-background_900396-9646.jpg" alt="" />
                </div>



                {user && (
                    <div className=" text-xl  text-center  flex w-full justify-between items-center px-6 py-4 ">
                        <p>Hi! {user.name}!</p>

                        <div className="  ">
                            <button className="p-3  hover:bg-slate-600 hover:text-white " onClick={() => { setIsFormShown(!isFormShown) }}>
                                <Plus />
                            </button>
                            <button onClick={logOut} className=" p-3 hover:bg-slate-600 hover:text-white">
                                <SignOut />
                            </button>
                        </div>
                    </div>
                )}
            </div>


            <div className="hidden">
                {
                    message && setTimeout(() => {
                        setMessage(null)
                    }, 3000)
                }
            </div>
            {message && <p className=" flex items-center gap-3 shadow-xl justify-between text-nowrap mb-6 text-sm text-center font-semibold fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white px-4 py-3 rounded-md z-50 ">
                {message}
                {/* <X onClick={() => { setMessage(null) }}></X> */}
            </p>}

            {
                isFormShown && <div className="w-full fixed bottom-0  shadow-md rounded p-6 inset-0 bg-slate-900/40 flex items-end" >
                    <div className="bg-slate-900/10 inset-0 fixed " onClick={() => { setIsFormShown(false) }}></div>
                    <form onSubmit={handleAddTask}
                        className="w-full bg-white shadow-md z-10  p-8 rounded-2xl">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Title</label>
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
                            className="w-full bg-slate-500 text-white font-bold py-2 px-4 rounded hover:bg-slate-600"
                        >
                            Add Task
                        </button>
                    </form>
                </div>
            }


            {loading ? (
                <p className="mt-12">Loading tasks...</p>
            ) : (
                <div className="w-full bg-white flex-1  rounded p-6 space-y-6">
                    <h2 className="text-2xl font-light text-gray-800 flex items-center gap-2 py-2 "> <CheckSquareOffset></CheckSquareOffset> Tasks</h2>
                    {tasks.length === 0 && (
                        <p className="text-gray-500 w-full text-center mt-16 flex items-center justify-center flex-col gap-2">
                            <Warning size={32} />
                            No tasks found
                        </p>
                    )}
                    {tasks.map((task) => (
                        <div key={task._id} className="flex items-cneter gap-4 justify-between rounded-lg border  hover:shadow-lg p-5 pr-2">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange(task._id, task.completed)}
                                checked={task.completed}
                                className="  text-blue-600 text-xl"

                            />

                            <div className="flex items-center w-full ">
                                <div className="w-full">
                                    {editTaskId === task._id && isEditMode ? (
                                        <div className="ml-2">
                                            <input
                                                type="text"
                                                value={singleTaskTitle}
                                                onChange={(e) => setSingleTaskTitle(e.target.value)}
                                                className=" animate-pulse text-xl font-bold w-full mb-2 outline-0 focus:border focus:p-3 focus:bg-gray-50 rounded-md transition-all duration-100 "
                                                autoFocus
                                            />
                                            <textarea
                                                type="text"
                                                value={singleTaskDescription}
                                                onChange={(e) => setSingleTaskDescription(e.target.value)}
                                                className=" w-full h-auto overflow-auto outline-0 focus:border focus:p-3 animate-pulse focus:bg-gray-50 rounded-md transition-all duration-100 "

                                            />
                                        </div>
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
                                        <div className="flex items-center flex-col">
                                            <button className='p-3 hover:bg-red-100 rounded-lg ' onClick={() => { deleteTodo(task._id); setMessage("Deleting task...") }}>
                                                <Trash size={19} />
                                            </button>
                                            <button className='p-3 hover:bg-green-100 rounded-lg ' onClick={() => { editTodo(); setMessage("Updating task...") }}>
                                                <Check size={19} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button className='p-3 hover:bg-green-100 rounded-lg ' onClick={() => toggleEditMode(task._id)}>
                                            <PencilSimple size={19} />
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
