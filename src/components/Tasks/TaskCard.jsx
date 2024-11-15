import { useContext, useState } from "react";
import { Calendar, Check, PencilSimple, Trash } from "phosphor-react";
import todoService from "../../../Services/todoService";
import TaskContext from "../../../Context/taskContext";



const TaskCard = ({ task, setMessage }) => {

    const { tasks, setTasks } = useContext(TaskContext)
    // Editing state
    const [isEditMode, setIsEditMode] = useState(true);
    const [editTaskId, setEditTaskId] = useState();
    const [singleTaskTitle, setSingleTaskTitle] = useState("");
    const [singleTaskDescription, setSingleTaskDescription] = useState("");


    const handleCheckboxChange = async (taskId, currentStatus) => {
        try {
            const updatedStatus = !currentStatus;
            await todoService.handleCheckboxChange(taskId, currentStatus);
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
            const selectedTask = task
            setEditTaskId(taskId);
            setSingleTaskTitle(selectedTask.title);
            setSingleTaskDescription(selectedTask.description);
            setIsEditMode(true);
        }
    };

    const editTodo = async () => {
        if (!editTaskId) return;
        let data = {
            title: singleTaskTitle,
            description: singleTaskDescription
        }
        try {
            await todoService.editTodo(editTaskId, data);
            setTasks((prev) =>
                prev.map((task) =>
                    task._id === editTaskId
                        ? { ...task, title: singleTaskTitle, description: singleTaskDescription }
                        : task
                )
            );
            await setMessage("Task updated successfully!");
            setIsEditMode(false);
        } catch (error) {
            console.error("Failed to update task:", error);
            setMessage("Failed to update task. Please try again.");
        }
    };
    const deleteTodo = async (taskId) => {
        try {
            await todoService.deleteTodo(taskId);
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
            setMessage("Task deleted successfully!");
        } catch (error) {
            console.error("Failed to delete task:", error);
            setMessage("Failed to delete task. Please try again.");
        }
    };

    return (
        <div key={task._id} className="flex items-cneter gap-4 justify-between rounded-lg border  hover:shadow-lg p-5 pr-2">
            <input
                type="checkbox"
                onChange={() => handleCheckboxChange(task._id, task.completed)}
                checked={task.completed}
                className="w-5 h-5 mt-2 text-blue-600 text-xl"
            />

            <div className="flex items-center w-full gap-4">
                <div className="flex-1">
                    {editTaskId === task._id && isEditMode ? (
                        <div className="space-y-3 p-2 bg-gray-50 rounded-lg">
                            <input
                                type="text"
                                value={singleTaskTitle}
                                onChange={(e) => setSingleTaskTitle(e.target.value)}
                                className="w-full text-lg font-semibold px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                autoFocus
                            />
                            <textarea
                                value={singleTaskDescription}
                                onChange={(e) => setSingleTaskDescription(e.target.value)}
                                className="w-full min-h-[80px] px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                                {task.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 border-b border-gray-100 pb-2">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(task.date).toLocaleDateString()}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-100 cursor-pointer whitespace-pre-wrap">
                                {task.description}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex-shrink-0">
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
    )
}

export default TaskCard;