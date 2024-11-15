import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ArrowClockwise, Calendar, Check, CheckSquareOffset, MagnifyingGlass, NotePencil, PencilSimple, Plus, SignOut, SortAscending, Trash, UserCircle, Warning, X } from "phosphor-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TaskContext from "../../Context/taskContext";
import PopUpMessage from "../components/popUpMessage";
import TaskCard from "../components/Tasks/TaskCard";
import TodoForm from "../components/Tasks/TodoForm";


const NoTaskFound = () => {
    return (
        <div className="flex flex-col items-center justify-center flex-1 bg-red-800">
            <h2 className="text-2xl font-bold mb-4">No tasks found</h2>
            <p className="text-gray-600">You have no tasks. Add a task to get started.</p>
        </div>
    );
};
const TaskPageHeader = ({ isFormShown , setIsFormShown , setTasks }) => {
    const sortByIncomplete = () => {
        setTasks((prevTasks) => {
            return [...prevTasks].sort((a, b) => {
                if (a.completed === b.completed) {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                }
                return a.completed ? 1 : -1;
            });
        });
    }
    return <div className="flex items-center justify-between text-2xl">
        <h2 className=" font-light text-gray-800 flex items-center gap-2 py-2 "> <CheckSquareOffset></CheckSquareOffset> Tasks</h2>
        <div>
            <button className="p-3  hover:bg-slate-600 hover:text-white " onClick={() => { setIsFormShown(!isFormShown) }} >
                <Plus />
            </button>
        <button className="p-3  hover:bg-slate-600 hover:text-white " onClick={sortByIncomplete}>
                <SortAscending />
            </button>
        </div>
    </div>
}

const TodoPage = () => {

    const [isFormShown, setIsFormShown] = useState(false)
    const [message, setMessage] = useState('');
    const { tasks, setTasks } = useContext(TaskContext)


    return (
        <div className=" ">
            {
                message && <PopUpMessage message={message} setMessage={setMessage}></PopUpMessage>
            }
            {
                isFormShown && <div className="w-full fixed bottom-0  shadow-md rounded p-6 inset-0 bg-slate-900/40 flex items-end z-40" >
                    <div className="bg-slate-900/10 inset-0 fixed " onClick={() => { setIsFormShown(false) }}></div>
                    <TodoForm setIsFormShown={setIsFormShown} setMessage={setMessage} />
                </div>
            }

            <div className="w-full bg-white flex-1  rounded p-6 space-y-6">

                <TaskPageHeader isFormShown={isFormShown} setTasks={setTasks} setIsFormShown={setIsFormShown} />

                {tasks.length === 0 && (
                    <NoTaskFound />
                )}
                {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} setMessage={setMessage} />
                ))}
            </div>
        </div>
    )
}

export default TodoPage