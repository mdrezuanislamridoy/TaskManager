import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ArrowClockwise, Calendar, Check, CheckSquareOffset, MagnifyingGlass, NotePencil, PencilSimple, Plus, SignOut, SortAscending, Trash, UserCircle, Warning, X } from "phosphor-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TaskContext from "../../Context/taskContext";
import PopUpMessage from "../components/popUpMessage";
import TaskCard from "../components/Tasks/TaskCard";


const NoTaskFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">No tasks found</h2>
            <p className="text-gray-600">You have no tasks. Add a task to get started.</p>
        </div>
    );
};
const TaskPageHeader = ({ tasks, setTasks }) => {
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
        <button className="p-3  hover:bg-slate-600 hover:text-white " onClick={sortByIncomplete}>
            <SortAscending />
        </button>
    </div>
}

const TodoPage = () => {

    const [message, setMessage] = useState('');


    //gets tasks from the global context
    const { tasks, setTasks } = useContext(TaskContext)


    return (
        <>
            {
                message && <PopUpMessage message={message} setMessage={setMessage}></PopUpMessage>
            }
            <div className="w-full bg-white flex-1  rounded p-6 space-y-6">

                <TaskPageHeader tasks={tasks} setTasks={setTasks} />

                {tasks.length === 0 && (
                    <NoTaskFound />
                )}
                {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} setMessage={setMessage}/>
                ))}
            </div>
        </>
    )
}

export default TodoPage