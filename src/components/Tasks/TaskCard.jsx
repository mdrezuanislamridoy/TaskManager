import { useContext, useState } from "react";
import TaskBody from "./TaskBody";
import { Check, PencilSimple, Trash } from "phosphor-react";
import TaskEditor from "./TaskEditor";
import PopUpMessage from "../popUpMessage";
import todoService from "../../../Services/todoService";
import TaskContext from "../../../Context/taskContext";



const TaskCard = ({ task ,setMessage}) => {

    const { tasks, setTasks } = useContext(TaskContext)
    // Editing state
    const [isEditMode, setIsEditMode] = useState(false);
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
                        <TaskEditor
                            singleTaskTitle={singleTaskTitle}
                            singleTaskDescription={singleTaskDescription}
                            setSingleTaskTitle={setSingleTaskTitle}
                            setSingleTaskDescription={setSingleTaskDescription}
                        ></TaskEditor>
                    ) : (
                        <TaskBody task={task} />
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